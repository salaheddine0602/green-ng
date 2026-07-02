"use client";

import { useEffect, useState } from "react";

interface MysteryBox {
  id: string;
  category: string;
  title: string;
  scenario: string;
  options: string[];
}

interface SmartAnalysis {
  analysis: string;
  biasesDetected: string[];
  concepts: string[];
}

// Demo credentials for the prototype — the same in-memory account the backend
// serves. Full account management arrives with the database step of the roadmap.
const AUTH_HEADER = "Basic " + btoa("demo:greenbox123");

export default function Home() {
  const [box, setBox] = useState<MysteryBox | null>(null);
  const [opened, setOpened] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SmartAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/boxes/today", { headers: { Authorization: AUTH_HEADER } })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: MysteryBox) => setBox(data))
      .catch(() =>
        setError("تعذّر فتح صندوق اليوم — تأكد أن الخادم يعمل على المنفذ 8080."),
      );
  }, []);

  const confirmDecision = () => {
    if (!box || !chosen) return;
    fetch("/api/decisions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: AUTH_HEADER },
      body: JSON.stringify({ boxId: box.id, chosenOption: chosen, reasoning: "" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: SmartAnalysis) => setAnalysis(data))
      .catch(() => setError("تعذّر إرسال القرار — حاول مرة أخرى."));
  };

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <header className="text-center">
          <h1 className="text-4xl font-bold">
            Green <span className="text-lime-accent">Box</span>
          </h1>
          <p className="mt-3 text-muted-green">كل صندوق يغيّر طريقة تفكيرك بالمال</p>
        </header>

        {error && (
          <p className="mt-12 rounded-xl border border-red-300/40 bg-red-950/30 p-4 text-center text-red-200">
            {error}
          </p>
        )}

        {!error && !opened && (
          <section className="mt-14 rounded-2xl border border-border-green bg-card-green p-10 text-center">
            <p className="text-5xl">📦</p>
            <h2 className="mt-4 text-2xl font-semibold">صندوق اليوم وصل</h2>
            <p className="mt-2 text-muted-green">
              موقف مالي واقعي بانتظار قرارك — قرّر قبل معرفة النتيجة.
            </p>
            <button
              onClick={() => setOpened(true)}
              className="mt-8 rounded-xl bg-lime-accent px-8 py-3 text-lg font-bold text-deep-green transition hover:opacity-90"
            >
              افتح الصندوق
            </button>
          </section>
        )}

        {!error && opened && !box && (
          <p className="mt-14 text-center text-muted-green">جارٍ تجهيز الصندوق…</p>
        )}

        {!error && opened && box && (
          <section className="mt-14 rounded-2xl border border-border-green bg-card-green p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-accent">
              {box.category}
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{box.title}</h2>
            <p className="mt-4 leading-8 text-foreground/90">{box.scenario}</p>

            <div className="mt-8 flex flex-col gap-3">
              {box.options.map((option) => (
                <button
                  key={option}
                  onClick={() => !analysis && setChosen(option)}
                  disabled={analysis !== null}
                  className={`rounded-xl border px-5 py-4 text-start transition ${
                    chosen === option
                      ? "border-lime-accent bg-lime-accent text-deep-green"
                      : "border-lime-accent/60 text-lime-accent hover:bg-lime-accent/10"
                  } ${analysis && chosen !== option ? "opacity-40" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {!analysis && (
              <button
                onClick={confirmDecision}
                disabled={!chosen}
                className="mt-8 w-full rounded-xl bg-lime-accent px-6 py-3 text-lg font-bold text-deep-green transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                أؤكد قراري
              </button>
            )}
          </section>
        )}

        {analysis && (
          <section className="mt-6 rounded-2xl border-s-4 border-lime-accent bg-card-green p-8">
            <h3 className="text-xl font-semibold text-lime-accent">التحليل الذكي</h3>
            <p className="mt-3 leading-8">{analysis.analysis}</p>
            <p className="mt-4 text-muted-green">
              الانحيازات المكتشفة:{" "}
              {analysis.biasesDetected.length > 0 ? analysis.biasesDetected.join("، ") : "—"}
            </p>
            <p className="mt-1 text-muted-green">
              المفاهيم المالية:{" "}
              {analysis.concepts.length > 0 ? analysis.concepts.join("، ") : "—"}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
