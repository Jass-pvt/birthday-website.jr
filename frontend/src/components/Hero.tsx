import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkle } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface HeroProps {
  name: string;
  kicker: string;
  onBegin: () => void;
}

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  isHeart: boolean;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: Math.random() * 14 + 10,
    duration: Math.random() * 8 + 10,
    delay: Math.random() * 10,
    isHeart: Math.random() > 0.4,
  }));
}

export function Hero({ name, kicker, onBegin }: HeroProps) {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particles = useMemo(
    () => (reducedMotion ? [] : makeParticles(isMobile ? 14 : 26)),
    [reducedMotion, isMobile]
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center"
    >
      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.6, 0.6, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{ left: `${p.left}%`, willChange: "transform" }}
          >
            {p.isHeart ? (
              <Heart size={p.size} className="fill-pink-400/70 text-pink-400/70" />
            ) : (
              <Sparkle size={p.size * 0.8} className="fill-gold-300/70 text-gold-300/70" />
            )}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-sm font-medium tracking-[0.08em] text-pink-300"
        >
          {kicker.toUpperCase()}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-[clamp(30px,6vw,52px)] font-light leading-[1.05] text-paper"
        >
          Happy Birthday,
          <span className="mt-1.5 block bg-gradient-to-r from-gold-300 via-pink-300 to-gold-400 bg-clip-text font-script text-[clamp(56px,12vw,120px)] leading-[1.1] text-transparent drop-shadow-[0_0_26px_rgba(217,169,78,0.35)]">
            {name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-7 mb-11 max-w-md text-[clamp(15px,2vw,18px)] text-ink-dim"
        >
          Today is all about celebrating you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ y: -3 }}
          whileTap={{ y: 0 }}
          onClick={onBegin}
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 px-8 py-4 text-[15px] font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(217,169,78,0.55)] transition-shadow hover:shadow-[0_16px_36px_-8px_rgba(217,169,78,0.7)]"
        >
          Begin the Celebration
          <ArrowRight size={18} />
        </motion.button>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-xs tracking-wide text-ink-dim opacity-75">
        <span
          className={`h-8 w-px bg-gradient-to-b from-gold-400 to-transparent ${
            reducedMotion ? "" : "animate-scroll-pulse"
          }`}
        />
        scroll
      </div>
    </section>
  );
}
