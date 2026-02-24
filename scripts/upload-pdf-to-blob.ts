import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { join } from "path";

async function uploadPDF() {
  const pdfPath = join(process.cwd(), "public", "matrimonio-low-cost-guida.pdf");
  const pdfBuffer = readFileSync(pdfPath);

  console.log("📤 Uploading PDF to Vercel Blob...");
  console.log(`   File size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  const blob = await put("matrimonio-low-cost-guida.pdf", pdfBuffer, {
    access: "public",
    contentType: "application/pdf",
  });

  console.log("✅ Upload complete!");
  console.log(`   URL: ${blob.url}`);
  console.log(`   Download URL: ${blob.downloadUrl}`);
  console.log("\n📝 Add this to your .env.local:");
  console.log(`BLOB_PDF_URL=${blob.url}`);
}

uploadPDF().catch((err) => {
  console.error("❌ Upload failed:", err);
  process.exit(1);
});
