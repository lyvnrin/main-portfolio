import { useEffect, useRef, useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .projects-section {
    padding: 4rem 0;
  }

  /* ── Folder tabs ── */
  .folder-tabs {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0.35rem;
    position: relative;
    z-index: 1;
    margin-bottom: -1px;
  }

  .folder-tab {
    display: flex;
    align-items: baseline;
    gap: 0.6em;
    padding: 0.45rem 1.1rem;
    border: 1px solid var(--rule);
    border-radius: 6px 6px 0 0;
    background: rgba(31,26,21,0.035);
    white-space: nowrap;
    transition: background 0.3s ease, padding 0.3s var(--ease-out-expo);
  }

  /* the open tab is taller and its bottom edge takes the page colour,
     so it joins the folder while every other tab keeps its full outline */
  .folder-tab.active {
    padding-top: 0.65rem;
    background: var(--bg);
    border-bottom-color: var(--bg);
  }

  .folder-tab-num {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: var(--muted);
  }

  .folder-tab-title {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--muted);
    transition: color 0.3s ease;
  }

  .folder-tab:hover .folder-tab-title,
  .folder-tab.active .folder-tab-title {
    color: var(--ink);
  }

  .folder-tab.active .folder-tab-num {
    color: var(--rose);
  }

  /* ── Folder body, with two offset sheets behind it ── */
  .folder-body {
    position: relative;
    border: 1px solid var(--rule);
    background: var(--bg);
    box-shadow:
      6px 6px 0 -1px var(--bg),
      6px 6px 0 0 var(--rule),
      12px 12px 0 -1px var(--bg),
      12px 12px 0 0 var(--rule);
    margin-right: 12px;
    margin-bottom: 12px;
  }

  .folder-content {
    animation: folderIn 0.45s var(--ease-out-expo);
  }

  @keyframes folderIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .folder-top {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 2rem;
    padding: 1.75rem;
    align-items: stretch;
  }

  /* same width for every project; height follows the screenshot so nothing is cropped or padded */
  .folder-image {
    align-self: center;
    border: 1px solid var(--rule);
  }

  .folder-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  .folder-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1.4rem, 2.4vw, 1.8rem);
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 0.75rem;
  }

  .folder-definition {
    display: flex;
    align-items: baseline;
    gap: 0.75em;
  }

  .folder-def-num {
    font-family: var(--font-sc);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    color: var(--rose);
    flex-shrink: 0;
  }

  .folder-def-text {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    line-height: 1.55;
    color: var(--ink);
  }

  .folder-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1.1rem;
    list-style: none;
  }

  .folder-pill {
    display: inline-block;
    padding: 0.2rem 0.65rem;
    border: 1px solid var(--slate);
    border-radius: 2rem;
    background: var(--slate-soft);
    font-family: var(--font-serif);
    font-size: 0.75rem;
    line-height: 1.4;
    color: var(--slate-deep);
  }

  .folder-pill-link {
    border-color: var(--rose);
    background: transparent;
    color: var(--rose);
    transition: background 0.3s ease, color 0.3s ease;
  }

  .folder-pill-link:hover {
    background: var(--rose);
    color: var(--bg);
  }

  /* ── Case sections as stacked horizontal bands ── */
  .folder-section {
    display: grid;
    grid-template-columns: 9rem 1fr;
    gap: 1.5rem;
    padding: 1.1rem 1.75rem;
    border-top: 1px solid var(--rule);
  }

  .folder-section-label {
    font-family: var(--font-sc);
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    padding-top: 0.3rem;
  }

  .folder-prose {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--ink);
  }

  [data-theme="dark"] .folder-tab {
    background: rgba(240,235,227,0.04);
  }

  [data-theme="dark"] .folder-tab.active {
    background: var(--bg);
  }

  @media (max-width: 900px) {
    .folder-top {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1.25rem;
    }
    .folder-image {
      order: -1;
    }
    .folder-section {
      grid-template-columns: 1fr;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
    }
  }
