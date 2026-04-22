const styles = `
  .section-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .section-header-label {
    font-family: var(--font-sc);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .section-header-rule {
    flex: 1;
    height: 1px;
    background: var(--rule);
  }
`;

let injected = false;

function injectStyles() {
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.textContent = styles;
  document.head.appendChild(el);
}

export default function SectionHeader({ number, title }) {
  injectStyles();
  return (
    <div className="section-header reveal">
      <span className="section-header-label">§ {number} — {title}</span>
      <div className="section-header-rule" />
    </div>
  );
}