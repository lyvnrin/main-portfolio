import { useEffect } from 'react';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .areas-banner {
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    padding: 2.25rem 0;
    background: #F0EAE1;
  }

  [data-theme="dark"] .areas-banner {
    background: #1E1812;
  }

  .areas-inner {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    flex-wrap: wrap;
  }

  .areas-label {
    font-family: var(--font-sc);
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    color: var(--muted);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .areas-rule {
    width: 2rem;
    height: 1px;
    background: var(--rule);
    flex-shrink: 0;
  }

  .areas-blocks {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    flex: 1;
  }

  .area-block {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.45rem 1.1rem;
    border: 1px solid var(--rule);
    font-family: var(--font-serif);
    font-size: 0.95rem;
    color: var(--ink);
    transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
    white-space: nowrap;
  }

  .area-block:hover {
    border-color: var(--rose);
    color: var(--rose);
    background: rgba(184,98,74,0.04);
  }

  .area-block-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .area-block-dot.rose  { background: var(--rose); }
  .area-block-dot.slate { background: var(--slate); }
  .area-block-dot.muted { background: var(--muted); }

  .areas-sep {
    font-family: var(--font-serif);
    color: var(--rule);
    font-size: 1rem;
    flex-shrink: 0;
    user-select: none;
  }

  @media (max-width: 768px) {
    .areas-inner { gap: 1.25rem; }
    .areas-rule  { display: none; }
  }
`;

const areas = [
  { label: 'Data Science',      dot: 'rose'  },
  { label: 'Research',          dot: 'slate' },
  { label: 'Web Development',   dot: 'rose'  },
  { label: 'Financial Systems', dot: 'muted' },
  { label: 'Systems Thinking',  dot: 'slate' },
];

export default function AreasBanner() {
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <div className="areas-banner">
      <div className="section-wrap">
        <div className="areas-inner reveal">
          <span className="areas-label">areas of interest</span>
          <span className="areas-rule" />
          <div className="areas-blocks">
            {areas.map((area, i) => (
              <span key={area.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {i > 0 && <span className="areas-sep">·</span>}
                <span className="area-block">
                  <span className={`area-block-dot ${area.dot}`} />
                  {area.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}