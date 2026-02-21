import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
}

const PRICES = {
  single: {
    name: "Guida Matrimonio Low Cost — Singola",
    amount: 1900, // €19 in centesimi (sconto lancio da €25)
    originalPrice: 2500,
    description:
      "PDF 60 pagine + Template Email + Checklist + Calcolatore Budget. Prezzo normale €25, sconto lancio 24%.",
  },
  bundle: {
    name: "Guida Matrimonio Low Cost — Bundle Coppia",
    amount: 2900, // €29 in centesimi (sconto famiglia da €35)
    originalPrice: 3500,
    description:
      "2 accessi completi PDF + Template + Checklist. Prezzo normale €35, sconto famiglia 17%.",
  },
} as const;

export async function POST(req: NextRequest) {
  try {
    const { mode } = (await req.json()) as { mode: "single" | "bundle" };

    if (!mode || !PRICES[mode]) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    const price = PRICES[mode];
    const origin = req.headers.get("origin") || "https://matrimoniolowcost.it";

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: price.name,
              description: price.description,
            },
            unit_amount: price.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/grazie?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#calcolatore`,
      customer_creation: "always",
      metadata: {
        product: mode,
        discount_applied: "launch_24",
        original_price: String(price.originalPrice),
        savings: String(price.originalPrice - price.amount),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Errore creazione checkout" },
      { status: 500 }
    );
  }
}
