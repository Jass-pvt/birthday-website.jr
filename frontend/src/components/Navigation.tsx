import { useState } from "react";
import { Menu, Music, VolumeX, X, Gift as GiftIcon, Sparkles } from "lucide-react";

interface NavigationProps {
  musicOn: boolean;
  onToggleMusic: () => void;
}

const LINKS = [
  { href: "#message", label: "Message" },
  { href: "#reasons", label: "Why You" },
  { href: "#timeline", label: "Our Story" },
  { href: "#cake", label: "Make a Wish" },
];

export function Navigation({ musicOn, onToggleMusic }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      setMobileMenuOpen(false);
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-[3px] z-[900] flex items-center justify-between bg-gradient-to-b from-navy-950/90 via-navy-950/70 to-transparent px-3.5 py-3.5 pt-[calc(14px+env(safe-area-inset-top,0px))] backdrop-blur-md sm:px-10">
        <a href="#hero" className="text-[14px] font-semibold tracking-wide text-gold-300 sm:text-[15px]">
          for you, always
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-7 sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="border-b border-transparent pb-0.5 text-sm text-ink-dim transition-colors hover:border-gold-400 hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Controls: Always-Visible Gift Badge + Music + Hamburger */}
        <div className="flex items-center gap-2">
          {/* 🎁 Always-Visible "Pop" Gift Badge (Visible on both Mobile & Desktop) */}
          <a
            href="#surprise"
            onClick={(e) => handleNavClick(e, "#surprise")}
            className="group relative flex items-center gap-1.5 rounded-full border border-amber-300/50 bg-gradient-to-r from-amber-400/20 via-amber-300/15 to-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-105 hover:border-amber-300 hover:shadow-[0_0_22px_rgba(251,191,36,0.5)] active:scale-95 sm:px-3.5"
          >
            <GiftIcon size={13} className="animate-bounce text-amber-300" />
            <span>Gift</span>
            <Sparkles size={11} className="hidden text-amber-300 animate-pulse xs:inline" />

            {/* Outer Pulsing Glow Effect */}
            <span className="absolute -inset-0.5 -z-10 rounded-full bg-amber-400/20 blur-sm animate-pulse" />
          </a>

          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            aria-pressed={musicOn}
            aria-label={musicOn ? "Turn background music off" : "Turn background music on"}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1.5 text-[12px] text-ink transition-colors hover:bg-white/10 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-[13px]"
          >
            {musicOn ? <Music size={15} /> : <VolumeX size={15} />}
            <span className="hidden xs:inline">{musicOn ? "Music on" : "Music"}</span>
            <span className="xs:hidden">{musicOn ? "On" : "Music"}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink sm:hidden"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] z-[899] border-b border-white/10 bg-navy-950/95 px-6 py-5 backdrop-blur-lg sm:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-1 text-base text-ink-dim transition-colors hover:text-gold-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}