import { useScrollProgress } from "../hooks/useScrollProgress";

export function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed inset-x-0 top-0 z-[1000] h-[3px] bg-white/5 pt-[env(safe-area-inset-top,0px)]"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-[3px] bg-gradient-to-r from-pink-400 to-gold-400 transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
