import { useEffect } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .skills-section {
    padding: 7rem 0;
    border-top: 1px solid var(--rule);
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
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    color: var(--muted);
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
    gap: 0.5rem 0.4rem;
    align-items: flex-start;
  }

  .skill-pill {
    display: inline-block;
    padding: 0.3em 0.75em;
    border-radius: 6px;
    font-family: var(--font-serif);
    font-size: 0.92rem;
    line-height: 1.4;
    transition: transform 0.2s ease;
  }

  .skill-pill.rose {
    border: 1px solid rgba(184,98,74,0.45);
    background: rgba(184,98,74,0.08);
    color: var(--rose-deep);
  }

  .skill-pill.slate {
    border: 1px solid rgba(90,107,130,0.4);
    background: rgba(90,107,130,0.08);
    color: var(--slate-deep);
  }

  .skill-pill:hover {
    transform: translateY(-2px) !important;
  }
`;

const categories = [
  {
    label: 'DATA',
    dot: 'rose',
    skills: ['NumPy', 'PostgreSQL', 'MS Excel'],
    rotations: [-1.5, 1.2, -0.8],
    types: ['rose', 'slate', 'rose'],
    mtops: [0, 4, 2],
    mlefts: [0, 3, 6],
  },
  {
    label: 'DEPLOYMENT',
    dot: 'slate',
    skills: ['FastAPI', 'Flask', 'Vercel'],
    rotations: [0.9, -1.8, 1.5],
    types: ['slate', 'rose', 'slate'],
    mtops: [3, 0, 5],
    mlefts: [0, 4, 2],
  },
  {
    label: 'DESIGN',
    dot: 'rose',
    skills: ['Figma', 'Lovable', 'HTML/CSS'],
    rotations: [-2, 0.6, 1.8],
    types: ['rose', 'slate', 'rose'],
    mtops: [0, 6, 2],
    mlefts: [2, 0, 5],
  },
  {
    label: 'SCRIPTING',
    dot: 'slate',
    skills: ['Python', 'JavaScript', 'Java'],
    rotations: [1.2, -1, 0.5],
    types: ['slate', 'rose', 'slate'],
    mtops: [4, 0, 3],
    mlefts: [0, 3, 0],
  },
  {
    label: 'TOOLS',
    dot: 'rose',
    skills: ['Git', 'Linux/WSL', 'React'],
    rotations: [-1.8, 1.5, -0.7],
    types: ['rose', 'slate', 'rose'],
    mtops: [2, 0, 4],
    mlefts: [0, 5, 2],
  },
];

export default function Skills() {
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

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
                {cat.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className={`skill-pill ${cat.types[si]}`}
                    style={{
                      transform: `rotate(${cat.rotations[si]}deg)`,
                      marginTop: `${cat.mtops[si]}px`,
                      marginLeft: `${cat.mlefts[si]}px`,
                    }}
                  >
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