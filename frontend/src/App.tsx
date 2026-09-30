import { useCallback, useState } from "react";
import { CONFIG } from "./config/celebration";
import { useAmbientAudio } from "./hooks/useAmbientAudio";
import { ProgressBar } from "./components/ProgressBar";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { BirthdayMessage } from "./components/BirthdayMessage";
import { Reasons } from "./components/Reasons";
import { Timeline } from "./components/Timeline";
import { Surprise } from "./components/Surprise";
import { BirthdayCake } from "./components/BirthdayCake";
import { FinalSection } from "./components/FinalSection";
import { MusicModal } from "./components/MusicModal";

export default function App() {
  const { isOn: musicOn, toggleMusic, startMusic, playChime } = useAmbientAudio();
  const [resetKey, setResetKey] = useState(0);
  const [showMusicModal, setShowMusicModal] = useState(true);

  const scrollToMessage = useCallback(() => {
    document.getElementById("message")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleReplay = useCallback(() => {
    setResetKey((k) => k + 1);
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handlePlayMusic = () => {
    startMusic();
    setShowMusicModal(false);
  };

  const handleSkipMusic = () => {
    setShowMusicModal(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* 🎵 Initial Popup Modal */}
      <MusicModal
        isOpen={showMusicModal}
        onPlay={handlePlayMusic}
        onSkip={handleSkipMusic}
        name={CONFIG.name}
      />

      <ProgressBar />
      <Navigation musicOn={musicOn} onToggleMusic={toggleMusic} />

      <Hero name={CONFIG.name} kicker={CONFIG.heroKicker} onBegin={scrollToMessage} />
      <BirthdayMessage key={`msg-${resetKey}`} message={CONFIG.message} signature={CONFIG.signature} />
      <Reasons reasons={CONFIG.reasons} />
      <Timeline entries={CONFIG.timeline} />
      
      <BirthdayCake key={`cake-${resetKey}`} onCelebrate={playChime} />
      <Surprise key={`surprise-${resetKey}`} secretMessage={CONFIG.secretMessage} onCelebrate={playChime} />
      
      <FinalSection name={CONFIG.name} closingCopy={CONFIG.closingCopy} onReplay={handleReplay} />

      <footer className="pb-9 pt-2 text-center text-[12.5px] text-ink-dim opacity-60">
        made with love, one section at a time
      </footer>
    </div>
  );
}