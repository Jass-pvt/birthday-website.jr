import { useEffect, useRef, useState, useCallback } from "react";

export function useAmbientAudio() {
  const [isOn, setIsOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Loads public/birthday.mp3
    const audioPath = `${import.meta.env.BASE_URL}birthday.mp3`;
    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsOn(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsOn(false);
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (isOn) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [isOn, startMusic, stopMusic]);

  const playChime = useCallback(() => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = f;

        const t0 = ctx.currentTime + i * 0.11;
        gain.gain.setValueAtTime(0, t0);
        gain.gain.linearRampToValueAtTime(0.09, t0 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 1);
      });
    } catch {
      /* fallback */
    }
  }, []);

  return { isOn, toggleMusic, startMusic, stopMusic, playChime };
}