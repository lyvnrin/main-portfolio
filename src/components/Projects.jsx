import { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import ProjectCase from './ProjectCase.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .projects-section {
    padding: 7rem 0;
    border-top: 1px solid var(--rule);
  }

  .projects-ledger {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 4rem;
    align-items: start;
  }

  .ledger-list {
    display: flex;
    flex-direction: column;
  }

  .ledger-item {
    padding: 1.5rem 0 1.5rem 0;
    border-bottom: 1px solid var(--rule);
    cursor: none;
    transition: padding-left 0.3s var(--ease-out-expo);
  }

  .ledger-item:first-child {
    padding-top: 0;
  }

  .ledger-item.active {
    padding-left: 1rem;
  }

  .ledger-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }

  .ledger-num {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    flex-shrink: 0;
  }

  .ledger-title {
    font-family: var(--font-serif);
    font-size: clamp(1.4rem, 2.6vw, 2rem);
    line-height: 1.15;
    color: var(--ink);
    transition: color 0.3s ease;
  }

  .ledger-item:hover .ledger-title,
  .ledger-item.active .ledger-title {
    color: var(--rose);
  }

  .ledger-stack {
    display: block;
    margin-top: 0.5rem;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.82rem;
    color: var(--muted);
  }

  .projects-preview {
    position: sticky;
    top: 100px;
    border: 1px solid var(--rule);
    cursor: none;
    transition: border-color 0.3s ease;
  }

  .projects-preview:hover {
    border-color: var(--rose);
  }

  .preview-image {
    width: 100%;
    aspect-ratio: 16 / 10;
    background: var(--rule);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-image-label {
    font-family: var(--font-sc);
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    opacity: 0.6;
  }

  .preview-body {
    padding: 1.75rem 2rem 2rem;
  }

  .preview-title {
    font-family: var(--font-serif);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: var(--ink);
    margin-bottom: 0.6rem;
  }

  .preview-descriptor {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.5;
    margin-bottom: 1.25rem;
  }

  .preview-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .preview-cta {
    font-family: var(--font-sc);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: var(--muted);
    transition: color 0.2s ease;
  }

  .projects-preview:hover .preview-cta {
    color: var(--rose);
  }

  @media (max-width: 900px) {
    .projects-ledger {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    .projects-preview {
      position: static;
    }
  }
`;

const projects = [
  {
    number: '01',
    title: 'Oaxaca',
    descriptor: 'a full-stack restaurant management system, end to end',
    stack: 'React · FastAPI · SQLite',
    image: '',
    annotation: 'five sprints, one very tired team',
    pronunciation: '/ wə · ˈhɑː · kə /',
    definition: 'a restaurant management system with live order tracking, role-specific dashboards, and COGS analytics - built across a full five-sprint Scrum cycle.',
    etymology: 'named after the Mexican state; filed under "projects that taught me what real deadlines feel like."',
    status: 'Complete',
    role: 'Lead Developer',
    stack_full: 'React · FastAPI · SQLite',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'Restaurant ops involve many moving parts at once - orders, kitchen queues, staffing, cost tracking. Oaxaca handles them all in one system, with a dashboard per stakeholder.' },
      { heading: 'APPROACH', content: 'FastAPI and SQLite power the backend; three React frontends - kitchen, waiter, manager - share one REST API, with polling for live order tracking.' },
      { heading: 'PROCESS', content: 'Built across five full Scrum sprints. The real lesson was in the handoffs - keeping the API contract stable while three views evolved independently.' },
    ],
    pullquote: 'The hardest part wasn\'t the code. It was agreeing on what "done" meant.',
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin/oaxaca' }],
  },
  {
    number: '02',
    title: 'Valora',
    descriptor: 'an AI-powered financial chatbot for economic insight',
    stack: 'React · Python',
    image: '',
    annotation: 'fintech, but make it readable',
    pronunciation: '/ və · ˈlɔː · rə /',
    definition: 'an AI-powered financial chatbot that delivers economic insights on demand, with dynamic charts of stock and revenue data filtered across industries.',
    etymology: 'from Spanish "valor," meaning value or worth; filed under "projects that made me care about finance."',
    status: 'Complete',
    role: 'Frontend',
    stack_full: 'React · Python',
    filed: 'Spring 2025',
    sections: [
      { heading: 'PREMISE', content: 'Financial data is everywhere and legible to almost no one. Valora closes that gap with a chatbot that answers economic questions in plain language.' },
      { heading: 'APPROACH', content: 'I built the React frontend - chat interface, filterable charts, and a layout designed to make dense data feel approachable.' },
      { heading: 'LEARNINGS', content: 'Presenting financial data well is a design problem as much as an engineering one - every chart choice changes what a user believes.' },
    ],
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin/Valora' }],
  },
  {
    number: '03',
    title: 'Lav-oogle',
    descriptor: 'a mini search engine built on PageRank',
    stack: 'Python · NumPy',
    image: '',
    annotation: 'google, but smaller and more honest',
    pronunciation: '/ læv · uː · ɡ(ə)l /',
    definition: 'a miniature search engine implementing PageRank via graph-based link analysis and NumPy matrix operations, built from first principles.',
    etymology: 'portmanteau of Lavanya + Google; filed under "things I built because algorithms coursework went too well."',
    status: 'Complete',
    role: 'Sole Engineer',
    stack_full: 'Python · NumPy',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'PageRank sounds simple until you implement it. Lav-oogle turns that coursework curiosity into a full graph-based search engine.' },
      { heading: 'APPROACH', content: 'Link structure becomes a NumPy adjacency matrix; the power method converges to PageRank scores, with queries run over a crawl-time inverted index.' },
      { heading: 'LEARNINGS', content: 'The maths is elegant - the edge cases aren\'t. Dangling nodes and damping factor tuning needed care before rankings felt meaningful.' },
    ],
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin/mini-search-engine' }],
  },
  {
    number: '04',
    title: 'Sort It Out.',
    descriptor: 'an interactive sorting algorithm visualiser',
    stack: 'React · JavaScript',
    image: '',
    annotation: 'revision, but make it watchable',
    pronunciation: '/ sɔːt · ɪt · aʊt /',
    definition: 'an animated visualiser for Bubble, Merge, Quicksort, and Insertion Sort, with speed control and a tabbed revision sheet for each algorithm.',
    etymology: 'imperative mood; filed under "tools I wished existed when I was revising."',
    status: 'Live',
    role: 'Sole Engineer',
    stack_full: 'React · JavaScript',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'Sorting algorithms make more sense in motion. Sort It Out turns four canonical algorithms into animated, speed-controlled bar charts.' },
      { heading: 'APPROACH', content: 'Each algorithm runs as a generator yielding intermediate states, driving the animation frame by frame - alongside a tabbed revision sheet.' },
    ],
    links: [
      { label: '↗ Live', href: 'https://sorting-visualiser-lk.vercel.app/' },
    ],
  },
  {
    number: '05',
    title: 'The House Always Wins?',
    descriptor: 'a Monte Carlo simulation of casino profitability',
    stack: 'Python · Pandas · Matplotlib · Jupyter',
    image: '',
    annotation: 'spoiler: it usually does',
    pronunciation: '/ ðə · haʊs · ɔːlweɪz · wɪnz /',
    definition: 'a Monte Carlo simulation exploring whether single-player tables and AI automation increase casino profitability across blackjack, baccarat, and poker.',
    etymology: 'from the gambling idiom; filed under "data projects with a question worth asking."',
    status: 'In Progress',
    role: 'Sole Engineer',
    stack_full: 'Python · Pandas · Matplotlib · Jupyter',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'Casinos are probability engines. This project asks whether AI-automated tables shift the house edge or throughput in the casino\'s favour.' },
      { heading: 'APPROACH', content: 'Monte Carlo simulation runs thousands of iterations across blackjack, baccarat, and poker; Pandas aggregates, Matplotlib visualises, Jupyter keeps it reproducible.' },
      { heading: 'STATUS', content: 'In progress. Early results suggest the edge barely moves - but automated tables are faster, and speed compounds.' },
    ],
    pullquote: 'The house doesn\'t win by cheating. It wins by being slightly right, very often.',
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin/casino-sim' }],
  },
];

export default function Projects() {
  const [openProject, setOpenProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const active = projects[activeIndex];

  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">
        <SectionHeader number="III" title="Selected works" />
        <div className="projects-ledger reveal">
          <div className="ledger-list" onMouseLeave={() => setHoverIndex(null)}>
            {projects.map((project, i) => (
              <article
                key={project.number}
                className={`ledger-item${i === hoverIndex ? ' active' : ''}`}
                onMouseEnter={() => { setActiveIndex(i); setHoverIndex(i); }}
                onClick={() => setOpenProject(project)}
                data-cursor="read →"
              >
                <div className="ledger-top">
                  <h3 className="ledger-title">{project.title}</h3>
                  <span className="ledger-num">№ {project.number}</span>
                </div>
                <span className="ledger-stack">{project.stack}</span>
              </article>
            ))}
          </div>

          <div
            className="projects-preview"
            onClick={() => setOpenProject(active)}
            data-cursor="read →"
          >
            <div className="preview-image">
              <span className="preview-image-label">image</span>
            </div>
            <div className="preview-body">
              <h4 className="preview-title">{active.title}</h4>
              <p className="preview-descriptor">{active.descriptor}</p>
              <div className="preview-footer">
                <span className="preview-cta">Read the case →</span>
                <span className="preview-cta">{active.stack}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openProject && (
        <ProjectCase project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  );
}
