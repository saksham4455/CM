import React from 'react';
import { useGlitchText } from '../hooks/useGlitchText';

/* ── single glitch name item ── */
const GlitchItem = ({ name, code, icon }) => {
  const glitchName = useGlitchText(name, 300);
  return (
    <span className="ec-marquee-item">
      <span className="ec-marquee-code">{code}</span>
      <span className="ec-marquee-icon">{icon}</span>
      <span className="ec-marquee-name">{glitchName}</span>
      <span className="ec-marquee-sep">✦</span>
    </span>
  );
};

/* ── marquee carousel ── */
const EventCarousel = ({ events }) => {
  /* duplicate for seamless infinite loop */
  const items = [...events, ...events];

  return (
    <div className="ec-marquee-wrapper">
      {/* top fade edges */}
      <div className="ec-marquee-fade ec-marquee-fade--left" />
      <div className="ec-marquee-fade ec-marquee-fade--right" />

      <div className="ec-marquee-track">
        {items.map((event, i) => (
          <GlitchItem key={i} name={event.name} code={event.code} icon={event.icon} />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
