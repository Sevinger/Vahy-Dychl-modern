import { useState, useEffect, useRef } from "react";
import { getVisitorStats } from "@/api/supabaseClient";

function AnimatedNumber({ value }) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!value) return;
    const target = Number(value);
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <>{displayed.toLocaleString("cs-CZ")}</>;
}

export default function Footer() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getVisitorStats().then(data => setStats(data));
  }, []);

  return (
    <footer style={{ background: "#080e1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {stats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div
            className="rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-center">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#475569" }}>
                Návštěvy dnes
              </p>
              <p
                className="text-4xl font-black tabular-nums"
                style={{
                  color: "#38bdf8",
                  textShadow: "0 0 24px rgba(56,189,248,0.35)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <AnimatedNumber value={stats.today} />
              </p>
            </div>

            <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.08)" }} className="hidden sm:block" />

            <div className="text-center">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#475569" }}>
                Celkem návštěv
              </p>
              <p
                className="text-4xl font-black tabular-nums"
                style={{
                  color: "#e2e8f0",
                  textShadow: "0 0 24px rgba(226,232,240,0.12)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <AnimatedNumber value={stats.total} />
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="py-6 text-center">
        <p className="text-xs tracking-widest" style={{ color: "#475569" }}>
          © 2026 VÁHY-DYCHL · Všechna práva vyhrazena
        </p>
      </div>
    </footer>
  );
}
