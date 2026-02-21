"use client";

import { Button } from "@/components/ui/button";

export function WhatYouGet() {
  const sections = [
    {
      icon: "📍",
      title: "Location",
      saving: "€5-12K",
      desc: "Alternative venue, tattica 'evento privato', vendor unbundling, hidden fees da eliminare",
    },
    {
      icon: "🍽️",
      title: "Catering",
      saving: "€3-8K",
      desc: "Buffet vs servito, beverage engineering, torta alternativa, bomboniere DIY",
    },
    {
      icon: "📸",
      title: "Fotografia",
      saving: "€1.5-4K",
      desc: "Unbundling foto/video, coverage 6h vs 12h, album digitale, video DIY",
    },
    {
      icon: "💐",
      title: "Fiori",
      saving: "€1-3K",
      desc: "Fiori stagionali, centrotavola DIY, arco greenery, riuso fiori cerimonia→ricevimento",
    },
    {
      icon: "👗",
      title: "Abiti & Beauty",
      saving: "€1-2.5K",
      desc: "Outlet e noleggio, sartoria locale, damigelle smart, hair & makeup salone",
    },
    {
      icon: "🎵",
      title: "Musica",
      saving: "€800-2K",
      desc: "Playlist Spotify + speaker, cerimonia bluetooth, photobooth Polaroid",
    },
    {
      icon: "✉️",
      title: "Stationery",
      saving: "€300-800",
      desc: "Inviti digitali, save the date WhatsApp, menù template Etsy, tableau Canva",
    },
    {
      icon: "✈️",
      title: "Viaggio Nozze",
      saving: "€1.5-4K",
      desc: "Honeymoon posticipato, destinazioni alternative, points hacking Italia",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="contenuto">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Cosa Trovi Nella Guida
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          60 pagine di strategie pratiche, template pronti all&apos;uso e
          calcolatori per ogni voce di spesa.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sections.map((s) => (
            <div
              key={s.title}
              className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-lg">{s.title}</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  -{s.saving}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-rose-50 p-6 md:p-8 rounded-2xl border border-rose-100">
          <h3 className="font-bold text-xl mb-4 text-center">
            Bonus Inclusi
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Template Email Vendor",
                desc: "Script copia-incolla per negoziare con location, fotografo, catering e fiorista",
              },
              {
                title: "Checklist Costi Nascosti",
                desc: "Lista completa di 10+ costi che i vendor non ti dicono (€1.900-4.000)",
              },
              {
                title: "Timeline 12 Mesi",
                desc: "Quando prenotare ogni vendor per massimizzare sconti e disponibilità",
              },
            ].map((b) => (
              <div key={b.title} className="text-center">
                <p className="font-semibold mb-1">{b.title}</p>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const handleCheckout = async (mode: "single" | "bundle") => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-rose-600 to-pink-600 text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Inizia a Risparmiare Oggi
        </h2>
        <p className="text-lg text-rose-100 mb-8 max-w-xl mx-auto">
          Per meno del costo di una bomboniera, risparmi migliaia di euro sul
          tuo matrimonio.
        </p>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-xl">
              <p className="text-sm text-rose-200 mb-1">Guida Singola</p>
              <div className="mb-2">
                <span className="line-through text-rose-300 text-lg mr-2">€25</span>
                <span className="text-4xl font-bold">€19</span>
              </div>
              <p className="text-sm text-rose-200 mb-4">
                PDF 60 pagine + template + checklist
              </p>
              <Button
                size="lg"
                className="w-full bg-white text-rose-600 hover:bg-rose-50 font-bold py-5"
                onClick={() => handleCheckout("single")}
              >
                Acquista Ora — Risparmi €6
              </Button>
            </div>
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white/30 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                PIU&apos; POPOLARE
              </span>
              <p className="text-sm text-rose-200 mb-1">Bundle Coppia</p>
              <div className="mb-2">
                <span className="line-through text-rose-300 text-lg mr-2">€35</span>
                <span className="text-4xl font-bold">€29</span>
              </div>
              <p className="text-sm text-rose-200 mb-4">
                2 copie PDF + accesso condiviso
              </p>
              <Button
                size="lg"
                className="w-full bg-white text-rose-600 hover:bg-rose-50 font-bold py-5"
                onClick={() => handleCheckout("bundle")}
              >
                Acquista Bundle — Risparmi €6
              </Button>
            </div>
          </div>
        </div>

        <p className="text-sm text-rose-200">
          Garanzia 30 giorni soddisfatti o rimborsati. Pagamento sicuro con
          Stripe.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Matrimonio Low Cost — Guida Tattica
          Italia
        </p>
        <p>
          Prodotto digitale. Non rimpiazzerà la consulenza di un wedding planner
          professionista.
        </p>
      </div>
    </footer>
  );
}
