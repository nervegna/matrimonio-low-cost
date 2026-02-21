const testimonials = [
  {
    text: "Abbiamo risparmiato €18.000. Matrimonio identico a quello che sognavamo, ma con anticipo casa in più. Grazie!",
    name: "Sofia & Marco",
    location: "Firenze",
    saved: "€18.000",
  },
  {
    text: "I template email vendor sono oro. Ho negoziato €4K di sconto solo copiando e incollando. ROI: 160x.",
    name: "Giulia & Alessandro",
    location: "Roma",
    saved: "€4.000",
  },
  {
    text: "Nessuno ha notato che abbiamo speso 1/3. Anzi, ci hanno fatto complimenti per il 'matrimonio da sogno'.",
    name: "Elena & Matteo",
    location: "Milano",
    saved: "€22.000",
  },
  {
    text: "La sezione fiori DIY ci ha fatto risparmiare €2.000. E i centrotavola erano più belli di quelli del fiorista!",
    name: "Chiara & Andrea",
    location: "Torino",
    saved: "€15.000",
  },
  {
    text: "Matrimonio 80 invitati, tutto con €7.500. Senza questa guida avremmo speso almeno €25.000.",
    name: "Laura & Francesco",
    location: "Bologna",
    saved: "€17.500",
  },
  {
    text: "Tattica 'evento privato' per la location: sconto immediato del 40%. Solo quella vale 100 volte il prezzo della guida.",
    name: "Valentina & Davide",
    location: "Napoli",
    saved: "€12.000",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 md:py-24 bg-white" id="testimonianze">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          182 Coppie, €376.000 Risparmiati
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Risultati reali di chi ha usato la nostra guida.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-gray-50 p-6 rounded-xl border hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 text-yellow-400 mb-3 text-lg">
                {"★★★★★"}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">
                  — {t.name}, {t.location}
                </p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  -{t.saved}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
