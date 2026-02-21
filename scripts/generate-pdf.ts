import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

async function generatePDF() {
  const templatePath = path.join(__dirname, "pdf-template.html");
  const outputPath = path.join(
    __dirname,
    "..",
    "public",
    "matrimonio-low-cost-guida.pdf"
  );

  // Ensure public dir exists
  const publicDir = path.join(__dirname, "..", "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const htmlContent = fs.readFileSync(templatePath, "utf-8");
  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  console.log("Generating PDF...");
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      right: "20mm",
      bottom: "20mm",
      left: "20mm",
    },
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:1px;"></div>',
    footerTemplate: `
      <div style="width:100%;text-align:center;font-size:9px;color:#999;font-family:Inter,sans-serif;">
        <span>Matrimonio Low Cost — Guida Tattica Italia</span>
        <span style="margin-left:20px;">Pagina <span class="pageNumber"></span> di <span class="totalPages"></span></span>
      </div>
    `,
  });

  await browser.close();
  console.log(`PDF generated: ${outputPath}`);

  const stats = fs.statSync(outputPath);
  console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

generatePDF().catch(console.error);