`;

const projects = [
  {
    number: '01',
    title: 'Oaxaca',
    image: '/oaxaca-hero.png',
    definition: 'a restaurant management system with live order tracking, role-specific dashboards, and COGS analytics - built across a full five-sprint Scrum cycle.',
    status: 'Complete',
    role: 'Lead Developer',
    stack: 'React · FastAPI · SQLite',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'Restaurant ops involve many moving parts at once - orders, kitchen queues, staffing, cost tracking. Oaxaca handles them all in one system, with a dashboard per stakeholder.' },
      { heading: 'APPROACH', content: 'FastAPI and SQLite power the backend; three React frontends - kitchen, waiter, manager - share one REST API, with polling for live order tracking.' },
      { heading: 'PROCESS', content: 'Built across five full Scrum sprints. The real lesson was in the handoffs - keeping the API contract stable while three views evolved independently.' },
    ],
    links: [{ label: 'view github', href: 'https://github.com/lyvnrin/oaxaca' }],
  },
  {
    number: '02',
    title: 'Transcript to Medium',
    image: '/transcript-to-medium-hero.jpg',
    definition: 'a multi-stage Claude pipeline that transforms raw transcripts from TCS PacePort\'s biweekly Applied AI knowledge-sharing sessions into polished, publish-ready Medium articles.',
    status: 'Live',
    role: 'Sole Engineer',
    stack: 'React · Express · Anthropic API · SQLite · Pexels API',
    filed: 'Summer 2026',
    sections: [
      { heading: 'PREMISE', content: 'Every fortnight, PacePort hosts an Applied AI session full of ideas worth sharing - but a raw transcript is not an article. This closes the gap between what was said and something people want to read.' },
      { heading: 'APPROACH', content: 'Transcripts (.pdf, .docx or .md) pass through structuring, fact-checking and formatting stages in Claude, streamed to the UI as progress updates. Each section gets a Pexels header photo, and referenced URLs become Open Graph link preview cards.' },
      { heading: 'PROCESS', content: 'Output is designed for human review, not blind publishing - editors tune length, tone and audience, then refine the draft. Edition history in SQLite means past articles can be reopened and revised.' },
    ],
    links: [
      { label: 'view live', href: 'https://transcript-to-medium.vercel.app' },
      { label: 'view github', href: 'https://github.com/lyvnrin/transcript-to-medium' },
    ],
  },
  {
    number: '03',
    title: 'Valora',
    image: '/valora-hero.png',
    definition: 'an AI-powered financial chatbot that delivers economic insights on demand, with dynamic charts of stock and revenue data filtered across industries.',
    status: 'Complete',
    role: 'Frontend',
    stack: 'React · Python · Figma',
    filed: 'Spring 2025',
    sections: [
      { heading: 'PREMISE', content: 'Financial data is everywhere and legible to almost no one. Valora closes that gap with a chatbot that answers economic questions in plain language.' },
      { heading: 'APPROACH', content: 'I built the React frontend - chat interface, filterable charts, and a layout designed to make dense data feel approachable.' },
      { heading: 'LEARNINGS', content: 'Presenting financial data well is a design problem as much as an engineering one - every chart choice changes what a user believes.' },
    ],
    links: [{ label: 'view github', href: 'https://github.com/lyvnrin/Valora' }],
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // arrow keys move between tabs, like flicking through folders
  const onTabKey = (e) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (activeIndex + step + projects.length) % projects.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const project = projects[activeIndex];

  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">
        <SectionHeader number="III" title="Selected works" />
        <div className="reveal">
          <div className="folder-tabs" role="tablist" aria-label="Projects">
            {projects.map((p, i) => (
              <button
                key={p.number}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`folder-tab-${p.number}`}
                aria-selected={i === activeIndex}
                aria-controls="folder-panel"
                tabIndex={i === activeIndex ? 0 : -1}
                className={`folder-tab${i === activeIndex ? ' active' : ''}`}
                onClick={() => setActiveIndex(i)}
                onKeyDown={onTabKey}
                data-cursor="open →"
              >
                <span className="folder-tab-num">№ {p.number}</span>
                <span className="folder-tab-title">{p.title}</span>
              </button>
            ))}
          </div>

          <div
            className="folder-body"
            role="tabpanel"
            id="folder-panel"
            aria-labelledby={`folder-tab-${project.number}`}
          >
            <article key={project.number} className="folder-content">
              <div className="folder-top">
                <div>
                  <h3 className="folder-title">{project.title}</h3>

                  <div className="folder-definition">
                    <span className="folder-def-num">1.</span>
                    <p className="folder-def-text">{project.definition}</p>
                  </div>

                  <ul className="folder-pills" aria-label="Project details">
                    {[project.status, project.role, project.stack, project.filed].map((detail) => (
                      <li key={detail} className="folder-pill">{detail}</li>
                    ))}
                  </ul>

                  <div className="folder-pills">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="folder-pill folder-pill-link"
                        data-cursor="view →"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>

                <div className="folder-image">
                  <img src={project.image} alt={`${project.title} screenshot`} />
                </div>
              </div>

              {project.sections.map((section, i) => (
                <div key={section.heading} className="folder-section">
                  <span className="folder-section-label">
                    § {String(i + 1).padStart(2, '0')} · {section.heading}
                  </span>
                  <p className="folder-prose">{section.content}</p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
