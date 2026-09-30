import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

interface BirthdayMessageProps {
  message: string;
  signature: string;
}

export function BirthdayMessage({ message, signature }: BirthdayMessageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { displayed, done } = useTypewriter(message, inView);

  return (
    <section id="message" className="mx-auto max-w-5xl px-5 py-28 sm:px-10 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mb-3 text-center text-[clamp(28px,4vw,42px)] font-bold tracking-tight text-paper"
      >
        A Little Message For You
      </motion.h2>
      <p className="mx-auto mb-14 max-w-lg text-center text-base leading-relaxed text-ink-dim">
        Written for this exact moment.
      </p>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 text-center shadow-[0_30px_60px_-30px_rgba(5,4,20,0.45)] backdrop-blur-md sm:p-16"
      >
        <div className="mb-1.5 font-script text-5xl leading-none text-gold-400">&ldquo;</div>
        <p className="min-h-[3.5em] text-[clamp(18px,2.4vw,23px)] leading-[1.75] text-paper">
          {displayed}
          {!done && (
            <span
              className="ml-0.5 inline-block h-[1em] w-0.5 animate-blink bg-gold-300 align-[-2px]"
              aria-hidden="true"
            />
          )}
        </p>
        <div className="mt-7 font-script text-2xl text-pink-300">{signature}</div>
      </motion.div>
    </section>
  );
}
