import { useEffect } from 'react';

const styles = `
  .marquee-section {
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    overflow: hidden;
    padding: 1.1rem 0;
    position: relative;
  }

  .marquee-track {
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: marqueeScroll 28s linear infinite;
  }

  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .marquee-track:hover {
    animation-play-state: paused;
  }

  .marquee-inner {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .marquee-item {
    font-family: var(--font-sc);
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    color: var(--muted);
    white-space: nowrap;
  }

  .marquee-dot {
    margin: 0 1.5rem;
    color: var(--rose);
    font-size: 0.6rem;
  }
`;

const items = [
  'available for summer 2026',
  'cs @ royal holloway',
  'rose rendered',
  'lyvnrin on github',
  'building things that matter',
];

function MarqueeContent() {
  return (
    <div className="marquee-inner">
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <span className="marquee-item">{item}</span>
          <span className="marquee-dot">·</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}