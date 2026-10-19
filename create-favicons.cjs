const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function main() {
  const publicDir = path.resolve("public");
  const logoPath = path.join(publicDir, "images", "logo.png");

  if (!fs.existsSync(logoPath)) {
    throw new Error("Logo not found: " + logoPath);
  }

  const metadata = await sharp(logoPath).metadata();
  console.log(`Using logo: ${metadata.width} x ${metadata.height}`);

  await sharp(logoPath)
    .resize(32, 32, { fit: "contain", background: "#ffffff" })
    .png()
    .toFile(path.join(publicDir, "favicon-32.png"));

  await sharp(logoPath)
    .resize(180, 180, { fit: "contain", background: "#ffffff" })
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));

  const logoBase64 = fs.readFileSync(logoPath).toString("base64");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${metadata.width} ${metadata.height}"><image width="${metadata.width}" height="${metadata.height}" href="data:image/png;base64,${logoBase64}"/></svg>`;

  fs.writeFileSync(path.join(publicDir, "favicon.svg"), svg);

  const manifest = {
    name: "Drinco International Limited",
    short_name: "Drinco",
    icons: [
      {
        src: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    theme_color: "#0d3329",
    background_color: "#ffffff",
    display: "standalone"
  };

  fs.writeFileSync(
    path.join(publicDir, "site.webmanifest"),
    JSON.stringify(manifest, null, 2)
  );

  console.log("Successfully created all four favicon files.");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
