import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import type { GalleryPhoto } from "../types";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  photos: GalleryPhoto[];
}

const PALETTES = [
  "linear-gradient(135deg,#5A4189,#3A2A63)",
  "linear-gradient(135deg,#F0A8C6,#C4913A)",
  "linear-gradient(135deg,#3A2A63,#171B3E)",
  "linear-gradient(135deg,#D9A94E,#5A4189)",
  "linear-gradient(135deg,#F6C9DD,#5A4189)",
  "linear-gradient(135deg,#171B3E,#5A4189)",
];

function tileGradient(i: number) {
  return PALETTES[i % PALETTES.length];
}

export function Gallery({ photos }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-28 sm:px-10 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mb-3 text-center text-[clamp(28px,4vw,42px)] font-bold tracking-tight text-paper"
      >
        Our Memories
      </motion.h2>
      <p className="mx-auto mb-14 max-w-lg text-center text-base leading-relaxed text-ink-dim">
        A few of the moments I keep coming back to.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {photos.map((photo, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -5, scale: 1.015 }}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo: ${photo.caption}`}
            className={`group relative flex min-h-[150px] items-end overflow-hidden rounded-2xl border border-white/10 ${
              i % 4 === 0 ? "sm:row-span-2" : ""
            } ${i % 4 === 2 ? "sm:col-span-2" : ""}`}
            style={{ background: tileGradient(i) }}
          >
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.caption}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50">
                <ImageIcon size={34} className="text-white/70" />
              </span>
            )}
            <span className="relative z-10 w-full bg-gradient-to-t from-navy-950/75 to-transparent px-4 py-3.5 text-left text-[13px] text-paper">
              {photo.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={openIndex}
        tileGradient={tileGradient}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
