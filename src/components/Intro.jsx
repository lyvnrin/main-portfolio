import { useEffect, useState } from 'react';

const styles = `
  @keyframes folder-enter {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes hint-enter {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .intro-overlay {
    position: fixed;
    inset: 0;
    z-index: 9000;
    /* warm dark walnut desk base */
    background-color: #2B1608;
    background-image:
      /* vignette — edges fall into shadow */
      radial-gradient(ellipse 110% 90% at 50% 50%, transparent 28%, rgba(0,0,0,0.58) 100%),
      /* desk-lamp ambient glow pooling under the folder */
      radial-gradient(ellipse 52% 42% at 50% 46%, rgba(255,155,55,0.09) 0%, transparent 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.25rem;
    transition: opacity 0.65s ease;
    overflow: hidden;
  }

  /* wood-grain SVG turbulence overlay */
  .intro-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.22;
    mix-blend-mode: soft-light;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.016,0.004' numOctaves='3' seed='9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='600' height='600' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
    background-size: 500px 500px;
  }

  .intro-overlay.fading {
    opacity: 0;
    pointer-events: none;
  }

  .folder-scene {
    perspective: 1400px;
    position: relative;
    z-index: 1;
    width: 300px;
    height: 390px;
    animation: folder-enter 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
    cursor: none;
  }

  .folder-tab {
    position: absolute;
    top: -20px;
    left: 30px;
    width: 70px;
    height: 20px;
    background: #A87C3A;
    border-radius: 3px 3px 0 0;
    z-index: 3;
  }

  .folder-paper {
    position: absolute;
    border-radius: 1px;
    z-index: 0;
  }

  .folder-paper-1 {
    width: 91%;
    left: 4.5%;
    top: -10px;
    height: 100%;
    background: #EAE2D0;
    transform: rotate(-1.4deg);
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  }

  .folder-paper-2 {
    width: 89%;
    left: 5.5%;
    top: -6px;
    height: 100%;
    background: #EDE5D5;
    transform: rotate(0.9deg);
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  .folder-body {
    position: absolute;
    inset: 0;
    background: #B87E38;
    border-radius: 2px;
    z-index: 1;
  }

  .folder-cover {
    position: absolute;
    inset: 0;
    background: linear-gradient(158deg, #D4A85A 0%, #C49245 100%);
    border-radius: 2px;
    transform-origin: left center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: transform 0.85s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease;
    box-shadow: 3px 8px 32px rgba(0,0,0,0.55),
                inset 0 0 0 1px rgba(0,0,0,0.1);
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 1.6rem 1.5rem;
    overflow: hidden;
  }

  /* Ruled lines texture */
  .folder-cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      180deg,
      transparent 0px,
      transparent 22px,
      rgba(0,0,0,0.045) 22px,
      rgba(0,0,0,0.045) 23px
    );
    pointer-events: none;
  }

  /* Margin rule */
  .folder-cover::after {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(180,80,60,0.18);
  }

  .folder-scene.open .folder-cover {
    transform: rotateY(-175deg);
    box-shadow: none;
  }

  .folder-scene:not(.open):hover .folder-cover {
    transform: rotateY(-12deg);
    box-shadow: 6px 12px 48px rgba(0,0,0,0.65),
                inset 0 0 0 1px rgba(0,0,0,0.1);
  }

  /* ── Cover content ── */
  .fc-label {
    font-family: 'Cormorant SC', Georgia, serif;
    font-size: 0.5rem;
    letter-spacing: 0.28em;
    color: rgba(18,8,0,0.45);
    margin-bottom: 0.55rem;
  }

  .fc-redact {
    height: 8px;
    background: rgba(12,6,0,0.68);
    width: 54%;
    border-radius: 1px;
    margin-bottom: 1.6rem;
  }

  .fc-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 300;
    font-size: 2rem;
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: #190E03;
    margin-bottom: 0.35rem;
  }

  .fc-pos {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 0.72rem;
    color: rgba(22,10,2,0.48);
    letter-spacing: 0.02em;
    margin-bottom: auto;
  }

  .fc-divider {
    height: 1px;
    background: rgba(16,8,0,0.15);
    margin: 0.6rem 0;
  }

  .fc-fields {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.1rem;
  }

  .fc-field {
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
  }

  .fc-field-label {
    font-family: 'Cormorant SC', Georgia, serif;
    font-size: 0.47rem;
    letter-spacing: 0.14em;
    color: rgba(18,8,0,0.38);
    width: 50px;
    flex-shrink: 0;
  }

  .fc-field-value {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.6rem;
    color: rgba(18,8,0,0.6);
    letter-spacing: 0.01em;
  }

  .fc-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .fc-ref {
    font-family: 'Cormorant SC', Georgia, serif;
    font-size: 0.44rem;
    letter-spacing: 0.1em;
    color: rgba(18,8,0,0.32);
    line-height: 1.9;
  }

  .fc-stamp {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1.5px solid rgba(120,22,16,0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-14deg);
    flex-shrink: 0;
  }

  .fc-stamp-text {
    font-family: 'Cormorant SC', Georgia, serif;
    font-size: 0.37rem;
    letter-spacing: 0.14em;
    color: rgba(120,22,16,0.55);
    text-align: center;
    line-height: 1.6;
  }

  /* ── Hint ── */
  .intro-hint {
    font-family: 'Cormorant SC', Georgia, serif;
    font-size: 0.52rem;
    letter-spacing: 0.3em;
    color: rgba(196,160,90,0.38);
    user-select: none;
    position: relative;
    z-index: 1;
    animation: hint-enter 1s 0.6s ease both;
  }

  @media (max-width: 480px) {
    .folder-scene {
      width: 260px;
      height: 340px;
    }
    .fc-name {
      font-size: 1.7rem;
    }
  }
`;

export default function Intro({ onComplete }) {
  const [opened, setOpened] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onComplete]);

  const handleClick = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        onComplete();
      }, 650);
    }, 900);
  };

  return (
    <div
      className={`intro-overlay${fading ? ' fading' : ''}`}
      onClick={handleClick}
    >
      <div className={`folder-scene${opened ? ' open' : ''}`}>
        <div className="folder-tab" />
        <div className="folder-paper folder-paper-1" />
        <div className="folder-paper folder-paper-2" />
        <div className="folder-body" />
        <div className="folder-cover">
          <span className="fc-label">portfolio dossier</span>
          <div className="fc-redact" />
          <h2 className="fc-name">Lavanya<br />Kamble</h2>
          <p className="fc-pos">n. · data analyst & ai</p>
          <div className="fc-divider" style={{ marginTop: '1.4rem' }} />
          <div className="fc-fields">
            <div className="fc-field">
              <span className="fc-field-label">subject</span>
              <span className="fc-field-value">Lavanya Kamble</span>
            </div>
            <div className="fc-field">
              <span className="fc-field-label">status</span>
              <span className="fc-field-value">summer intern · TCS, AI & ST</span>
            </div>
            <div className="fc-field">
              <span className="fc-field-label">filed</span>
              <span className="fc-field-value">2026</span>
            </div>
          </div>
          <div className="fc-divider" />
          <div className="fc-bottom">
            <div className="fc-ref">
              ref: lk-2026-001<br />
              cs · fintech · systems
            </div>
            <div className="fc-stamp">
              <span className="fc-stamp-text">open<br />dossier</span>
            </div>
          </div>
        </div>
      </div>
      <p className="intro-hint">click to open</p>
    </div>
  );
}
