import { motion, AnimatePresence } from "framer-motion";
import { Gift, Music2, VolumeX } from "lucide-react";

interface MusicModalProps {
  isOpen: boolean;
  onPlay: () => void;
  onSkip: () => void;
  name: string;
}

export function MusicModal({ isOpen, onPlay, onSkip, name }: MusicModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-navy-950/75 p-4 backdrop-blur-md">
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-amber-400/10 blur-[60px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-[320px] overflow-hidden rounded-2xl border border-amber-300/25 bg-slate-950/90 p-5 text-center shadow-2xl backdrop-blur-xl sm:p-6"
        >
          {/* Gift Reminder Badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-300">
            <Gift size={13} className="animate-bounce text-amber-300" />
            <span>Don't forget to open your gift below!</span>
          </div>

          {/* Icon */}
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-400/10 text-amber-300">
            <Music2 size={20} />
          </div>

          {/* Heading & Subtitle */}
          <h3 className="mb-1 text-lg font-semibold text-white">
            Music for {name}
          </h3>
          <p className="mb-5 text-[12.5px] leading-relaxed text-slate-400">
            Play music while you scroll through your surprise celebration!
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={onPlay}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 py-2.5 text-[13px] font-semibold text-slate-950 shadow-md transition hover:brightness-110 active:scale-[0.98]"
            >
              <Music2 size={15} />
              <span>Play Music & Enter</span>
            </button>

            <button
              onClick={onSkip}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-2 text-[12px] font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <VolumeX size={14} />
              <span>Skip Music</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}