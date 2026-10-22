const styles = `
  .section-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .section-header-label {
    font-family: var(--font-sc);
    font-size: 1.1rem;
    letter-spacing: 0.14em;
    color: var(--ink);
    font-weight: bolder;
    white-space: nowrap;
    flex-shrink: 0;
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
    </div>
  );
}