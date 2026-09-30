import { useState } from "react";
import { motion } from "framer-motion";
import type { Reason } from "../types";

interface ReasonsProps {
  reasons: Reason[];
}

export function Reasons({ reasons }: ReasonsProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="reasons" className="mx-auto max-w-5xl px-5 py-28 sm:px-10 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mb-3 text-center text-[clamp(28px,4vw,42px)] font-bold tracking-tight text-paper"
      >
        Why You're Special
      </motion.h2>
      <p className="mx-auto mb-14 max-w-lg text-center text-base leading-relaxed text-ink-dim">
        Just a few reasons, out of far too many to count.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {reasons.map((reason, i) => {
          const isActive = active === i;
          return (
            <motion.button
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              onClick={() => setActive(isActive ? null : i)}
              className={`rounded-[20px] border bg-gradient-to-br from-white/[0.055] to-white/[0.015] px-6 py-7 text-center transition-[border-color,box-shadow] duration-300 ${
                isActive
                  ? "border-gold-400/50 shadow-[0_22px_40px_-22px_rgba(217,169,78,0.35)]"
                  : "border-white/10"
              }`}
            >
              <div className="mb-3.5 text-4xl">{reason.emoji}</div>
              <div className="mb-2 text-[17px] font-bold text-paper">{reason.title}</div>
              <div className="text-sm leading-relaxed text-ink-dim">{reason.note}</div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
