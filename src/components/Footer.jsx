// src/components/Footer.jsx
import { injectStyles } from '../utils/injectStyles.js';

const styles = `
  .footer {
    border-top: 1px solid var(--rule);
    background: #E1E5EE;
  }

  [data-theme="dark"] .footer {
    background: #171A25;
  }

  .footer-row {
    display: flex;
    align-items: center;
    padding: 1rem 0;
  }

  .footer-item {
    flex: 1;
    font-family: var(--font-sc);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--ink);
    white-space: nowrap;
  }

  .footer-item.left {
    text-align: left;
  }

  .footer-item.center {
    text-align: center;
  }

  .footer-item.right {
    text-align: right;
  }

  @media (max-width: 640px) {
    .footer-row {
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
    }
    .footer-item.left,
    .footer-item.center,
    .footer-item.right {
      text-align: center;
    }
  }
`;

injectStyles('footer-styles', styles);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-wrap">
        <div className="footer-row">
          <span className="footer-item left">Claude Code · Vercel</span>
          <span className="footer-item center">Lavanya Kamble 2026</span>
          <span className="footer-item right">Vol. 1 · Issue 4</span>
        </div>
      </div>
    </footer>
  );
}
