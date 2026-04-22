import { useEffect, useRef } from 'react';

const styles = `
  .cursor-blob {
    position: fixed;
    top: 0;
    left: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--rose);
    mix-blend-mode: multiply;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: width 0.25s var(--ease-out-expo), height 0.25s var(--ease-out-expo), background 0.25s ease, opacity 0.3s ease;
    will-change: transform;
  }

  .cursor-blob.has-label {
    width: 80px;
    height: 80px;
    background: var(--rose-soft);
  }

  .cursor-label {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 100000;
    transform: translate(-50%, -50%);
    font-family: var(--font-sc);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--rose-deep);
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 0.2s ease;
    white-space: nowrap;
  }

  .cursor-label.visible {
    opacity: 1;
  }
`;

export default function Cursor() {
  const blobRef = useRef(null);
  const labelRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef(null);
  const labelTextRef = useRef('');

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      const el = e.target.closest('[data-cursor]');
      const label = el ? el.getAttribute('data-cursor') : '';
      labelTextRef.current = label;

      if (labelRef.current) {
        if (label) {
          labelRef.current.textContent = label;
          labelRef.current.classList.add('visible');
          blobRef.current?.classList.add('has-label');
        } else {
          labelRef.current.classList.remove('visible');
          blobRef.current?.classList.remove('has-label');
        }
      }
    };

    const tick = () => {
      const lerp = 0.12;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      const { x, y } = posRef.current;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      styleEl.remove();
    };
  }, []);

  return (
    <>
      <div ref={blobRef} className="cursor-blob" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}