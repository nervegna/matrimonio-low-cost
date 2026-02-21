"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Calculator() {
  const [budget, setBudget] = useState<number>(30000);
  const [guests, setGuests] = useState<number>(100);
  const [season, setSeason] = useState<"alta" | "bassa">("alta");
  const [result, setResult] = useState<{
    saving: number;
    percent: number;
  } | null>(null);

  const calculate = () => {
    const seasonMultiplier = season === "bassa" ? 0.78 : 0.68;
    const guestFactor = guests <= 50 ? 0.65 : guests <= 80 ? 0.68 : 0.72;
    const optimizedBudget = Math.round(budget * guestFactor * (seasonMultiplier + 0.02));
    const saving = budget - optimizedBudget;
    const percent = Math.round((saving / budget) * 100);
    setResult({ saving, percent });
  };

  return (
    <section
      className="bg-gradient-to-br from-rose-100 to-orange-100 py-16 md:py-24"
      id="calcolatore"
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Quanto Potresti Risparmiare?
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Inserisci i tuoi dati per una stima personalizzata del risparmio.
        </p>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <div className="space-y-5">
            <div>
              <label className="block font-semibold mb-2 text-sm">
                Budget Attuale Previsto (€)
              </label>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                placeholder="30000"
                className="text-lg py-5"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">
                Numero Invitati
              </label>
              <Input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                placeholder="100"
                className="text-lg py-5"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">
                Stagione Matrimonio
              </label>
              <select
                value={season}
                onChange={(e) =>
                  setSeason(e.target.value as "alta" | "bassa")
                }
                className="w-full p-3 border-2 rounded-lg text-lg bg-white"
              >
                <option value="alta">Alta stagione (maggio - settembre)</option>
                <option value="bassa">
                  Bassa stagione (ottobre - aprile)
                </option>
              </select>
            </div>

            <Button
              size="lg"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-6 text-lg font-bold shadow-lg"
              onClick={calculate}
            >
              Calcola Risparmio
            </Button>

            {result && (
              <div className="bg-green-50 p-6 rounded-xl text-center border border-green-200 animate-in fade-in duration-300">
                <p className="text-gray-600 mb-1">Risparmio Stimato:</p>
                <p className="text-4xl md:text-5xl font-bold text-green-600">
                  €{result.saving.toLocaleString("it-IT")}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ({result.percent}% del budget originale)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
