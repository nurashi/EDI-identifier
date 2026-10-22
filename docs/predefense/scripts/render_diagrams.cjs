// Uses @viz-js/viz and sharp. Set NODE_PATH to the dependency directory.
const fs = require("fs");
const path = require("path");
const { instance } = require("@viz-js/viz");
const sharp = require("sharp");
const dir = path.resolve(__dirname, "../diagrams");
(async () => {
  const viz = await instance();
  for (const name of ["context", "use-cases", "components"]) {
    const svg = viz.renderString(
      fs.readFileSync(path.join(dir, name + ".dot"), "utf8"),
      { format: "svg" },
    );
    fs.writeFileSync(path.join(dir, name + ".svg"), svg);
    await sharp(Buffer.from(svg))
      .resize({ width: 1800 })
      .png()
      .toFile(path.join(dir, name + ".png"));
    console.log("Rendered " + name);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
