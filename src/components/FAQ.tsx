"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Sembra \"cheap\" agli invitati?",
    a: "No. Risparmi eliminando markup vendor e costi nascosti, non tagliando qualità visibile. Location agriturismo > villa commerciale. Buffet gourmet > menu servito noioso. Fiori stagionali > rose importate.",
  },
  {
    q: "Quanto tempo serve per applicare le strategie?",
    a: "2-3 ore totali distribuite su 12 mesi. La guida ha template email pre-scritti e checklist temporali. Copi, incolli, negozi.",
  },
  {
    q: "Funziona anche per matrimoni piccoli (<50 invitati)?",
    a: "Sì, anzi meglio. Risparmi percentuali maggiori perché hai più flessibilità. Alcune coppie hanno fatto matrimoni 30 persone sotto €4.000 totali.",
  },
  {
    q: "È legale negoziare così aggressivamente?",
    a: "Assolutamente. Non c'è nulla di illegale nel chiedere sconti, unbundling servizi, o portare fornitori esterni. Sono tutte pratiche commerciali standard.",
  },
  {
    q: "E se non sono soddisfatto?",
    a: "Offriamo garanzia 30 giorni soddisfatti o rimborsati. Se le strategie non funzionano per te, ti rimborsiamo senza domande.",
  },
  {
    q: "In che formato ricevo la guida?",
    a: "PDF professionale da 60 pagine, scaricabile immediatamente dopo l'acquisto. Include anche template email e checklist pronte all'uso.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Domande Frequenti
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Tutto quello che devi sapere prima di acquistare.
        </p>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="bg-white rounded-xl px-6 border"
            >
              <AccordionTrigger className="text-left font-semibold text-base md:text-lg py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
