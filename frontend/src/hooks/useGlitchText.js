import { useState, useEffect } from "react";

export const useGlitchText = (text, glitchDuration = 300) => {
  const safeText = text || "";
  const [displayText, setDisplayText] = useState(safeText);

  useEffect(() => {
    setDisplayText(safeText); // ensure the latest member name shows instantly on hover
  }, [safeText]);

  useEffect(() => {
    if (!safeText) {
      return undefined;
    }

    let glitchTimerId;
    const frames = 5;

    const runGlitch = () => {
      let currentFrame = 0;

      glitchTimerId = setInterval(() => {
        if (currentFrame < frames) {
          const glitchText = safeText
            .split("")
            .map((char) => {
              if (char === " ") return " ";
              return String.fromCharCode(Math.floor(Math.random() * 93) + 33);
            })
            .join("");

          setDisplayText(glitchText);
          currentFrame++;
        } else {
          setDisplayText(safeText);
          clearInterval(glitchTimerId);
        }
      }, glitchDuration / frames);
    };

    const glitchIntervalId = setInterval(runGlitch, 3000);

    return () => {
      clearInterval(glitchIntervalId);
      if (glitchTimerId) {
        clearInterval(glitchTimerId);
      }
    };
  }, [safeText, glitchDuration]);

  return displayText;
};
