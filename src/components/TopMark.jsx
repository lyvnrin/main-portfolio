import { useEffect, useState } from 'react';

const styles = `
  .top-mark {
    position: fixed;
    top: 1.5rem;
    right: 2rem;
    z-index: 9000;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--rule);
    background: rgba(250,247,242,0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-sc);
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    color: var(--ink);
    transition: opacity 0.4s ease, transform 0.4s var(--ease-out-expo), border-color 0.3s ease, color 0.3s ease;
    opacity: 0;
    transform: scale(0.85);
  }

  .top-mark.visible {
    opacity: 1;
    transform: scale(1);
  }

  .top-mark:hover {
    border-color: var(--rose);
    color: var(--rose);
  }
`;

export default function TopMark() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      styleEl.remove();
    };
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`top-mark${visible ? ' visible' : ''}`}
      onClick={scrollTop}
      aria-label="Back to top"
      data-cursor="top ↑"
    >
      LK
    </button>
  );
}