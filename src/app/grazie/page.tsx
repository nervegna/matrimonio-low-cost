import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grazie per il tuo acquisto! — Matrimonio Low Cost",
  description: "La tua guida è in arrivo. Controlla la tua email.",
  robots: { index: false, follow: false },
};

export default function GraziePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Grazie per il tuo acquisto!
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          La tua guida &ldquo;Matrimonio da €30K con €8K&rdquo; è in arrivo
          nella tua casella email. Controlla anche la cartella spam.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <h2 className="font-bold text-lg mb-4">Prossimi Passi:</h2>
          <ol className="text-left space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="bg-rose-100 text-rose-700 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                1
              </span>
              <span>
                Apri l&apos;email e scarica il PDF della guida
              </span>
            </li>
            <li className="flex gap-3">
              <span className="bg-rose-100 text-rose-700 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                2
              </span>
              <span>
                Leggi la Sezione 1 per capire il sistema di risparmio
              </span>
            </li>
            <li className="flex gap-3">
              <span className="bg-rose-100 text-rose-700 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                3
              </span>
              <span>
                Usa i template email per contattare i primi vendor
              </span>
            </li>
            <li className="flex gap-3">
              <span className="bg-rose-100 text-rose-700 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                4
              </span>
              <span>
                Segui la timeline 12 mesi per non dimenticare nulla
              </span>
            </li>
          </ol>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Non hai ricevuto l&apos;email? Controlla la cartella spam o contattaci
          a{" "}
          <a
            href="mailto:help@matrimoniolowcost.it"
            className="text-rose-600 underline"
          >
            help@matrimoniolowcost.it
          </a>
        </p>

        <Link href="/">
          <Button
            variant="outline"
            className="border-rose-600 text-rose-600 hover:bg-rose-50"
          >
            Torna alla Homepage
          </Button>
        </Link>
      </div>
    </main>
  );
}
