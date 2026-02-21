# Marketing Automation 100% — Zero Gestione Manuale

## OBIETTIVO
Traffico organico automatico senza spendere in ads e senza gestione quotidiana.

**Budget mensile:** €0-5  
**Time Tom:** 0 ore/mese (tutto automatico)  
**Traffic target:** 2-5K visitors/mese entro 90 giorni

---

## STACK AUTOMATION (Tutto Gratis)

1. **Content Generator:** Claude Code + Anthropic API
2. **Social Posting:** Buffer Free (10 post/mese) o Zapier Free
3. **SEO Blog:** Next.js static pages (auto-generated)
4. **Email Marketing:** Resend (3K email/mese gratis)
5. **Analytics:** Plausible (free tier) o Vercel Analytics (gratis)

**Costo totale:** €0/mese

---

## FASE 1: CONTENT GENERATION (Automatico)

### Script: `scripts/generate-weekly-content.ts`

Claude Code crea questo script che gira via Vercel Cron (gratis):

```typescript
// Ogni lunedì 9:00 genera contenuti settimana
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

const topics = [
  'Risparmio location matrimonio',
  'Catering low-cost senza compromessi',
  'Template email vendor negoziazione',
  'Bomboniere fai da te',
  'Fotogrago matrimonio economico',
  'Checklist costi nascosti',
  'Matrimonio fuori stagione vantaggi',
  'Abito sposa outlet vs atelier',
  'Viaggio nozze budget',
  'Calcolatore budget matrimonio',
];

async function generateWeeklyContent() {
  const claude = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Genera 7 post (1/giorno per la settimana)
  for (let i = 0; i < 7; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    // Instagram Post
    const igPost = await claude.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 800,
      messages: [{
        role: 'user',
        content: `Crea Instagram carousel post (5 slide) su: ${topic}

Target: coppie italiane neo-fidanzate
Tone: pratico, zero fuffa, tattiche concrete
Format: ogni slide 1 tip specifico
CTA finale: "Link in bio per guida completa"
Include: emoji, numeri, risultati reali

Output JSON:
{
  "caption": "...",
  "slides": [
    "Slide 1 text",
    "Slide 2 text",
    ...
  ],
  "hashtags": ["matrimonio", "matrimoniolowcost", ...]
}`
      }],
    });
    
    // TikTok Script
    const tiktokScript = await claude.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `Crea TikTok script (30 sec) su: ${topic}

Structure:
- Hook (2 sec): frase shock/numero
- Problem (5 sec): pain point comune
- Solution (15 sec): 3 tip rapidi
- Payoff (5 sec): risultato finale
- CTA (3 sec): link in bio

Tone: energico, diretto, Gen Z friendly
Include: numeri specifici risparmio

Output JSON:
{
  "hook": "...",
  "problem": "...",
  "tips": ["tip1", "tip2", "tip3"],
  "payoff": "...",
  "cta": "..."
}`
      }],
    });
    
    // Pinterest Pin Description
    const pinterestPin = await claude.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 400,
      messages: [{
        role: 'user',
        content: `Crea Pinterest pin description per: ${topic}

Format: SEO-friendly, keyword-rich
Length: 200-300 char
Include: numeri, benefit, CTA
Keywords: matrimonio, low cost, budget, risparmio, Italia

Output JSON:
{
  "title": "...",
  "description": "...",
  "keywords": [...]
}`
      }],
    });
    
    // Salva in queue approvazione (opzionale) o posta diretto
    const content = {
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      instagram: JSON.parse(igPost.content[0].text),
      tiktok: JSON.parse(tiktokScript.content[0].text),
      pinterest: JSON.parse(pinterestPin.content[0].text),
    };
    
    fs.writeFileSync(
      `./content/queue/week-${Date.now()}-day-${i}.json`,
      JSON.stringify(content, null, 2)
    );
  }
  
  console.log('✅ Generated 7 days of content');
}

generateWeeklyContent();
```

