# ISTRUZIONI PER CLAUDE CODE

## PRICING IMPORTANTE ⚠️

**SEMPRE usare anchor pricing:**

- Guida singola: ~~€25~~ → **€19** (sconto 24%)
- Bundle coppia: ~~€35~~ → **€29** (sconto 17%)

**In tutti i CTA buttons, mostrare strikethrough del prezzo originale.**

Esempio:
```jsx
<button>
  <span className="line-through text-gray-400 text-sm mr-2">€25</span>
  Scarica Guida — €19
</button>
```

---

## FILES DA USARE

1. **PROJECT_BRIEF.md** — struttura completa progetto
2. **PRICING_STRATEGY.md** — strategia pricing e urgency
3. **MARKETING_AUTOMATION.md** — content automation plan

---

## COMPONENTI EXTRA CREATI

Già pronti in `/src/components/`:

- `countdown-timer.tsx` — Timer 48h rolling (opzionale, usa dopo primi 50 sales)
- `social-proof-counter.tsx` — Counter dinamico vendite (inizia da 87)

**Importa e usa nella homepage:**

```tsx
import { CountdownTimer } from "@/components/countdown-timer";
import { SocialProofCounter } from "@/components/social-proof-counter";

// In hero section:
<CountdownTimer />
<SocialProofCounter />
```

---

## STRIPE CHECKOUT

**Amounts corretti:**
- Single: `1900` (€19.00)
- Bundle: `2900` (€29.00)

**Metadata da includere:**
```typescript
metadata: {
  discount_applied: "launch_24",
  original_price: "2500", // or "3500" for bundle
  savings: "600", // or "600" for bundle
}
```

---

## SCARCITY BADGES

**Homepage hero (sopra title):**
```jsx
<div className="inline-block bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
  🔥 Sconto Lancio 24% — Solo Prime 100 Copie
</div>
```

**Sticky top banner (optional):**
```jsx
<div className="fixed top-0 left-0 right-0 bg-yellow-400 text-center py-2 text-sm font-semibold z-50">
  Sconto 24% attivo — Approfitta ora!
</div>
```

---

## EMAIL POST-ACQUISTO

**Subject:** ✓ Ecco la tua Guida Matrimonio Low Cost (risparmiato €6!)

Menzionare nel body che hanno risparmiato €6 sul prezzo standard.

---

## ANALYTICS TRACKING

In checkout success, traccia:
```typescript
// Plausible event
window.plausible?.("Purchase", {
  props: {
    amount: "19",
    discount: "launch_24",
    savings: "6"
  }
});
```

---

Segui PROJECT_BRIEF.md per tutto il resto. Usa questi prezzi anchor in TUTTI i posti dove appare pricing.
