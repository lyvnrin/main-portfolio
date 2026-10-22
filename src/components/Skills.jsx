import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';
import { injectStyles } from '../utils/injectStyles.js';

const styles = `
  .skills-section {
    padding: 4rem 0;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem 2rem;
  }

  .skill-category {}

  .skill-cat-header {
    display: flex;
    align-items: center;
    gap: 0.6em;
    margin-bottom: 1.25rem;
  }

  .skill-cat-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .skill-cat-dot.rose { background: var(--rose); }
  .skill-cat-dot.slate { background: var(--slate); }

  .skill-cat-label {
    font-family: var(--font-sc);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: var(--ink);
    flex-shrink: 0;
  }

  .skill-cat-rule {
    flex: 1;
    height: 1px;
    background: var(--rule);
  }

  .skill-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .skill-pill {
    display: inline-block;
    padding: 0.25rem 0.65rem;
    border: 1px solid var(--rule);
    font-family: var(--font-serif);
    font-size: 0.92rem;
    line-height: 1.4;
    color: var(--ink);
    transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease, transform 0.2s ease;
  }

  .skill-pill.rose {
    border-color: rgba(2,12,114,0.4);
    color: var(--rose-deep);
  }

  .skill-pill.slate {
    border-color: rgba(138,138,138,0.4);
    color: var(--slate-deep);
  }

  .skill-pill.rose:hover {
    border-color: var(--rose);
    background: var(--rose);
    color: var(--bg);
    transform: translateY(-2px);
  }

  .skill-pill.slate:hover {
    border-color: var(--slate);
    background: var(--slate);
    color: var(--bg);
    transform: translateY(-2px);
  }
`;

injectStyles('skills-styles', styles);

const categories = [
  { label: 'BACKEND & AI', dot: 'rose', skills: ['FastAPI', 'Flask', 'Anthropic API'] },
  { label: 'DATA', dot: 'slate', skills: ['NumPy', 'Scikit-learn', 'Matplotlib', 'PostgreSQL', 'SQLite'] },
  { label: 'DESIGN', dot: 'rose', skills: ['Figma', 'Lovable'] },
  { label: 'LANGUAGES', dot: 'slate', skills: ['Python', 'Java', 'JavaScript', 'SQL'] },
  { label: 'TOOLS', dot: 'rose', skills: ['Git', 'MS Office'] },
  { label: 'WEB', dot: 'slate', skills: ['React', 'Node.js', 'Express', 'HTML', 'CSS'] },
];

export default function Skills() {
  useRevealElements();

  return (
    <section id="skills" className="skills-section">
      <div className="section-wrap">
        <SectionHeader number="II" title="On the toolkit" />
        <div className="skills-grid">
          {categories.map((cat, ci) => (
            <div key={cat.label} className={`skill-category reveal reveal-delay-${ci + 1}`}>
              <div className="skill-cat-header">
                <div className={`skill-cat-dot ${cat.dot}`} />
                <span className="skill-cat-label">{cat.label}</span>
                <div className="skill-cat-rule" />
              </div>
              <div className="skill-pills">
                {cat.skills.map((skill) => (
                  <span key={skill} className={`skill-pill ${cat.dot}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}