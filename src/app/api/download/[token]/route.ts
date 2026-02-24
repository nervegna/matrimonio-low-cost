import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import crypto from "crypto";

// Generate token: crypto.createHash('sha256').update(`${email}-${timestamp}-${secret}`).digest('hex')
function verifyToken(token: string, email: string): boolean {
  const secret = process.env.DOWNLOAD_SECRET || "change-me-in-production";
  
  // Token format: sha256(email + timestamp + secret)
  // We'll verify it's a valid hash by checking if it matches any recent timestamp
  const now = Date.now();
  const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;
  
  // Check if token matches for any timestamp in the last 90 days (rough check)
  // In production, store tokens in a database for proper validation
  // For now, we'll just check if it's a valid SHA256 hash format
  const isValidFormat = /^[a-f0-9]{64}$/i.test(token);
  
  return isValidFormat;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  const email = req.nextUrl.searchParams.get("email") || "";

  // Basic token validation (in production, use proper token storage)
  if (!token || token.length !== 64) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  // Read PDF from public folder
  const pdfPath = join(process.cwd(), "public", "matrimonio-low-cost-guida.pdf");
  
  try {
    const pdfBuffer = readFileSync(pdfPath);
    
    // Log download (optional: store in database)
    console.log(`PDF downloaded - Token: ${token.substring(0, 8)}... Email: ${email}`);
    
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Matrimonio-Low-Cost-Guida-Tattica.pdf"',
        "Cache-Control": "private, max-age=86400",
      },
    });
  } catch (error) {
    console.error("PDF read error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
