import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import type { GalleryPhoto } from "../types";

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number | null;
  tileGradient: (i: number) => string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ photos, index, tileGradient, onClose, onNavigate }: LightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || index === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index! - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onNavigate((index! + 1) % photos.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, index, photos.length, onClose, onNavigate]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || index === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (diffX > 50) {
      onNavigate((index - 1 + photos.length) % photos.length);
    } else if (diffX < -50) {
      onNavigate((index + 1) % photos.length);
    }
    touchStartX.current = null;
  }

  return (
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-navy-950/92 p-4 backdrop-blur-md sm:p-6"
        >
          <div className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5">
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close photo viewer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-paper transition-colors hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <button
            onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-paper transition-colors hover:bg-white/20 sm:left-5"
          >
            <ChevronLeft size={20} />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative flex max-h-[85vh] w-full max-w-xl flex-col items-center justify-center overflow-hidden rounded-[20px] border border-white/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
            style={{ background: tileGradient(index) }}
          >
            {photos[index].src ? (
              <img
                src={photos[index].src}
                alt={photos[index].caption}
                className="max-h-[60vh] w-full object-contain bg-black/30"
              />
            ) : (
              <div className="flex h-48 items-center justify-center opacity-55 sm:h-64">
                <ImageIcon size={56} className="text-white" />
              </div>
            )}
            <div className="w-full bg-navy-950/70 px-6 py-4 text-center text-[15px] font-medium text-paper backdrop-blur-sm">
              {photos[index].caption}
            </div>
          </motion.div>

          <button
            onClick={() => onNavigate((index + 1) % photos.length)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-paper transition-colors hover:bg-white/20 sm:right-5"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
