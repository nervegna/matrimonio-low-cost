import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import crypto from "crypto";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "Futuri Sposi";
    const product = session.metadata?.product || "single";

    if (!customerEmail) {
      console.error("No customer email found");
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    // Generate secure download token (valid for 90 days)
    const secret = process.env.DOWNLOAD_SECRET || "change-me-in-production";
    const timestamp = Date.now();
    const token = crypto
      .createHash("sha256")
      .update(`${customerEmail}-${timestamp}-${secret}`)
      .digest("hex");

    // Generate download URL
    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://matrimoniolowcost.it";
    const downloadUrl = `${baseUrl}/api/download/${token}?email=${encodeURIComponent(customerEmail)}`;

    try {
      await getResend().emails.send({
        from: "Matrimonio Low Cost <guida@matrimoniolowcost.it>",
        to: customerEmail,
        subject: "🎉 Ecco la tua Guida Matrimonio Low Cost!",
        html: getEmailHTML(customerName, product, downloadUrl),
      });

      console.log(`Email sent to ${customerEmail} for product: ${product}`);
      console.log(`Download URL: ${downloadUrl}`);
    } catch (emailErr) {
      console.error("Resend email error:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}

function getEmailHTML(name: string, product: string, downloadUrl: string): string {
  const isBundle = product === "bundle";

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#fdf2f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#e11d48,#ec4899);border-radius:16px 16px 0 0;padding:40px 30px;text-align:center;">
      <h1 style="color:white;font-size:28px;margin:0 0 8px;">Benvenuti nella famiglia! 🎉</h1>
      <p style="color:rgba(255,255,255,0.9);font-size:16px;margin:0;">
        ${isBundle ? "Il vostro Bundle Coppia è pronto" : "La tua guida è pronta"}
      </p>
    </div>

    <!-- Body -->
    <div style="background:white;padding:30px;border-radius:0 0 16px 16px;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
      <p style="font-size:16px;color:#333;line-height:1.6;">
        Ciao <strong>${name}</strong>,
      </p>
      <p style="font-size:16px;color:#333;line-height:1.6;">
        Grazie per aver acquistato la <strong>Guida Tattica Matrimonio Low Cost</strong>!
        La tua guida da 60 pagine è pronta per il download.
      </p>

      <!-- Download CTA -->
      <div style="text-align:center;margin:32px 0;">
        <a href="${downloadUrl}" style="display:inline-block;background:linear-gradient(135deg,#e11d48,#ec4899);color:white;font-size:18px;font-weight:bold;text-decoration:none;padding:16px 40px;border-radius:12px;box-shadow:0 4px 12px rgba(225,29,72,0.3);">
          📥 Scarica la tua Guida
        </a>
        <p style="font-size:12px;color:#999;margin:12px 0 0;">
          Link valido per 90 giorni
        </p>
      </div>

      <!-- Quick Start -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:24px 0;">
        <h2 style="font-size:18px;color:#166534;margin:0 0 12px;">Come iniziare:</h2>
        <ol style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:2;">
          <li>Clicca il pulsante sopra per scaricare il PDF</li>
          <li>Leggi Sezione 1 — Il Sistema (20 min)</li>
          <li>Usa i template email per contattare i vendor</li>
          <li>Segui la Timeline 12 mesi</li>
        </ol>
      </div>

      <!-- Highlights -->
      <h3 style="font-size:16px;color:#333;margin:24px 0 12px;">Dentro la guida trovi:</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#555;">📍 Location</td>
          <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#16a34a;text-align:right;font-weight:bold;">Risparmi €5-12K</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#555;">🍽️ Catering</td>
          <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#16a34a;text-align:right;font-weight:bold;">Risparmi €3-8K</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#555;">📸 Fotografia</td>
          <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#16a34a;text-align:right;font-weight:bold;">Risparmi €1.5-4K</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#555;">💐 Fiori</td>
          <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#16a34a;text-align:right;font-weight:bold;">Risparmi €1-3K</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:14px;color:#555;">+ altre 7 sezioni</td>
          <td style="padding:8px 0;font-size:14px;color:#16a34a;text-align:right;font-weight:bold;">Totale: fino a €25K</td>
        </tr>
      </table>

      <!-- Pro tip -->
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px;margin:24px 0;">
        <p style="margin:0;font-size:14px;color:#92400e;">
          <strong>💡 Pro tip:</strong> Inizia dalla tattica "evento privato" (Sezione 2).
          È la singola strategia che fa risparmiare di più — fino a €5.000 sulla sola location.
        </p>
      </div>

      <p style="font-size:14px;color:#666;line-height:1.6;">
        Se hai domande, rispondi direttamente a questa email. Siamo qui per aiutarti!
      </p>

      <p style="font-size:14px;color:#666;">
        Un grande in bocca al lupo per il vostro matrimonio! 🥂
      </p>

      <p style="font-size:14px;color:#333;font-weight:bold;">
        Il team di Matrimonio Low Cost
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px;font-size:12px;color:#999;">
      <p>Matrimonio Low Cost — Guida Tattica Italia</p>
      <p>Hai domande? Scrivici a help@matrimoniolowcost.it</p>
    </div>
  </div>
</body>
</html>`;
}
