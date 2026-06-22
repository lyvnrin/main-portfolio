import { useEffect, useRef } from 'react';

const styles = `
  .marquee-horizontal {
    width: 100%;
    height: 36px;
    overflow: hidden;
    background: var(--rose-deep);
    border-bottom: 1px solid rgba(184,98,74,0.2);
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  [data-theme="dark"] .marquee-horizontal {
    background: var(--rose-deep);
    border-bottom-color: rgba(201,122,98,0.15);
  }

  .marquee-horizontal-track {
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: marqueeHorizontal 70s linear infinite;
    will-change: transform;
  }

  @keyframes marqueeHorizontal {
    from { transform: translateX(0); }
    to   { transform: translateX(calc(-1 * var(--marquee-width, 50%))); }
  }

  .marquee-horizontal-item {
    font-family: var(--font-sc);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: var(--rose-soft);
    opacity: 0.9;
    padding: 0 0.9rem;
  }

  .marquee-horizontal-dot {
    color: var(--rose);
    font-size: 0.6rem;
    opacity: 0.6;
  }
`;

const items = [
  'available for summer 2026',
  'cs @ royal holloway',
  'the swe scriptures',
  'lyvnrin on github',
  'building things that matter',
  'london, england',
];

function MarqueeContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <span className="marquee-horizontal-item">{item}</span>
          <span className="marquee-horizontal-dot">·</span>
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
    const totalWidth = track.scrollWidth;
    const half = totalWidth / 2;
    track.style.setProperty('--marquee-width', half + 'px');
  }, []);

  return (
    <div className="marquee-horizontal" aria-hidden="true">
      <div className="marquee-horizontal-track" ref={trackRef}>
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
