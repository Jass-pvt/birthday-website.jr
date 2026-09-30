import { motion } from "framer-motion";
import type { TimelineEntry } from "../types";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <section id="timeline" className="mx-auto max-w-4xl px-5 py-28 sm:px-10 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mb-3 text-center text-[clamp(28px,4vw,42px)] font-bold tracking-tight text-paper"
      >
        A Journey Through the Memories
      </motion.h2>
      <p className="mx-auto mb-16 max-w-lg text-center text-base leading-relaxed text-ink-dim">
        Every chapter that brought us here.
      </p>

      <div className="relative grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-y-16 before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-gradient-to-b before:from-gold-400 before:to-pink-300 sm:before:left-1/2 sm:before:-translate-x-1/2">
        {entries.map((entry, i) => {
          const isRight = i % 2 === 1;
          return (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative w-full pl-11 sm:pl-0 ${
                isRight
                  ? "sm:col-start-2 sm:text-left sm:pl-10"
                  : "sm:col-start-1 sm:text-right sm:pr-10"
              }`}
            >
              <span
                className={`absolute top-1 h-3 w-3 rounded-full bg-gold-400 shadow-[0_0_0_5px_rgba(217,169,78,0.18)] ${
                  isRight
                    ? "left-2.5 sm:left-0 sm:-translate-x-1/2"
                    : "left-2.5 sm:left-auto sm:right-0 sm:translate-x-1/2"
                }`}
              />
              <div className="mb-1.5 text-[13px] tracking-wide text-gold-300">{entry.date}</div>
              <div className="mb-2 font-script text-[26px] text-paper">{entry.title}</div>
              <div className="text-[14.5px] leading-relaxed text-ink-dim">{entry.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
