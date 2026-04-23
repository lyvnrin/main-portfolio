import { useEffect, useRef } from 'react';

const styles = `
  .marquee-vertical {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 22px;
    z-index: 6000;
    overflow: hidden;
    background: var(--rose-deep);
    border-right: 1px solid rgba(184,98,74,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  [data-theme="dark"] .marquee-vertical {
    background: var(--rose-deep);
    border-right-color: rgba(201,122,98,0.15);
  }

  .marquee-vertical-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
    animation: marqueeVertical 32s linear infinite;
    will-change: transform;
  }

  @keyframes marqueeVertical {
    from { transform: translateY(0); }
    to   { transform: translateY(calc(-1 * var(--marquee-height, 50%))); }
  }

  .marquee-vertical-item {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    color: var(--rose-soft);
    opacity: 0.85;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    padding: 0.6rem 0;
  }

  .marquee-vertical-dot {
    color: var(--rose);
    font-size: 0.4rem;
    opacity: 0.6;
    writing-mode: vertical-rl;
    padding: 0.2rem 0;
  }

  @media (max-width: 1100px) {
    .marquee-vertical { display: none; }
  }
`;

const items = [
  'available for summer 2026',
  'cs @ royal holloway',
  'rose rendered',
  'lyvnrin on github',
  'building things that matter',
  'london, england',
];

function MarqueeContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="marquee-vertical-item">{item}</span>
          <span className="marquee-vertical-dot">·</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalHeight = track.scrollHeight;
    const half = totalHeight / 2;
    track.style.setProperty('--marquee-height', half + 'px');
  }, []);

  return (
    <div className="marquee-vertical" aria-hidden="true">
      <div className="marquee-vertical-track" ref={trackRef}>
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}