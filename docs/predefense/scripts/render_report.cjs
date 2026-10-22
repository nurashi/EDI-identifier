const fs = require("fs");
const path = require("path");
const { pathToFileURL, fileURLToPath } = require("url");
const { chromium } = require("playwright");
const out = path.resolve(__dirname, "..");
const checkOnly = process.argv.includes("--check-only");

async function replaceLocalLinks(page) {
  const sourceRef = process.env.EDI_SOURCE_REF;
  if (!sourceRef || !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(sourceRef)) {
    throw new Error(
      "Set EDI_SOURCE_REF to the published source commit or submission ref before PDF export.",
    );
  }
  const root = path.resolve(out, "../..");
  const links = await page.locator("a").evaluateAll((nodes) =>
    nodes.map((node, index) => ({
      index,
      href: node.href,
      raw: node.getAttribute("href"),
    })),
  );
  for (const link of links) {
    if (!link.href.startsWith("file:") || link.raw.startsWith("#")) continue;
    const url = new URL(link.href);
    const relative = path.relative(root, fileURLToPath(url));
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error("Report link points outside the repository.");
    }
    const target =
      "https://github.com/nurashi/EDI-identifier/blob/" +
      encodeURIComponent(sourceRef) +
      "/" +
      relative.split(path.sep).map(encodeURIComponent).join("/") +
      url.hash;
    await page
      .locator("a")
      .nth(link.index)
      .evaluate((node, href) => {
        node.href = href;
      }, target);
  }
}
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.EDI_CHROME ||
      (process.platform === "win32"
        ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
        : undefined),
  });
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(path.join(out, "report.html")).href, {
      waitUntil: "load",
    });
    await page.evaluate(() => document.fonts.ready);
    const images = await page.locator("img").evaluateAll((images) =>
      images.map((i) => ({
        src: i.getAttribute("src"),
        ok: i.complete && i.naturalWidth > 0,
      })),
    );
    if (images.some((i) => !i.ok))
      throw new Error("Missing report image: " + JSON.stringify(images));
    const overflow = await page
      .locator("table")
      .evaluateAll((t) =>
        t
          .filter((x) => x.scrollWidth > x.clientWidth + 2)
          .map((x) => x.textContent.slice(0, 80)),
      );
    if (overflow.length)
      throw new Error("Table overflow: " + JSON.stringify(overflow));
    const missingAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href").slice(1))
          .filter((id) => id && !document.getElementById(id)),
      );
    if (missingAnchors.length) {
      throw new Error(
        "Missing report anchors: " + JSON.stringify(missingAnchors),
      );
    }
    if (checkOnly) {
      if (process.env.EDI_SOURCE_REF) await replaceLocalLinks(page);
      console.log(
        "Report HTML passed: " +
          images.length +
          " images; no table overflow or broken anchors.",
      );
      return;
    }
    await replaceLocalLinks(page);
    fs.mkdirSync(path.join(out, "output"), { recursive: true });
    await page.pdf({
      path: path.join(out, "output/report.pdf"),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate:
        '<div style="width:100%;font-size:8px;color:#637580;padding:0 17mm;display:flex;justify-content:space-between"><span>EDI Identifier · First pre-defense</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    });
    console.log(
      "Created output/report.pdf; " +
        images.length +
        " images loaded; no table overflow.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
