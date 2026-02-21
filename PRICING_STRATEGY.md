# Pricing Strategy — Anchor + Scarcity

## Prezzi Ufficiali

**Guida Singola:**
- Prezzo originale: €25
- **Prezzo scontato: €19** (sconto 24%)
- Label: "Sconto Lancio"

**Bundle Coppia:**
- Prezzo originale: €35
- **Prezzo scontato: €29** (sconto 17%)
- Label: "Sconto Famiglia"

**Upsell Supplier List:**
- Prezzo fisso: €12
- Offerto post-acquisto (email day 7)

---

## Scarcity & Urgency Triggers

### Homepage Hero Badge
```jsx
<div className="inline-block bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
  🔥 Sconto Lancio 24% — Solo Prime 100 Copie
</div>
```

### CTA Buttons (Always Show Strikethrough)
```jsx
// Primary CTA
<button className="bg-rose-600 text-white px-8 py-4 rounded-lg text-xl font-semibold">
  <span className="line-through text-rose-300 text-sm mr-2">€25</span>
  Scarica Guida — €19
</button>

// Bundle CTA
<button className="border-2 border-rose-600 text-rose-600 px-8 py-4 rounded-lg text-xl font-semibold">
  <span className="line-through text-gray-400 text-sm mr-2">€35</span>
  Bundle Coppia — €29
  <span className="block text-xs text-gray-500 mt-1">Risparmio €6</span>
</button>
```

### Social Proof Counter (Dynamic)
```jsx
<p className="text-sm text-gray-600">
  <span className="font-semibold text-rose-600">{salesCount}</span> copie vendute nelle ultime 48 ore
</p>
```

**Implementation:**
- Start count: 87 (credibile, non troppo alto)
- Auto-increment: +1 ogni 35-90 minuti random
- Reset weekly a 40-60 random

### Countdown Timer (Optional — Use After First 50 Sales)
```jsx
<div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
  <p className="text-yellow-900 font-semibold text-center">
    ⏰ Sconto 24% termina tra: 
    <span className="font-mono text-xl ml-2">
      {hours}h {minutes}m {seconds}s
    </span>
  </p>
</div>
```

**Timer logic:**
- 48 hours rolling window
- Resets daily at midnight
- Always shows time remaining

---

## Stripe Checkout Config

```typescript
// src/app/api/checkout/route.ts

const PRICES = {
  single: {
    name: "Guida Matrimonio Low Cost — Singola",
    price: 1900,  // €19.00
    originalPrice: 2500,  // €25.00 (show in description)
    description: "PDF 60 pagine + calcolatori + template. Prezzo normale €25, sconto lancio 24%.",
  },
  bundle: {
    name: "Guida Matrimonio Low Cost — Bundle Coppia",
    price: 2900,  // €29.00
    originalPrice: 3500,  // €35.00
    description: "2 accessi completi. Prezzo normale €35, sconto famiglia 17%.",
  },
};

// Metadata tracking (Stripe Dashboard analytics)
metadata: {
  discount_applied: "launch_24",
  original_price: "2500",
  savings: "600",
}
```

---

## Email Copy (Post-Purchase)

**Subject:** ✓ Ecco la tua Guida Matrimonio Low Cost (risparmiato €6!)

**Body:**
```
Ciao {firstName},

Complimenti per aver approfittato dello sconto lancio! 🎉

Hai risparmiato €6 sul prezzo standard (€25 → €19).

Ecco la tua guida:
[Download PDF Button]

Cosa fare ora:
1. Scarica il PDF
2. Inizia dalla Sezione 1 (Il Sistema)
3. Usa il calcolatore budget per stimare risparmi

Il tuo accesso è permanente — aggiornamenti futuri gratis.

A presto,
Tommaso
```

---

## A/B Test Variants (Future)

**Test 1: Discount Depth**
- Control: €25 → €19 (24%)
- Variant: €29 → €19 (34%)
- Hypothesis: Bigger discount = higher urgency, but may devalue product

**Test 2: Scarcity Type**
- Control: "Solo Prime 100 Copie"
- Variant: "Sconto termina 48h"
- Hypothesis: Time urgency > quantity scarcity for digital products

**Test 3: Bundle Positioning**
- Control: Bundle as secondary option
- Variant: Bundle as primary (default selected)
- Hypothesis: Higher AOV if bundle is default

---

## Revenue Impact (Updated)

### Pricing Comparison

**Old (€19 flat):**
- 35 vendite/mese × €19 = €665/mese
- €7,980/anno

**New (€25 → €19):**
- 35 vendite/mese × €19 = €665/mese  
- **BUT:** Conversion rate +15-20% grazie a perceived value
- 42 vendite/mese × €19 = €798/mese
- €9,576/anno

**Bundle uptake aumenta:**
- Old: 30% sceglie bundle (€29 vs €19 = +€10)
- New: 40% sceglie bundle (€35 → €29 vs €25 → €19 = perceived pari)
- Extra revenue: +4 bundle/mese × €10 diff = +€40/mese

**Total new annual revenue:** ~€10,056 (+€2K vs flat €19)

---

## Visual Design Notes

### Color Psychology
- **Strikethrough original price:** Light gray (#9CA3AF)
- **Sale price:** Bold rose/red (#E11D48)
- **Discount badge:** Pulsing animation, red background
- **Savings callout:** Green positive (#10B981)

### Typography Hierarchy
```
€25  ← 14px, line-through, gray-400
€19  ← 24px, bold, rose-600
```

### Placement
- Hero: Above main CTA buttons
- Sticky header: Mini banner "Sconto 24% attivo"
- Exit popup: Remind discount before leaving
- Checkout: Show savings in summary

---

## Implementation Checklist

- [ ] Update Stripe product prices (€19, €29)
- [ ] Add originalPrice metadata
- [ ] Strikethrough UI all CTAs
- [ ] Scarcity badge homepage
- [ ] Social proof counter (start 87)
- [ ] Email copy updated with savings
- [ ] Analytics tracking discount usage
- [ ] A/B test framework ready

**Go-live:** Immediately with launch  
**End discount:** Never (always-on "launch" price — new "original" becomes €25 anchor)
