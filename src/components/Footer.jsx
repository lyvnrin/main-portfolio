import { useEffect } from 'react';

const styles = `
  .footer {
    border-top: 1px solid var(--rule);
    padding: 2rem 3rem;
    text-align: center;
  }

  .footer-text {
    font-family: var(--font-sc);
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    color: var(--muted);
  }

  .footer-sub {
    font-family: var(--font-sc);
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    color: var(--muted);
    margin-top: 0.4rem;
    opacity: 0.7;
  }
   
  .footer-link {
    color: var(--muted);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .footer-link:hover {
    color: var(--rose-deep);
    font-weight: bolder;
    border-bottom-color: var(--rose);
  }

  @media (max-width: 768px) {
    .footer { padding: 2rem 1.5rem; }
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
      <p className="footer-text">
        © Lavanya Kamble 2026 · made with intention
      </p>
      <p className="footer-sub">
        designed in <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="footer-link">Figma</a> · built with <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="footer-link">React</a> &amp; <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="footer-link">Vite</a> · coded in <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="footer-link">VS Code</a> · versioned with <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="footer-link">Git</a> · deployed on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="footer-link">Vercel</a>
      </p>
      <p className="footer-sub">
        set in <a href="https://fonts.google.com/specimen/Cormorant+Garamond" target="_blank" rel="noopener noreferrer" className="footer-link">Cormorant Garamond</a>
      </p>
    </footer>
  );
}