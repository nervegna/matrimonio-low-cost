export function CaseStudy() {
  const original = [
    { label: "Villa Lago Como", cost: "€12.000" },
    { label: "Catering 5 portate", cost: "€9.500" },
    { label: "Foto + Video premium", cost: "€4.500" },
    { label: "Fiori e allestimenti", cost: "€3.200" },
    { label: "Abiti sposi", cost: "€4.800" },
    { label: "Musica / DJ", cost: "€1.800" },
    { label: "Stationery cartacea", cost: "€600" },
  ];

  const optimized = [
    { label: "Agriturismo Brianza venerdì", cost: "€3.200" },
    { label: "Catering buffet + 2 portate", cost: "€5.200" },
    { label: "Solo foto 6h", cost: "€1.400" },
    { label: "Fiori stagionali DIY", cost: "€480" },
    { label: "Abiti outlet + noleggio", cost: "€1.100" },
    { label: "Playlist Spotify", cost: "€0" },
    { label: "Inviti digitali Canva", cost: "€0" },
  ];

  return (
    <section className="bg-white py-16 md:py-24" id="caso-studio">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Caso Studio: Martina &amp; Luca, Milano 2024
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Matrimonio 100 invitati, stessa qualità, costi completamente diversi.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-100">
            <h3 className="text-xl font-bold mb-4 text-red-900 flex items-center gap-2">
              <span className="text-2xl">✗</span> Piano Originale
            </h3>
            <ul className="space-y-3">
              {original.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between text-gray-800"
                >
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.cost}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-red-200 mt-4 pt-4">
              <p className="text-2xl md:text-3xl font-bold text-red-900 text-right">
                TOTALE: €36.400
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 md:p-8 rounded-2xl border border-green-100">
            <h3 className="text-xl font-bold mb-4 text-green-900 flex items-center gap-2">
              <span className="text-2xl">✓</span> Con La Guida
            </h3>
            <ul className="space-y-3">
              {optimized.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between text-gray-800"
                >
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.cost}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-green-200 mt-4 pt-4">
              <p className="text-2xl md:text-3xl font-bold text-green-900 text-right">
                TOTALE: €11.380
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 bg-gradient-to-r from-rose-50 to-orange-50 p-8 rounded-2xl">
          <p className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
            €25.020 risparmiati
          </p>
          <p className="text-lg text-gray-600">
            = Anticipo casa + viaggio nozze Maldive incluso
          </p>
        </div>
      </div>
    </section>
  );
}
