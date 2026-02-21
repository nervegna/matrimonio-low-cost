# Matrimonio Low Cost — Guida Tattica Italia

Prodotto digitale (~~€25~~ **€19** singola / ~~€35~~ **€29** bundle coppia) con strategie per ridurre i costi del matrimonio del 70%.

## Tech Stack

- **Framework:** Next.js 14 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Payments:** Stripe Checkout
- **Email:** Resend (delivery PDF automatico)
- **PDF:** Puppeteer (generazione) + HTML template
- **Hosting:** Vercel

## Struttura Progetto

```
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page principale
│   │   ├── grazie/page.tsx       # Thank you page post-acquisto
│   │   ├── api/
│   │   │   ├── checkout/route.ts # Stripe checkout session
│   │   │   └── webhook/route.ts  # Stripe webhook + email Resend
│   │   └── layout.tsx            # Layout con SEO meta tags
│   ├── components/               # Componenti React
│   └── lib/                      # Utilities
├── scripts/
│   ├── pdf-template.html         # Template HTML guida 60 pagine
│   └── generate-pdf.ts           # Script generazione PDF
├── content/
│   ├── instagram/posts.md        # 50 post Instagram
│   ├── tiktok/scripts.md         # 20 script TikTok
│   ├── pinterest/pins.md         # 15 pin Pinterest
│   └── blog/                     # 20 blog post SEO
├── public/
│   └── matrimonio-low-cost-guida.pdf  # PDF generato
├── emails/                       # Template email HTML
├── vercel.json                   # Deploy config
└── .env.example                  # Template variabili ambiente
```

## Setup Rapido (15 minuti)

### 1. Stripe Account (5 min)

1. Vai su [stripe.com/it](https://stripe.com/it) → crea account
2. Attiva pagamenti
3. Copia le chiavi:
   - `STRIPE_SECRET_KEY` (da Dashboard → Developers → API keys)
   - `STRIPE_PUBLISHABLE_KEY`
4. Crea webhook endpoint:
   - URL: `https://tuodominio.it/api/webhook`
   - Eventi: `checkout.session.completed`
   - Copia `STRIPE_WEBHOOK_SECRET`

### 2. Resend Email (3 min)

1. Vai su [resend.com](https://resend.com) → signup
2. Verifica dominio: `matrimoniolowcost.it`
3. Aggiungi i DNS records (SPF, DKIM)
4. Copia `RESEND_API_KEY`

### 3. Dominio (5 min)

1. Compra `matrimoniolowcost.it` (Namecheap/GoDaddy/Register.it)
2. Punta A record a Vercel
3. Configura in Vercel dashboard

### 4. Deploy Vercel (2 min)

1. Import questo repo GitHub su [vercel.com](https://vercel.com)
2. Aggiungi le environment variables:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   RESEND_API_KEY=re_...
   NEXT_PUBLIC_URL=https://matrimoniolowcost.it
   ```
3. Deploy!

### 5. Genera il PDF

```bash
npx tsx scripts/generate-pdf.ts
```

Il PDF viene salvato in `public/matrimonio-low-cost-guida.pdf`.

## Comandi Utili

```bash
# Development
npm run dev

# Build production
npm run build

# Genera PDF
npx tsx scripts/generate-pdf.ts
```

## Prezzi Prodotto (Sconto Lancio)

| Prodotto | Originale | Sconto Lancio | Risparmio |
|----------|-----------|---------------|-----------|
| Guida Singola | ~~€25~~ | **€19** | -24% |
| Bundle Coppia | ~~€35~~ | **€29** | -17% |
| Upsell Supplier List | — | €12 | — |

## Content Marketing

Nella cartella `/content/` trovi:
- **50 post Instagram** pronti (carousel + caption + hashtag)
- **20 script TikTok** (hook + problem + solution)
- **15 pin Pinterest** (titolo + descrizione + keyword)
- **20 blog post SEO** completi (800-1200 parole ciascuno)

## Revenue Proiezione

- Mese 1-3: ~€1.000/mese
- Anno 1: ~€12.600
- Anno 2 (SEO maturo): ~€30.000
- Margine: 98% (costi operativi minimi)
