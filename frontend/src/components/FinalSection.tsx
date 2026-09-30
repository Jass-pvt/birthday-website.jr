import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface FinalSectionProps {
  name: string;
  closingCopy: string;
  onReplay: () => void;
}

export function FinalSection({ name, closingCopy, onReplay }: FinalSectionProps) {
  return (
    <section id="final" className="mx-auto max-w-3xl px-5 pb-40 pt-20 text-center sm:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="mb-6 bg-gradient-to-r from-gold-300 to-pink-300 bg-clip-text font-script text-[clamp(44px,8vw,84px)] text-transparent"
      >
        Happy Birthday, {name}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mx-auto mb-10 max-w-lg text-[17px] leading-[1.8] text-ink-dim"
      >
        {closingCopy}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ y: -3 }}
        whileTap={{ y: 0 }}
        onClick={onReplay}
        className="inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/6 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-white/12"
      >
        Replay the Birthday Experience
        <RotateCcw size={16} />
      </motion.button>
    </section>
  );
}