**Cron Job Vercel:**
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/generate-content",
    "schedule": "0 9 * * 1"  // Ogni lunedì 9:00
  }]
}
```

**Costo:** €0 (Anthropic API ~€0.50/settimana, 7 post × 3 piattaforme = 21 contenuti)

---

## FASE 2: AUTO-POSTING SOCIAL

### Opzione A: Buffer (Gratis 10 post/mese)

1. Buffer.com → signup free tier
2. Connetti Instagram + Pinterest
3. Script legge `content/queue/*.json` e schedula via Buffer API
4. Auto-post senza touch manuale

**Limiti:** 10 post/mese gratis  
**Upgrade:** €6/mese per 100 post (opzionale dopo primi €500 revenue)

### Opzione B: Zapier (Gratis 100 task/mese)

1. Zapier.com → free tier
2. Zap: Google Sheets → Instagram/Pinterest
3. Script popola Google Sheet con post da `content/queue/`
4. Zapier posta automaticamente

**Costo:** €0 (fino a 100 post/mese)

### Opzione C: Zero Tool (Manual Batch 1x/settimana)

Tom/assistente VA:
- Apre `content/queue/` folder
- Copia 7 post
- Schedula batch su Instagram/Pinterest native scheduler
- **Time:** 10 minuti/settimana

**Raccomandazione:** Start con C (€0), upgrade a B dopo traction.

---

## FASE 3: SEO BLOG AUTO-PUBLISHING

### Script: `scripts/generate-seo-blog.ts`

Genera 1 blog post/settimana automatico:

```typescript
// Ogni mercoledì: nuovo blog post SEO
const keywords = [
  'matrimonio low cost',
  'come risparmiare matrimonio',
  'budget matrimonio 10000 euro',
  'location matrimonio economiche',
  'bomboniere fai da te',
  'fotograpo matrimonio economico',
  'catering matrimonio prezzi',
  'abito sposa outlet',
  'matrimonio fuori stagione',
  'viaggio nozze economico',
];

async function generateBlogPost(keyword: string) {
  const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const article = await claude.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `Scrivi blog post SEO-optimized:

Keyword target: "${keyword}"
Length: 1500-2000 parole
Structure:
- H1 title con keyword
- Intro (problema + soluzione preview)
- 5-7 H2 sections con tip pratici
- Tabelle confronto costi
- Lista checklist
- FAQ section (5 domande)
- CTA finale (link guida)

Tone: pratico, zero fuffa, numeri reali
Include: esempi specifici Italia, vendor noti, città
SEO: keyword density 1-2%, LSI keywords, internal links

Output: Markdown format con frontmatter`
    }],
  });
  
  const markdown = article.content[0].text;
  
  // Salva in app/blog/[slug]/page.mdx
  const slug = keyword.toLowerCase().replace(/\s+/g, '-');
  fs.writeFileSync(`./app/blog/${slug}/page.mdx`, markdown);
  
  console.log(`✅ Published: /blog/${slug}`);
}

// Genera 1 post/settimana
const weeklyKeyword = keywords[Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % keywords.length];
generateBlogPost(weeklyKeyword);
```

**Cron:** Ogni mercoledì 10:00  
**Output:** 52 blog post/anno automatici  
**SEO Impact:** Traffic organico 500-2K/mese dopo 6 mesi

---

## FASE 4: REDDIT/FORUM AUTOMATION (Semi-Auto)

### Target Subreddit:
- r/ItalyInformatica (discussioni freelance)
- r/ItaliaPersonalFinance (budget/risparmio)
- r/weddingplanning (English, ma grande)
- Forum alfemminile.com (sezione matrimonio)
- Forum weddingitalia.com

### Script: `scripts/reddit-monitor.ts`

```typescript
// Monitora menzioni keywords, suggerisce risposte
import Snoowrap from 'snoowrap';

const reddit = new Snoowrap({
  userAgent: 'matrimonio-monitor',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

const keywords = [
  'matrimonio costi',
  'budget matrimonio',
  'risparmiare matrimonio',
  'quanto costa matrimonio',
];

async function monitorReddit() {
  for (const keyword of keywords) {
    const posts = await reddit.search({
      query: keyword,
      subreddit: 'ItaliaPersonalFinance',
      time: 'day',
      limit: 5,
    });
    
    for (const post of posts) {
      // Genera risposta contestuale
      const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const response = await claude.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: `Reddit post:
Title: ${post.title}
Body: ${post.selftext}

Crea risposta utile (200 parole max):
- Rispondi alla domanda specifica
- Aggiungi 2-3 tip concreti
- Menzione naturale guida se rilevante (no spam)
- Tone: helpful, non promozionale

Output: plain text`
        }],
      });
      
      // Salva in approval queue (Tom approva 1x/settimana)
      fs.appendFileSync('./content/reddit-queue.txt', 
        `\n---\nPost: ${post.url}\nResponse:\n${response.content[0].text}\n`
      );
    }
  }
}

// Cron daily check
```

**Processo:**
1. Script trova thread rilevanti ogni giorno
2. Claude genera risposte utili
3. Salva in `reddit-queue.txt`
4. Tom/VA approva batch 1x/settimana (10 min)
5. Posta manualmente (Reddit non permette auto-post branded)

**Alternative Zero-Touch:** Skip Reddit, focus solo SEO blog.

---

## FASE 5: EMAIL DRIP SEQUENCE (100% Auto)

### Post-Purchase Automation (Resend)

**Email 1:** Immediate (webhook trigger)
```
Subject: ✓ Ecco la tua Guida Matrimonio Low-Cost
Body: PDF attached + benvenuto + quick start
```

**Email 2:** +2 giorni
```
Subject: Hai visto il Calcolatore Budget?
Body: Tutorial uso calcolatore Excel + caso studio
```

**Email 3:** +5 giorni
```
Subject: Errore #1 che fa saltare budget matrimoni
Body: Tip extra costi nascosti + story cliente
```

**Email 4:** +7 giorni (UPSELL)
```
Subject: Lista Fornitori Verificati Low-Cost
Body: Upsell Supplier Contact List €12
CTA: One-click Stripe checkout
```

**Email 5:** +14 giorni (Referral)
```
Subject: Conosci altre coppie in planning?
Body: Referral program (manda guida amici → €5 sconto loro, €3 credit Tom)
```

**Conversione target:**
- Email 4 upsell: 15% = €1.80 extra revenue/cliente
- Email 5 referral: 10% = 0.1 new customer/acquisto

**Setup:** Resend sequences (1 ora config iniziale, poi auto)

---

## FASE 6: ANALYTICS & OPTIMIZATION (Auto)

### Plausible Analytics (Gratis fino a 10K pageview/mese)

Dashboard auto-monitora:
- Traffic sources
- Top landing pages
- Conversion rate checkout
- Bounce rate

**Alert automation:**
```typescript
// Vercel Edge Function
// Se conversione scende <1.5% per 7 giorni → send alert email Tom
if (conversionRate7d < 0.015) {
  await resend.emails.send({
    to: 'ea.nervegna@gmail.com',
    subject: '⚠️ Matrimonio Site: Conversion Drop',
    html: `Conversione settimana: ${conversionRate7d}%<br>Check: landing copy, pricing, tech issues`,
  });
}
```

---

## FASE 7: SCALING AUTOMATION (Dopo €1K Revenue)

### A/B Testing Auto (Vercel Edge Middleware)

Test automatici:
- Pricing: €19 vs €22
- Bundle: €29 vs €32
- CTA copy variants
- Hero headline variants

**Winner auto-selected** dopo 200 conversioni.

### Upsell Automation v2

- Supplier List €12 → auto-offer post-checkout
- Wedding Timeline Planner €8 → email day 10
- Contract Template Pack €12 → email day 20

**Target:** €6-10 extra revenue/cliente

---

## TIMELINE AUTOMATION SETUP

**Settimana 1:**
- [ ] Setup Vercel Cron content generator
- [ ] Setup Resend email sequences
- [ ] Create Buffer/Zapier account (se vuoi auto-post)

**Settimana 2:**
- [ ] Generate primo batch 30 post (backlog)
- [ ] Publish primi 10 blog post SEO
- [ ] Setup Plausible analytics

**Settimana 3:**
- [ ] Test email drip flow (send test purchase)
- [ ] Setup Reddit monitor (opzionale)
- [ ] Launch!

**Settimana 4+:**
- [ ] Monitor 1x/settimana (10 min)
- [ ] Approve Reddit responses (opzionale)
- [ ] Check analytics dashboard

---

## COSTO TOTALE MENSILE

| Item | Costo |
|------|-------|
| Vercel hosting | €0 (free tier) |
| Resend email (3K/mese) | €0 |
| Anthropic API content gen | ~€2/mese |
| Buffer/Zapier | €0 (free tier) |
| Plausible analytics | €0 (free tier) |
| Domain | €0.83/mese (€10/anno) |
| **TOTALE** | **€2.83/mese** |

Dopo primi €500 revenue, opzionale upgrade:
- Buffer Pro (€6/mese) per auto-posting illimitato
- Plausible Pro (€9/mese) per analytics avanzate

**ROI:** Primo cliente copre 7 mesi di costi.

---

## TOM TIME INVESTMENT

**Setup iniziale:** 3-4 ore (1 volta)  
**Manutenzione:** 0 ore/mese (tutto automatico)  
**Opzionale check:** 10 min/settimana (approva Reddit responses se usi quella feature)

**Target:** 100% passive dopo setup.
