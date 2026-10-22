const fs = require("fs");
const path = require("path");
const http = require("http");
const os = require("os");
const assert = require("assert/strict");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "../../..");
const docs = path.resolve(__dirname, "..");
const temp =
  process.env.EDI_AUDIT_TMP || path.join(os.tmpdir(), "edi-prototype-check");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
  ".md": "text/plain; charset=utf-8",
};

function serve(request, response) {
  const pathname = decodeURIComponent(
    new URL(request.url, "http://localhost").pathname,
  );
  const target = path.resolve(root, "." + pathname);
  if (
    !target.startsWith(root + path.sep) ||
    pathname.split("/").some((part) => part.startsWith("."))
  ) {
    response.writeHead(403);
    response.end();
    return;
  }
  fs.readFile(target, (error, body) => {
    response.writeHead(error ? 404 : 200, {
      "Content-Type": mime[path.extname(target)] || "application/octet-stream",
    });
    response.end(error ? "Not found" : body);
  });
}

async function main() {
  const server = http.createServer(serve);
  let browser;
  try {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const base = "http://127.0.0.1:" + server.address().port;
    browser = await chromium.launch({
      headless: true,
      executablePath:
        process.env.EDI_CHROME ||
        (process.platform === "win32"
          ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
          : undefined),
    });
    const context = await browser.newContext({
      viewport: { width: 1366, height: 900 },
      acceptDownloads: true,
    });
    const page = await context.newPage();
    const errors = [];
    const external = [];
    const checks = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("request", (request) => {
      if (!request.url().startsWith(base)) external.push(request.url());
    });

    await page.goto(base + "/docs/predefense/prototype/index.html");
    await page.waitForSelector(".unit-row");
    assert.equal(await page.locator(".unit-row").count(), 72);
    assert.equal(await page.textContent("#finding-count"), "188");
    assert.equal(await page.textContent("#local-count"), "0");
    assert.equal(await page.textContent("#unmatched-count"), "20");
    checks.push(
      "CLI dataset: 188 findings; initial pair has 72 findings and 20 unmatched requirements",
    );

    const screenshots = path.join(docs, "prototype/screenshots");
    fs.mkdirSync(screenshots, { recursive: true });
    await page.setViewportSize({ width: 1366, height: 1600 });
    const workbench = await page.locator(".workbench").boundingBox();
    await page.screenshot({
      path: path.join(screenshots, "overview.png"),
      clip: {
        x: workbench.x,
        y: workbench.y,
        width: workbench.width,
        height: 640,
      },
    });
    await page.setViewportSize({ width: 1366, height: 900 });

    await page.selectOption("#verdict", "review");
    assert.equal(await page.locator(".unit-row").count(), 12);
    assert.equal(await page.textContent("#verdict-tag"), "Needs review");
    await page.selectOption("#verdict", "all");
    await page.selectOption("#pair", "chr-214|domtar-214");
    assert.equal(await page.locator(".unit-row").count(), 54);
    await page.selectOption("#category", "codes");
    assert.equal(await page.locator(".unit-row").count(), 7);
    await page.fill("#search", "AT707");
    assert.equal(await page.locator(".unit-row").count(), 1);
    assert.match(await page.textContent("#right-summary"), /CT.*ET.*MT.*PT/);
    assert.equal(await page.textContent("#verdict-tag"), "Different");
    assert.match(
      await page.locator("#right-evidence a").first().getAttribute("href"),
      /#page=20$/,
    );
    checks.push(
      "Pair, category, result and text filters select the expected source-linked finding",
    );
    await page.locator("#detail-pane").screenshot({
      path: path.join(screenshots, "evidence.png"),
    });

    const unit = await page.textContent("#unit-id");
    const label = "same";
    const note = 'Quoted "note"\nsecond line <script>literal text</script>';
    await page.selectOption("#label-choice", label);
    await page.fill("#note", note);
    await page.click("#save");
    await page.reload();
    await page.selectOption("#pair", "chr-214|domtar-214");
    await page.selectOption("#category", "codes");
    await page.fill("#search", "AT707");
    assert.equal(await page.inputValue("#note"), note);
    assert.equal(await page.inputValue("#label-choice"), label);
    assert.equal(await page.textContent("#verdict-tag"), "Different");
    checks.push(
      "Local review survives reload while the automated verdict remains unchanged",
    );

    fs.mkdirSync(temp, { recursive: true });
    const downloadPromise = page.waitForEvent("download");
    await page.click("#export");
    const download = await downloadPromise;
    await download.saveAs(path.join(temp, "annotation-export.csv"));
    fs.writeFileSync(
      path.join(temp, "expected-annotation.json"),
      JSON.stringify({ unit, label, note }),
    );

    await page.fill("#search", "no-such-requirement-xyz");
    assert.equal(await page.locator(".unit-row").count(), 0);
    assert.equal(await page.locator("#save").isDisabled(), true);
    assert.equal(await page.locator("#detail-pane").isHidden(), true);
    assert.equal(await page.locator("#detail-empty").isVisible(), true);
    checks.push("Empty filters hide stale details and disable editing");

    await page.fill("#search", "AT707");
    await page.evaluate(() => {
      Storage.prototype.setItem = () => {
        throw new Error("Storage unavailable");
      };
    });
    await page.fill(
      "#note",
      "Review remains exportable if storage is unavailable.",
    );
    await page.click("#save");
    assert.match(
      await page.textContent("#save-status"),
      /storage unavailable/i,
    );
    checks.push("Storage failure gives an actionable export message");

    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      true,
    );
    await page.screenshot({
      path: path.join(temp, "mobile.png"),
      fullPage: true,
    });
    checks.push("390-pixel layout has no horizontal page overflow");

    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    checks.push(
      "Local review makes no external requests and has no browser errors",
    );
    const result = {
      checked_at_utc: new Date().toISOString(),
      viewports: ["1366x900", "390x844"],
      checks,
      errors,
      external_requests: external,
    };
    fs.writeFileSync(
      path.join(docs, "evidence/prototype-checks.json"),
      JSON.stringify(result, null, 2) + "\n",
    );
    console.log(JSON.stringify(result, null, 2));
    await context.close();
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
