import { useEffect, useState } from 'react';

const styles = `
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: var(--rose);
    z-index: 99998;
    transform-origin: left;
    transition: width 0.1s linear;
    pointer-events: none;
  }
`;

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(pct);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      el.remove();
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
}