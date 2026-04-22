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
      <p className="footer-text">© Lavanya Kamble 2025 — made with intention</p>
    </footer>
  );
}