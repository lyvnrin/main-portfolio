import { injectStyles } from '../utils/injectStyles.js';

const styles = `
  .section-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .section-header-label {
    font-family: var(--font-sc);
    font-size: 1.4rem;
    letter-spacing: 0.14em;
    color: var(--ink);
    font-weight: bolder;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

injectStyles('section-header-styles', styles);

export default function SectionHeader({ number, title }) {
  return (
    <div className="section-header reveal">
      <span className="section-header-label">§ {number} — {title}</span>
    </div>
  );
}