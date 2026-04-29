import { useEffect } from 'react';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .substack-banner {
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    padding: 3rem 0;
    background: #F0EAE1;
  }

  .substack-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .substack-left {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
    flex-wrap: wrap;
    flex: 1;
  }

  .substack-ref-label {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.15em;
    color: var(--ink);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .substack-rule-short {
    width: 2rem;
    height: 1px;
    background: var(--rule);
    align-self: center;
    flex-shrink: 0;
  }

  .substack-text {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: clamp(1rem, 2vw, 1.3rem);
    color: var(--ink);
    line-height: 1.5;
    max-width: 460px;
  }

  .substack-text em {
    font-style: normal;
    color: var(--rose);
  }

  .substack-card {
    border: 1px solid var(--rule);
    padding: 1.25rem 1.5rem;
    min-width: 220px;
    max-width: 260px;
    flex-shrink: 0;
    text-decoration: none;
    color: inherit;
    display: block;
    position: relative;
    transition: background 0.3s ease;
    background: transparent;
  }

  .substack-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--rose);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.55s var(--ease-out-expo);
  }

  .substack-card:hover::before {
    transform: scaleX(1);
  }

  .substack-card:hover {
    background: rgba(184,98,74,0.04);
  }

  .substack-card-label {
    font-family: var(--font-sc);
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    display: block;
    margin-bottom: 0.6rem;
  }

  .substack-card-title {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1rem;
    color: var(--ink);
    line-height: 1.35;
    display: block;
    margin-bottom: 0.5rem;
  }

  .substack-card-desc {
    font-family: var(--font-serif);
    font-size: 0.78rem;
    color: var(--muted);
    line-height: 1.5;
    display: block;
    margin-bottom: 1rem;
  }

  .substack-card-cta {
    font-family: var(--font-sc);
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    color: var(--muted);
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.4em;
  }

  .substack-card:hover .substack-card-cta {
    color: var(--rose);
  }

  .substack-card-arrow {
    display: inline-block;
    transition: transform 0.4s var(--ease-out-expo);
  }

  .substack-card:hover .substack-card-arrow {
    transform: translateX(4px);
  }

  [data-theme="dark"] .substack-banner {
    background: #1E1812;
  }

  [data-theme="dark"] .substack-card:hover {
    background: rgba(201,122,98,0.06);
  }

  @media (max-width: 768px) {
    .substack-inner {
      flex-direction: column;
      gap: 2rem;
    }
    .substack-card {
      max-width: 100%;
      min-width: unset;
      width: 100%;
    }
  }
`;

export default function SubstackBanner() {
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <div className="substack-banner">
      <div className="section-wrap">
        <div className="substack-inner reveal">

          <div className="substack-left">
            <span className="substack-ref-label">see also</span>
            <span className="substack-rule-short" />
            <p className="substack-text">
              I also write on technology, culture, and what happens
              when you think about them together. Find on <em>Substack</em> essays at The SWE Scriptures!
            </p>
          </div>

          <a
            href="https://theswescriptures.substack.com/p/the-vampirism-of-chrome"
            target="_blank"
            rel="noopener noreferrer"
            className="substack-card"
            data-cursor="read →"
          >
            <span className="substack-card-label">recommended reading</span>
            <span className="substack-card-title">"the vampirism of chrome"</span>
            <span className="substack-card-desc">
              you invited chrome in, now look at your task manager..
            </span>
            <span className="substack-card-cta">
              read the entry <span className="substack-card-arrow">→</span>
            </span>
          </a>

        </div>
      </div>
    </div>
  );
}
