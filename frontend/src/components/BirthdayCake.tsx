import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface BirthdayCakeProps {
  onCelebrate: () => void;
}

const CANDLE_X = [103, 130, 157];

function Flame({ x, y, lit, reducedMotion }: { x: number; y: number; lit: boolean; reducedMotion: boolean }) {
  const flicker = !reducedMotion && lit;

  return (
    <motion.g
      animate={{
        opacity: lit ? 1 : 0,
        scale: flicker ? [1, 1.12, 1] : 1,
        rotate: flicker ? [-2, 2, -2] : 0,
      }}
      transition={
        flicker
          ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.5 }
      }
      style={{ transformOrigin: `${x}px ${y + 4}px` }}
    >
      <ellipse cx={x} cy={y} rx="5" ry="9" fill="#F0A8C6" />
      <ellipse cx={x} cy={y + 2} rx="2.5" ry="5" fill="#EFD08C" />
    </motion.g>
  );
}

export function BirthdayCake({ onCelebrate }: BirthdayCakeProps) {
  const [lit, setLit] = useState(true);
  const [wished, setWished] = useState(false);
  const reducedMotion = useReducedMotion();

  function handleWish() {
    setLit(false);
    setWished(true);
    onCelebrate();
    confetti({
      particleCount: reducedMotion ? 30 : 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#EFD08C", "#D9A94E", "#F0A8C6", "#F6C9DD", "#FBF8F3"],
    });
  }

  return (
    <section id="cake" className="mx-auto max-w-2xl px-5 py-28 text-center sm:px-10 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mb-3 text-[clamp(28px,4vw,42px)] font-bold tracking-tight text-paper"
      >
        One Wish, Before We Go On
      </motion.h2>
      <p className="mb-12 text-base leading-relaxed text-ink-dim">Close your eyes for a second.</p>

      <div className="flex flex-col items-center">
        <svg width="260" height="220" viewBox="0 0 260 220">
          <defs>
            <linearGradient id="frosting" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F6C9DD" />
              <stop offset="100%" stopColor="#EFAECF" />
            </linearGradient>
            <linearGradient id="cakeBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5A4189" />
              <stop offset="100%" stopColor="#3A2A63" />
            </linearGradient>
          </defs>

          <ellipse cx="130" cy="196" rx="100" ry="12" fill="rgba(255,255,255,0.08)" />
          <rect x="55" y="140" width="150" height="50" rx="10" fill="url(#cakeBody)" />
          <rect x="75" y="95" width="110" height="50" rx="10" fill="url(#cakeBody)" opacity="0.92" />
          <rect x="55" y="132" width="150" height="14" rx="7" fill="url(#frosting)" />
          <rect x="75" y="87" width="110" height="14" rx="7" fill="url(#frosting)" />

          {CANDLE_X.map((x, i) => {
            const y = [60, 55, 60][i];
            const h = [30, 35, 30][i];
            return (
              <g key={x}>
                <rect x={x - 3} y={y} width="6" height={h} rx="2" fill="#EFD08C" />
                <Flame x={x} y={y - 6} lit={lit} reducedMotion={reducedMotion} />
              </g>
            );
          })}
        </svg>

        {/* 💡 Bouncing "Click Me" callout badge */}
        <AnimatePresence>
          {!wished && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide text-gold-300"
            >
              <span className="inline-block animate-bounce">✨ Click here to blow candles! 👇</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ y: 0 }}
          onClick={handleWish}
          disabled={wished}
          className="mt-2 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 px-8 py-4 text-[15px] font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(217,169,78,0.55)] transition-shadow hover:shadow-[0_16px_36px_-8px_rgba(217,169,78,0.7)] disabled:cursor-default disabled:opacity-80"
        >
          Make a Wish
          <PartyPopper size={18} />
        </motion.button>

        <div className="mt-6 min-h-[60px] text-center">
          <AnimatePresence>
            {wished && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-script text-[28px] text-gold-300"
              >
                Make a wish...
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {wished && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="mt-2 text-base text-ink-dim"
              >
                May all your dreams come true.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}