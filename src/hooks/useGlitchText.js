import { useState, useEffect } from "react";

export const useGlitchText = (text, glitchDuration = 300) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      let currentFrame = 0;
      const frames = 5;

      const glitchTimer = setInterval(() => {
        if (currentFrame < frames) {
          // Convert text to random ASCII codes
          const glitchText = text
            .split("")
            .map((char) => {
              if (char === " ") return " ";
              return String.fromCharCode(Math.floor(Math.random() * 93) + 33);
            })
            .join("");

          setDisplayText(glitchText);
          currentFrame++;
        } else {
          // Return to normal text
          setDisplayText(text);
          setIsGlitching(false);
          clearInterval(glitchTimer);
        }
      }, glitchDuration / frames);
    }, 3000); // Glitch every 3 seconds

    return () => clearInterval(glitchInterval);
  }, [text, glitchDuration]);

  return displayText;
};
