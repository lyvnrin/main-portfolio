import { useEffect } from 'react';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .substack-banner {
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    padding: 1.1rem 0;
    background: #F0EAE1;
  }

  .substack-inner {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
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
    font-size: 0.95rem;
    color: var(--ink);
    line-height: 1.5;
    white-space: nowrap;
  }

  .substack-text em {
    font-style: normal;
    color: var(--rose);
  }

  .substack-link {
    position: relative;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--rose-deep);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }

  .substack-link::after {
    content: '';
    position: absolute;
    left: 0;
    right: 1.1em;
    bottom: -0.15em;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease-out-expo);
  }

  .substack-link:hover::after {
    transform: scaleX(1);
  }

  .substack-link-arrow {
    display: inline-block;
    transition: transform 0.4s var(--ease-out-expo);
  }

  .substack-link:hover .substack-link-arrow {
    transform: translateX(4px);
  }

  [data-theme="dark"] .substack-banner {
    background: #1E1812;
  }

  @media (max-width: 768px) {
    .substack-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.6rem;
    }
    .substack-text {
      white-space: normal;
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
          <span className="substack-ref-label">see also</span>
          <span className="substack-rule-short" />
          <p className="substack-text">
            Essays on tech &amp; culture at <em>The SWE Scriptures</em> - currently reading:
          </p>
          <a
            href="https://theswescriptures.substack.com/p/the-allegory-of-frankenstein-in-ethical"
            target="_blank"
            rel="noopener noreferrer"
            className="substack-link"
            data-cursor="read →"
          >
            "the allegory of frankenstein in ethical ai"
            <span className="substack-link-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
