import { useEffect, useRef, useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  /* the folder sits on its own cool surface so it lifts off the cream page */
  .projects-section {
    padding: 4rem 0;
    --folder-surface: #FFFFFF;
    --folder-edge: rgba(43,50,86,0.28);
  }

  [data-theme="dark"] .projects-section {
    --folder-surface: #222738;
    --folder-edge: rgba(179,185,245,0.22);
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
    border-color: #2B3256;
    background: #2B3256;
    white-space: nowrap;
    transition: background 0.3s ease, padding 0.3s var(--ease-out-expo);
  }

  .folder-tab:hover {
    background: #3A4270;
    border-color: #3A4270;
  }

  /* the open tab is taller and its bottom edge takes the page colour,
     so it joins the folder while every other tab keeps its full outline */
  .folder-tab.active {
    padding-top: 0.65rem;
    background: var(--folder-surface);
    border-color: var(--folder-edge);
    border-bottom-color: var(--folder-surface);
  }

  .folder-tab-num {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: rgba(226,226,226,0.6);
  }

  .folder-tab-title {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 0.9rem;
    color: #E2E2E2;
    transition: color 0.3s ease;
  }

  .folder-tab.active .folder-tab-title {
    color: var(--ink);
  }

  .folder-tab.active .folder-tab-num {
    color: var(--rose);
  }

  /* ── Folder body, with two offset sheets behind it ── */
  .folder-body {
    position: relative;
    border: 1px solid var(--folder-edge);
    background: var(--folder-surface);
    box-shadow:
      6px 6px 0 -1px #DCE0EA,
      6px 6px 0 0 var(--folder-edge),
      12px 12px 0 -1px #BEC4D6,
      12px 12px 0 0 var(--folder-edge),
      0 24px 48px -16px rgba(20,24,50,0.25),
      0 6px 16px -4px rgba(20,24,50,0.1);
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

  .folder-prose + .folder-prose {
    margin-top: 0.7rem;
  }

  .folder-prose {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--ink);
  }

  [data-theme="dark"] .folder-tab.active {
    background: var(--folder-surface);
  }

  [data-theme="dark"] .folder-body {
    box-shadow:
      6px 6px 0 -1px #2A3045,
      6px 6px 0 0 var(--folder-edge),
      12px 12px 0 -1px #343B56,
      12px 12px 0 0 var(--folder-edge),
      0 24px 48px -16px rgba(0,0,0,0.55),
      0 6px 16px -4px rgba(0,0,0,0.3);
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
    title: 'HTML as a Format',
    image: '/html-as-format-hero.jpg',
    definition: 'an internal tool that converts static PowerPoints, PDFs and meeting transcripts into interactive, self-contained HTML pages for consultants - replacing one-off, hand-formatted decks with generated content that\'s quicker to skim, share and revisit.',
    status: 'Complete',
    role: 'Sole Engineer',
    stack: 'React · Express · Anthropic API',
    filed: 'Summer 2026',
    sections: [
      { heading: 'PREMISE', content: 'Consultants lose hours hand-formatting decks that get skimmed once and forgotten. HTML as a Format turns the same source material into a single interactive page - drop a file, pick a layout, and it downloads with no build step and nothing to host.' },
      { heading: 'PIPELINE', content: [
        'Every input is normalised into slide-shaped JSON ({ slide, heading, body[], images[] }). .pptx files are unzipped with JSZip and read by a regex-based XML parser guarded against zip bombs.',
        'PDFs go through pdf-parse, then a single Claude Sonnet call structures the raw text into the same shape.',
        'Each extracted image is captioned by Claude Haiku 4.5, and those captions ride along as context even for renderers that never embed the image.',
      ] },
      { heading: 'ARCHITECTURE', content: [
        'A React 19 + Vite frontend talks to an Express backend.',
        'Timeline and Bubble Map each make one Sonnet tool call - key moments, or 3-8 clustered themes - and stamp the resulting JSON into an HTML template; Gallery skips the LLM entirely, grouping content into stat, step and prose blocks with regex and word-count heuristics.',
        'Renderers are discovered at startup: any skills folder prefixed render - that holds a SKILL.md and an HTML template is exposed through GET /api/formats, so a new format ships without touching backend code. Output is one self-contained HTML file with no runtime dependencies.',
      ] },
    ],
    links: [{ label: 'view github', href: 'https://github.com/lyvnrin/html-as-format' }],
  },
  {
    number: '02',
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
      { heading: 'ARCHITECTURE', content: [
        'FastAPI split into six routers - orders, menu, staff, stock, customers, alerts - over raw sqlite3 with WAL journaling and foreign keys enforced, and Pydantic models validating every payload.',
        'Orders move through a REST lifecycle: POST /orders, PATCH /orders/{id} for status, POST /orders/{id}/pay, with line items added and removed independently, and kitchen updates depleting stock through /stock/deplete. The kitchen dashboard polls /orders every three seconds for near-real-time tickets.',
        'CSV seed scripts rebuild the database from scratch, and a GitLab CI pipeline runs the backend unittest suite and a production frontend build on every push.',
      ] },
    ],
    links: [{ label: 'view github', href: 'https://github.com/lyvnrin/oaxaca' }],
  },
  {
    number: '03',
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
      { heading: 'ARCHITECTURE', content: [
        'A single Express handler, /api/process, runs the whole pipeline and streams each stage to the React client as Server-Sent Events: extracting, structuring, fact-checking, previewing, formatting, done.',
        'Uploads arrive as multipart via multer; mammoth and pdf-parse extract text, merged into one source under labelled transcript and supplementary headers.',
        'Three Claude calls follow - structuring into editorial JSON, a fact-check pass that corrects misattributed authorship and fails open to the unchecked draft, and formatting into semantic HTML.',
        'The formatter leaves <!--SECTION_IMAGE:N--> and <!--LINK_CARD:N--> placeholders keyed to each section\'s original index, so Pexels photos and Open Graph cards still splice into the right place after Claude reorders sections. Editions persist through better-sqlite3.',
      ] },
      { heading: 'PROCESS', content: 'Output is designed for human review, not blind publishing - editors tune length, tone and audience, then refine the draft. Edition history in SQLite means past articles can be reopened and revised.' },
    ],
    links: [
      { label: 'view live', href: 'https://transcript-to-medium.vercel.app' },
      { label: 'view github', href: 'https://github.com/lyvnrin/transcript-to-medium' },
    ],
  },
  {
    number: '04',
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
      { heading: 'ARCHITECTURE', content: [
        'React 19 + Vite with React Router across three views - landing, chatbot and company profiles - styled in Tailwind v4, with chatbot replies rendered from markdown through marked.',
        'Behind it, a FastAPI service resolves tickers from free-text questions, infers the prompt type, and grounds Gemini 2.5 Flash responses in company data from yFinance and TAAPI technical indicators, alongside ratio analysis, anomaly detection and hypothesis-testing modules. The full stack ships as a Docker image on Google Cloud Run.',
      ] },
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
        <SectionHeader number="III" title="Projects" />
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
                  <div>
                    {[].concat(section.content).map((para) => (
                      <p key={para} className="folder-prose">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
