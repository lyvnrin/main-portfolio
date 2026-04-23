import { useEffect, useState } from 'react';

const styles = `
  #hero {
    position: relative;
    overflow: hidden;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 3rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .hero-wrapper {
    width: 100%;
    padding-top: 10vh;
  }

  .hero-entry-label {
    font-family: var(--font-sc);
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    color: var(--muted);
    margin-bottom: 0.75rem;
    display: block;
  }

  .hero-name-row {
    display: flex;
    align-items: baseline;
    gap: 0.5em;
    flex-wrap: wrap;
    margin-bottom: 0.25rem;
  }

  .hero-name {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: clamp(4.5rem, 10vw, 9rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
    color: var(--ink);
  }

  .hero-pos {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(1.5rem, 3.5vw, 3rem);
    color: var(--muted);
    line-height: 1;
    padding-bottom: 0.2em;
  }

  .hero-pronunciation {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: clamp(1rem, 2vw, 1.4rem);
    color: var(--muted);
    margin-bottom: 0.75rem;
    letter-spacing: 0.01em;
  }

  .hero-pronoun-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 2rem;
  }

  .hero-pronoun-badge {
    border: 0.5px solid var(--rule);
    padding: 2px 10px;
    border-radius: 2rem;
    font-family: var(--font-sans);
    font-size: 0.68rem;
    color: var(--muted);
    letter-spacing: 0.04em;
  }

  .hero-rule {
    width: 3rem;
    height: 1px;
    background: var(--rule);
    margin-bottom: 2rem;
  }

  .hero-definition {
    display: flex;
    align-items: baseline;
    gap: 0.75em;
    max-width: 680px;
  }

  .hero-def-num {
    font-family: var(--font-sc);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    color: var(--rose);
    flex-shrink: 0;
    padding-top: 0.1em;
  }

  .hero-def-text {
    font-family: var(--font-serif);
    font-size: clamp(1.1rem, 2.2vw, 1.45rem);
    color: var(--ink);
    line-height: 1.5;
  }

  .hero-synonym {
    font-style: italic;
    color: var(--rose);
    display: inline-block;
    transition: opacity 0.45s ease;
  }

  .hero-synonym.fade-out {
    opacity: 0;
  }

  .hero-synonym.fade-in {
    opacity: 1;
  }

  .hero-scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    left: 3rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: var(--muted);
  }

  .hero-scroll-hint-line {
    width: 2rem;
    height: 1px;
    background: var(--muted);
  }

  .hero-corner-text {
    position: absolute;
    bottom: 2.5rem;
    right: 3rem;
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    color: var(--muted);
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 0 1.5rem;
    }
    .hero-scroll-hint {
      left: 1.5rem;
    }
    .hero-corner-text {
      right: 1.5rem;
    }
  }
`;

const synonyms = [
  'penultimate year cs student',
  'full-stack developer',
  'aspiring data analyst',
  'fintech curious',
  'systems thinker',
  'builder of things that matter',
];

export default function Hero() {
  const [synIdx, setSynIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSynIdx((i) => (i + 1) % synonyms.length);
        setFading(false);
      }, 450);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const synonymClass = 'hero-synonym ' + (fading ? 'fade-out' : 'fade-in');

  return (
    <header id="hero">
      <div className="hero">
        <div className="hero-wrapper">
          <span className="hero-entry-label">entry · i</span>
          <div className="hero-name-row">
            <h1 className="hero-name">Lavanya Kamble</h1>
            <span className="hero-pos">n.</span>
          </div>
          <p className="hero-pronunciation">/ lə · vʌn · jə · kɑm · bleɪ /</p>
          <div className="hero-pronoun-row">
            <span className="hero-pronoun-badge">she / her</span>
          </div>
          <div className="hero-rule" />
          <div className="hero-definition">
            <span className="hero-def-num">1.</span>
            <p className="hero-def-text">
              <span className={synonymClass}>{synonyms[synIdx]}</span>;
              documented at the intersection of systems and data. Known to
              deliver under pressure. Chiefly collaborative.
            </p>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span className="hero-scroll-hint-line" />
          scroll to read
        </div>

        <div className="hero-corner-text">London, England · Vol. I</div>
      </div>
    </header>
  );
}