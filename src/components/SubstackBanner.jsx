import { useRevealElements } from '../hooks/useReveal.js';
import { injectStyles } from '../utils/injectStyles.js';

const styles = `
  .substack-banner {
    padding: 1rem 0;
  }

  .substack-inner {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    border: 1px solid var(--rule);
    padding: 1.1rem 1.75rem;
    background: #E9ECF2;
  }

  .substack-ref-label {
    font-family: var(--font-sc);
    font-size: 0.75rem;
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
    font-size: 1.1rem;
    color: var(--ink);
    line-height: 1.5;
    white-space: nowrap;
  }

  .substack-link {
    position: relative;
    font-family: var(--font-serif);
    font-size: 1.1rem;
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

  [data-theme="dark"] .substack-inner {
    background: #1A1D2A;
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

injectStyles('substack-banner-styles', styles);

export default function SubstackBanner() {
  useRevealElements();

  return (
    <div className="substack-banner">
      <div className="section-wrap">
        <div className="substack-inner reveal">
          <span className="substack-ref-label">see also</span>
          <span className="substack-rule-short" />
          <p className="substack-text">essays on tech &amp; culture at</p>
          <a
            href="https://theswescriptures.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="substack-link"
          >
            The SWE Scriptures
            <span className="substack-link-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
