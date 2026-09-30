import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Reveals `text` one character at a time once `start` becomes true.
 * Respects prefers-reduced-motion by revealing the full text instantly.
 */
export function useTypewriter(text: string, start: boolean, speed = 22) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const reducedMotion = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (!start) {
      started.current = false;
      return;
    }
    if (started.current) return;
    started.current = true;

    if (reducedMotion) {
      const timer = setTimeout(() => {
        setDisplayed(text);
        setDone(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [start, text, speed, reducedMotion]);

  return { displayed, done };
}
