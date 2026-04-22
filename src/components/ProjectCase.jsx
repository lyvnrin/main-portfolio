import { useEffect } from 'react';

const styles = `
  .case-backdrop {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: rgba(31,26,21,0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 4rem 1.5rem;
    overflow-y: auto;
    animation: backdropIn 0.35s ease forwards;
  }

  @keyframes backdropIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .case-card {
    background: var(--bg);
    border: 1px solid var(--rule);
    max-width: 960px;
    width: 100%;
    box-shadow: 0 40px 100px rgba(31,26,21,0.18), 0 8px 24px rgba(31,26,21,0.08);
    position: relative;
    animation: caseIn 0.45s var(--ease-out-expo) forwards;
    margin: auto;
  }

  @keyframes caseIn {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .case-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-family: var(--font-sc);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    color: var(--muted);
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--rule);
    transition: color 0.2s ease, border-color 0.2s ease;
    z-index: 2;
  }

  .case-close:hover {
    color: var(--rose);
    border-color: var(--rose);
  }

  .case-header {
    padding: 3.5rem 3.5rem 2.5rem;
    border-bottom: 1px solid var(--rule);
  }

  .case-entry-label {
    font-family: var(--font-sc);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    color: var(--muted);
    margin-bottom: 0.6rem;
    display: block;
  }

  .case-descriptor {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1rem;
    color: var(--muted);
    margin-bottom: 1rem;
    display: block;
  }

  .case-title-row {
    display: flex;
    align-items: baseline;
    gap: 0.4em;
    margin-bottom: 0.4rem;
  }

  .case-title {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--ink);
  }

  .case-title-pos {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: clamp(1rem, 2vw, 1.6rem);
    color: var(--muted);
    line-height: 1;
  }

  .case-pronunciation {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--muted);
    margin-bottom: 1.75rem;
    display: block;
  }

  .case-definition {
    display: flex;
    align-items: baseline;
    gap: 0.75em;
    margin-bottom: 0.75rem;
  }

  .case-def-num {
    font-family: var(--font-sc);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    color: var(--rose);
    flex-shrink: 0;
  }

  .case-def-text {
    font-family: var(--font-serif);
    font-size: 1.15rem;
    color: var(--ink);
    line-height: 1.55;
  }

  .case-etymology {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.9rem;
    color: var(--muted);
    padding-top: 0.5rem;
  }

  .case-meta {
    padding: 2rem 3.5rem;
    border-bottom: 1px solid var(--rule);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .case-meta-item dt {
    font-family: var(--font-sc);
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    margin-bottom: 0.35rem;
  }

  .case-meta-item dd {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    color: var(--ink);
    line-height: 1.4;
  }

  .case-body {
    padding: 2.5rem 3.5rem;
  }

  .case-body-row {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 2rem;
    margin-bottom: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(31,26,21,0.07);
  }

  .case-body-row:last-of-type {
    border-bottom: none;
  }

  .case-section-label {
    font-family: var(--font-sc);
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    padding-top: 0.35rem;
    line-height: 1.5;
  }

  .case-prose {
    font-family: var(--font-serif);
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--ink);
  }

  .case-pullquote {
    margin: 0 3.5rem 2.5rem;
    padding: 1.25rem 1.75rem;
    border-left: 3px solid var(--rose);
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.2rem;
    line-height: 1.55;
    color: var(--ink);
    position: relative;
  }

  .case-pullquote::before {
    content: '\\201C';
    font-size: 3rem;
    color: var(--rose);
    position: absolute;
    top: -0.5rem;
    left: 1rem;
    line-height: 1;
    font-style: normal;
  }

  .case-footer {
    padding: 1.75rem 3.5rem;
    border-top: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .case-footer-label {
    font-family: var(--font-sc);
    font-size: 0.6rem;
    letter-spacing: 0.13em;
    color: var(--muted);
  }

  .case-footer-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .case-footer-link {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--rose);
    transition: color 0.2s ease;
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.3s ease;
  }

  .case-footer-link:hover {
    text-decoration-color: var(--rose);
  }

  @media (max-width: 768px) {
    .case-backdrop { padding: 1rem 0.75rem; }
    .case-header { padding: 2.5rem 1.75rem 2rem; }
    .case-meta { grid-template-columns: 1fr 1fr; padding: 1.5rem 1.75rem; }
    .case-body { padding: 1.75rem; }
    .case-body-row { grid-template-columns: 1fr; gap: 0.5rem; }
    .case-pullquote { margin: 0 1.75rem 2rem; }
    .case-footer { padding: 1.5rem 1.75rem; flex-direction: column; gap: 1rem; align-items: flex-start; }
  }
`;

export default function ProjectCase({ project, onClose }) {
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    document.body.classList.add('modal-open');

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      el.remove();
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="case-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <article className="case-card" role="dialog" aria-modal="true" aria-label={project.title}>
        <button className="case-close" onClick={onClose} data-cursor="close ×">
          close ×
        </button>

        <header className="case-header">
          <span className="case-entry-label">
            № {project.number} · case study
          </span>
          <span className="case-descriptor">{project.descriptor}</span>
          <div className="case-title-row">
            <h2 className="case-title">{project.title}</h2>
            <span className="case-title-pos">n.</span>
          </div>
          <span className="case-pronunciation">{project.pronunciation}</span>

          <div className="case-definition">
            <span className="case-def-num">1.</span>
            <p className="case-def-text">{project.definition}</p>
          </div>
          {project.etymology && (
            <p className="case-etymology">
              <strong>orig.</strong> {project.etymology}
            </p>
          )}
        </header>

        <dl className="case-meta">
          <div className="case-meta-item">
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div className="case-meta-item">
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="case-meta-item">
            <dt>Stack</dt>
            <dd>{project.stack}</dd>
          </div>
          <div className="case-meta-item">
            <dt>Filed</dt>
            <dd>{project.filed}</dd>
          </div>
        </dl>

        <div className="case-body">
          {project.sections.map((section, i) => (
            <div key={i} className="case-body-row">
              <p className="case-section-label">§ {String(i + 1).padStart(2, '0')} · {section.heading}</p>
              <p className="case-prose">{section.content}</p>
            </div>
          ))}
        </div>

        {project.pullquote && (
          <blockquote className="case-pullquote">{project.pullquote}</blockquote>
        )}

        <footer className="case-footer">
          <span className="case-footer-label">end of entry · cross-reference below</span>
          <div className="case-footer-links">
            {project.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="case-footer-link"
                data-cursor="view →"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
}