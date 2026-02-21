"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
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
    <section className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="inline-block bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
          Sconto Lancio 24% — Solo Prime 100 Copie
        </div>

        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 mb-6 text-sm px-4 py-1.5 block w-fit">
          182 coppie hanno già risparmiato €376.000 nel 2025
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
          Il tuo matrimonio da
          <br />
          <span className="line-through text-gray-400">€30.000</span>{" "}
          <span className="text-rose-600">€8.000</span>
          <br />
          senza compromessi
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
          Guida tattica per ridurre costi del 70% mantenendo qualità.
          <br />
          Negoziazione vendor, alternative smart, costi nascosti eliminati.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-rose-200"
            onClick={() => handleCheckout("single")}
          >
            <span className="line-through text-rose-300 text-sm mr-2">€25</span>
            Scarica Guida — €19
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-rose-600 text-rose-600 hover:bg-rose-50 px-8 py-6 text-lg font-semibold"
            onClick={() => handleCheckout("bundle")}
          >
            <span className="line-through text-gray-400 text-sm mr-2">€35</span>
            Bundle Coppia — €29
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          {[
            "60 pagine strategie concrete",
            "Calcolatore budget Excel",
            "Template email vendor",
            "Checklist costi nascosti",
            "Timeline 12 mesi planning",
            "Garanzia soddisfatti o rimborsati",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-rose-600 text-lg flex-shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
