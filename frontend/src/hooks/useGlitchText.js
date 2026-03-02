import { useState, useEffect } from "react";

const scramble = (str) =>
  str
    .split("")
    .map((c) => (c === " " ? " " : String.fromCharCode(33 + (Math.random() * 93) | 0)))
    .join("");

export const useGlitchText = (text, glitchDuration = 300) => {
  const safeText = text || "";
  const [displayText, setDisplayText] = useState(safeText);
  const [prevSafeText, setPrevSafeText] = useState(safeText);

  // React "adjust state during render" pattern — runs synchronously
  // so we NEVER return a stale name from the previous active member.
  if (prevSafeText !== safeText) {
    setPrevSafeText(safeText);
    setDisplayText(scramble(safeText)); // immediately show scrambled NEW name
  }

  useEffect(() => {
    if (!safeText) {
      setDisplayText("");
      return undefined;
    }

    // Run glitch effect ONCE on text change, then settle
    let timerId;
    const frames = 6;
    let frame = 0;

    timerId = setInterval(() => {
      if (frame < frames) {
        setDisplayText(scramble(safeText));
        frame++;
      } else {
        setDisplayText(safeText);
        clearInterval(timerId);
      }
    }, glitchDuration / frames);

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [safeText, glitchDuration]);

  return displayText;
};
