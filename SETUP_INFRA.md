# Setup Infra — Matrimonio Low Cost

Guida passo-passo per Tom. Tempo totale: ~15 minuti.

**Cosa serve alla fine:**

| Servizio   | Cosa ottieni                          |
|------------|---------------------------------------|
| Stripe     | 3 chiavi (secret, publishable, webhook) |
| Resend     | 1 API key + dominio verificato        |
| Namecheap  | Dominio matrimoniolowcost.it          |
| Vercel     | Deploy live con env vars              |

**Ordine consigliato:** Dominio → Resend → Stripe → Vercel (il dominio serve per configurare tutto il resto).

---

## STEP 1 — Dominio (Namecheap) ~3 min

### 1.1 Acquista il dominio

1. Vai su [namecheap.com](https://www.namecheap.com)
2. Cerca **matrimoniolowcost.it**
3. Aggiungi al carrello e completa l'acquisto
4. **Disattiva** auto-renew WhoisGuard e altri add-on (opzionali)

### 1.2 Configura DNS per Vercel

Dalla dashboard Namecheap → Domain List → **Manage** → **Advanced DNS**

Cancella tutti i record esistenti e aggiungi:

| Type    | Host | Value               | TTL       |
|---------|------|---------------------|-----------|
| A       | @    | 76.76.21.21         | Automatic |
| CNAME   | www  | cname.vercel-dns.com | Automatic |

> Questi sono gli IP standard di Vercel. Verranno confermati nel Step 4.

### 1.3 Configura DNS per Resend (email)

Aggiungi anche questi record (li troverai nel Step 2, ma preparati a tornare qui):

| Type  | Host                                   | Value                          | TTL       |
|-------|----------------------------------------|--------------------------------|-----------|
| TXT   | (fornito da Resend)                    | (fornito da Resend)            | Automatic |
| CNAME | (fornito da Resend)                    | (fornito da Resend)            | Automatic |
| MX    | (fornito da Resend, se serve ricezione)| (fornito da Resend)            | Automatic |

> I valori esatti li copi dal pannello Resend nel Step 2.

---

## STEP 2 — Resend (Email) ~3 min

### 2.1 Crea account

1. Vai su [resend.com](https://resend.com)
2. Registrati (puoi usare GitHub login)
3. Sei nella dashboard

### 2.2 Aggiungi e verifica il dominio

1. Sidebar → **Domains** → **Add Domain**
2. Inserisci: `matrimoniolowcost.it`
3. Region: **EU (Frankfurt)** ← importante per GDPR
4. Resend ti mostra **3-4 record DNS** da aggiungere

### 2.3 Copia i record DNS in Namecheap

1. Torna su Namecheap → Advanced DNS
2. Aggiungi **tutti** i record che Resend ti ha dato (tipicamente):
   - 1x **TXT** (SPF) — autorizza Resend a inviare email
   - 1-3x **CNAME** (DKIM) — firma crittografica email
   - Opzionale: **MX** — solo se vuoi ricevere email
3. Torna su Resend e clicca **Verify**
4. Potrebbe servire 1-5 minuti per propagazione DNS

> **Status verde = verificato.** Se resta in pending, aspetta qualche minuto e riprova.

### 2.4 Crea API Key

1. Sidebar → **API Keys** → **Create API Key**
2. Nome: `matrimonio-lowcost-prod`
3. Permission: **Sending access**
4. Domain: `matrimoniolowcost.it`
5. **Copia la chiave** (inizia con `re_`) — la vedrai una sola volta

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Indirizzi email che userai:**
> - `guida@matrimoniolowcost.it` — mittente email post-acquisto (automatica)
> - `help@matrimoniolowcost.it` — supporto clienti (mostrato nel sito)
>
> Non servono caselle email reali: Resend invia senza bisogno di mailbox.
> Se vuoi *ricevere* email su help@, configura un forwarding separato (es. ImprovMX gratuito).

---

## STEP 3 — Stripe (Pagamenti) ~5 min

### 3.1 Crea account

1. Vai su [stripe.com](https://stripe.com)
2. Registrati con email
3. Completa la verifica del business:
   - Tipo: **Individual / Sole proprietor**
   - Paese: **Italia**
   - Descrizione: "Vendita guide digitali per matrimonio"
   - URL sito: `https://matrimoniolowcost.it`

> Puoi iniziare in **test mode** anche prima che il business sia verificato.

### 3.2 Prendi le API Keys (Test Mode)

1. Dashboard → toggle in alto: **Test mode** ON (arancione)
2. Vai su **Developers** → **API keys**
3. Copia:

```
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3.3 Configura il Webhook

1. **Developers** → **Webhooks** → **Add endpoint**
2. URL endpoint: `https://matrimoniolowcost.it/api/webhook`
3. Events da ascoltare: seleziona **checkout.session.completed**
4. Clicca **Add endpoint**
5. Nella pagina del webhook, clicca **Reveal** sotto "Signing secret"
6. Copia:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3.4 Testa con Stripe CLI (opzionale ma consigliato)

```bash
# Installa Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhook al dev locale
stripe listen --forward-to localhost:3000/api/webhook

# In un altro terminale, trigger un test
stripe trigger checkout.session.completed
```

### 3.5 Passa a Live Mode (quando sei pronto)

1. Toggle **Test mode** → OFF (verde)
2. Vai su **Developers** → **API keys**
3. Copia le chiavi **live** (iniziano con `pk_live_` e `sk_live_`)
4. **Webhooks** → crea un **nuovo endpoint** in live mode con lo stesso URL
5. Aggiorna le env vars su Vercel con le chiavi live

> **I prodotti (€19 e €29) non vanno creati su Stripe Dashboard.**
> Sono creati dinamicamente dal codice ad ogni checkout (inline pricing).
> Il codice crea i line_items con prezzo, nome e descrizione al volo.

---

## STEP 4 — Vercel (Deploy) ~4 min

### 4.1 Import del progetto

1. Vai su [vercel.com](https://vercel.com) e accedi con GitHub
2. **Add New** → **Project**
3. Seleziona il repo `matrimonio-low-cost`
4. Framework: **Next.js** (auto-detected)
5. **Non** fare deploy ancora — prima configura le env vars

### 4.2 Configura Environment Variables

In **Settings** → **Environment Variables**, aggiungi:

| Key                       | Value                                     | Environment      |
|---------------------------|-------------------------------------------|-------------------|
| `STRIPE_SECRET_KEY`       | `sk_test_xxx` (poi `sk_live_xxx`)         | Production, Preview |
| `STRIPE_PUBLISHABLE_KEY`  | `pk_test_xxx` (poi `pk_live_xxx`)         | Production, Preview |
| `STRIPE_WEBHOOK_SECRET`   | `whsec_xxx`                               | Production, Preview |
| `RESEND_API_KEY`          | `re_xxx`                                  | Production, Preview |
| `NEXT_PUBLIC_URL`         | `https://matrimoniolowcost.it`            | Production        |
| `NEXT_PUBLIC_URL`         | `https://matrimonio-low-cost-preview.vercel.app` | Preview    |

> Usa le chiavi **test** per iniziare, poi switchale a **live** quando sei pronto ad accettare pagamenti veri.

### 4.3 Collega il dominio personalizzato

1. **Settings** → **Domains**
2. Aggiungi: `matrimoniolowcost.it`
3. Aggiungi anche: `www.matrimoniolowcost.it` (redirect a root)
4. Vercel verificherà i DNS — se hai configurato lo Step 1.2 correttamente, sarà verde

### 4.4 Deploy

1. Torna alla tab **Deployments**
2. Clicca **Redeploy** (o fai un push su main)
3. Aspetta il build (~1-2 minuti)
4. Il sito è live su `https://matrimoniolowcost.it`

---

## Checklist Finale

### Verifica funzionamento (5 min dopo il deploy)

- [ ] **Sito carica** — vai su https://matrimoniolowcost.it
- [ ] **HTTPS attivo** — lucchetto verde nel browser
- [ ] **Bottone €19 funziona** — apre Stripe Checkout (test mode = carta 4242 4242 4242 4242)
- [ ] **Bottone €29 funziona** — apre Stripe Checkout con prezzo bundle
- [ ] **Pagamento test** — completa un acquisto con carta test
- [ ] **Email ricevuta** — controlla che arrivi email con PDF allegato
- [ ] **Pagina /grazie** — dopo il pagamento, redirect corretto
- [ ] **Webhook OK** — in Stripe Dashboard → Webhooks, vedi evento `checkout.session.completed` con status 200

### Carta di test Stripe

```
Numero:    4242 4242 4242 4242
Scadenza:  qualsiasi data futura (es. 12/30)
CVC:       qualsiasi 3 cifre (es. 123)
Nome:      qualsiasi
```

### Go Live Checklist

- [ ] Business verificato su Stripe (documenti approvati)
- [ ] Switchare a chiavi **live** su Vercel (sk_live_, pk_live_)
- [ ] Creare webhook **live** su Stripe (stesso URL, stesso evento)
- [ ] Aggiornare `STRIPE_WEBHOOK_SECRET` su Vercel con il secret del webhook live
- [ ] Fare un acquisto reale di test con carta vera (puoi rimborsare da Stripe Dashboard)

---

## Riepilogo Chiavi

```env
# Stripe (inizia con test, poi sostituisci con live)
STRIPE_SECRET_KEY=sk_test_...       → poi sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_test_...  → poi pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...     → diverso per test e live

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_URL=https://matrimoniolowcost.it
```

## Costi Mensili Stimati

| Servizio   | Costo                               |
|------------|--------------------------------------|
| Namecheap  | ~€8-12/anno per .it                  |
| Resend     | Gratis fino a 3.000 email/mese      |
| Stripe     | 1.5% + €0.25 per transazione (EU)   |
| Vercel     | Gratis (Hobby plan)                  |
| **Totale** | **~€1/mese + commissioni Stripe**   |

---

## Troubleshooting Rapido

| Problema                        | Soluzione                                                    |
|---------------------------------|--------------------------------------------------------------|
| Webhook restituisce 400         | Controlla che `STRIPE_WEBHOOK_SECRET` sia corretto           |
| Email non arriva                | Verifica dominio su Resend (status verde), controlla spam    |
| Dominio non si connette        | DNS propagation: aspetta 5-30 min, verifica con `dig matrimoniolowcost.it` |
| Build fallisce su Vercel       | Controlla che tutte le env vars siano settate                |
| Stripe Checkout non si apre    | Verifica `STRIPE_SECRET_KEY` e che sia nel giusto mode (test/live) |
