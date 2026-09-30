import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { useTypewriter } from "../hooks/useTypewriter";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CONFIG } from "../config/celebration";

interface SurpriseProps {
  secretMessage: string;
  onCelebrate: () => void;
}

export function Surprise({ secretMessage, onCelebrate }: SurpriseProps) {
  const [opened, setOpened] = useState(false);
  const reducedMotion = useReducedMotion();
  const { displayed } = useTypewriter(secretMessage, opened, 20);

  function handleClick() {
    if (opened) return;
    setOpened(true);
    onCelebrate();
    confetti({
      particleCount: reducedMotion ? 30 : 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#EFD08C", "#D9A94E", "#F0A8C6", "#F6C9DD", "#FBF8F3"],
    });
  }

  return (
    <section id="surprise" className="mx-auto max-w-2xl px-5 py-28 text-center sm:px-10 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="mb-3 text-[clamp(28px,4vw,42px)] font-bold tracking-tight text-paper">
          One More Thing
        </h2>
        <p className="mb-8 text-base leading-relaxed text-ink-dim">
          There's a little something waiting for you.
        </p>

        {/* 💡 Bouncing "Click Me" callout badge */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mb-3 flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide text-gold-300"
            >
              <span className="inline-block animate-bounce">✨ Click below to open your surprise! 👇</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ y: 0 }}
          onClick={handleClick}
          disabled={opened}
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 px-8 py-4 text-[15px] font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(217,169,78,0.55)] transition-shadow hover:shadow-[0_16px_36px_-8px_rgba(217,169,78,0.7)] disabled:cursor-default disabled:opacity-80"
        >
          I Have One More Surprise For You
          <Gift size={18} />
        </motion.button>

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 36 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-pink-300/30 bg-gradient-to-br from-pink-400/10 to-gold-400/5 px-8 py-10 shadow-[0_0_60px_-10px_rgba(240,168,198,0.25)]"
            >
              <div className="mb-1.5 font-script text-5xl leading-none text-pink-300">&ldquo;</div>
              <p className="min-h-[3em] font-script text-2xl leading-snug text-paper">{displayed}</p>

              {(CONFIG as { giftUrl?: string }).giftUrl && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="mt-6 pt-5 border-t border-pink-300/20"
                >
                  <a
                    href={(CONFIG as { giftUrl?: string }).giftUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-amber-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-md hover:brightness-110 transition-all"
                  >
                    🎁 Open Your Birthday Gift
                    <ExternalLink size={16} />
                  </a>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}