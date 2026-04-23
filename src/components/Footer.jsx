// src/components/Footer.jsx
import { useEffect } from 'react';

const styles = `
  .footer {
    border-top: 1px solid var(--rule);
    padding: 3.5rem 0 2.5rem;
  }

  .footer-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
    margin-bottom: 3rem;
  }

  .colophon-label {
    font-family: var(--font-sc);
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    color: var(--muted);
    display: block;
    margin-bottom: 1rem;
  }

  .colophon-text {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.8;
    max-width: 480px;
  }

  .colophon-text a {
    color: var(--muted);
    border-bottom: 1px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .colophon-text a:hover {
    color: var(--rose);
    border-bottom-color: var(--rose);
  }

  .footer-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .footer-meta-item {
    font-family: var(--font-sc);
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    color: var(--muted);
    opacity: 0.7;
  }

  .footer-bottom {
    border-top: 1px solid var(--rule);
    padding-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-copy {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    color: var(--muted);
  }

  .footer-ornament {
    font-family: var(--font-serif);
    font-size: 0.9rem;
    color: var(--rose);
    opacity: 0.5;
    letter-spacing: 0.3em;
  }

  .footer-link {
    color: var(--muted);
    border-bottom: 1px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .footer-link:hover {
    color: var(--rose);
    border-bottom-color: var(--rose);
  }

  .footer-sub {
    font-family: var(--font-sc);
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    color: var(--muted);
    margin-top: 0.4rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .footer-inner {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .footer-meta {
      align-items: flex-start;
    }
    .footer { padding: 3rem 1.5rem 2rem; }
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
        <div className="footer-inner">

          <div>
            <span className="colophon-label">Colophon</span>
            <p className="colophon-text">
              This site was designed in{' '}
              <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="footer-link">Figma</a>,
              built with{' '}
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="footer-link">React</a>{' '}
              &amp;{' '}
              <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="footer-link">Vite</a>,
              written in{' '}
              <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="footer-link">VS Code</a>,
              versioned with{' '}
              <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="footer-link">Git</a>,
              and deployed on{' '}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="footer-link">Vercel</a>.
              Set in{' '}
              <a href="https://fonts.google.com/specimen/Cormorant+Garamond" target="_blank" rel="noopener noreferrer" className="footer-link">Cormorant Garamond.</a>{' '}
            </p>
          </div>

          <div className="footer-meta">
            <span className="footer-meta-item">Vol. I · Issue 01</span>
            <span className="footer-meta-item">Spring 2026</span>
            <span className="footer-meta-item">London, England</span>
            <span className="footer-meta-item">All rights reserved</span>
          </div>

        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© Lavanya Kamble 2026</span>
          <span className="footer-ornament">· · ·</span>
          <span className="footer-copy">made with intention</span>
        </div>
      </div>
    </footer>
  );
}