// src/components/Footer.jsx
import { useEffect } from 'react';

const styles = `
  .footer {
    border-top: 1px solid var(--rule);
    background: #ECE2D0;
  }

  [data-theme="dark"] .footer {
    background: #1C160E;
  }

  .footer-row {
    display: flex;
    align-items: center;
    padding: 1.5rem 0;
  }

  .footer-item {
    flex: 1;
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    color: var(--muted);
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
      gap: 0.6rem;
      padding: 1.5rem 1.5rem;
    }
    .footer-item.left,
    .footer-item.center,
    .footer-item.right {
      text-align: center;
    }
  }
`;

export default function Footer() {
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

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
