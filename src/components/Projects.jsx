import { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import ProjectCase from './ProjectCase.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .projects-section {
    padding: 7rem 0;
    border-top: 1px solid var(--rule);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
  }

  .project-card {
    background: var(--bg);
    padding: 2.25rem 2rem 2rem;
    position: relative;
    overflow: hidden;
    cursor: none;
    transition: background 0.35s ease;
    min-height: 260px;
    display: flex;
    flex-direction: column;
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--rose);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.55s var(--ease-out-expo);
  }

  .project-card:hover {
    background: #F5F0E8;
  }

  .project-card:hover::before {
    transform: scaleX(1);
  }

  .project-card:hover .project-annotation {
    opacity: 1;
  }

  .card-1 { grid-column: 1 / 8; grid-row: 1 / 3; min-height: 520px; }
  .card-2 { grid-column: 8 / 13; grid-row: 1 / 2; }
  .card-3 { grid-column: 8 / 13; grid-row: 2 / 3; }
  .card-4 { grid-column: 1 / 7; grid-row: 3 / 4; }
  .card-5 { grid-column: 7 / 13; grid-row: 3 / 4; }

  .project-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .project-number {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: var(--muted);
  }

  .project-stack-tag {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.82rem;
    color: var(--rose-deep);
    text-align: right;
    max-width: 160px;
  }

  .project-title-row {
    display: flex;
    align-items: baseline;
    gap: 0.35em;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .project-title {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(1.5rem, 2.8vw, 2.4rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .card-1 .project-title {
    font-size: clamp(2rem, 4vw, 3.5rem);
  }

  .card-4 .project-title,
  .card-5 .project-title {
    font-size: clamp(1.3rem, 2vw, 1.9rem);
  }

  .project-n {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1rem;
    color: var(--muted);
    line-height: 1;
  }

  .project-descriptor {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--muted);
    line-height: 1.5;
    flex: 1;
    margin-bottom: 1rem;
  }

  .project-card-footer {
    margin-top: auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .project-cta {
    font-family: var(--font-sc);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: var(--muted);
    transition: color 0.2s ease;
  }

  .project-card:hover .project-cta {
    color: var(--rose);
  }

  .project-annotation {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.8rem;
    color: var(--muted);
    opacity: 0;
    transition: opacity 0.35s ease;
    text-align: right;
    max-width: 160px;
    line-height: 1.4;
  }

  @media (max-width: 900px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
    .card-1, .card-2, .card-3, .card-4, .card-5 {
      grid-column: 1;
      grid-row: auto;
      min-height: 240px;
    }
  }
`;

const projects = [
  {
    number: '01',
    title: 'Oaxaca',
    descriptor: 'a full-stack restaurant management system, end to end',
    stack: 'React · FastAPI · SQLite',
    cardClass: 'card-1',
    annotation: 'five sprints, one very tired team',
    pronunciation: '/ wə · ˈhɑː · kə /',
    definition: 'a restaurant management system with live order tracking, role-specific dashboards, and COGS analytics - built across a full five-sprint Scrum cycle.',
    etymology: 'named after the Mexican state; filed under "projects that taught me what real deadlines feel like."',
    status: 'Complete',
    role: 'Lead Developer',
    stack_full: 'React · FastAPI · SQLite',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'Restaurant operations involve a surprising number of simultaneous moving parts: orders, kitchen queues, staff roles, cost tracking. Oaxaca was built to handle all of them in one coherent system, with a distinct dashboard for each stakeholder.' },
      { heading: 'APPROACH', content: 'A FastAPI backend handles order state and COGS logic, persisted in SQLite. Three React frontends - kitchen, waiter, and manager views - communicate via a shared REST API. Live order tracking was implemented with polling to keep the stack simple and reliable.' },
      { heading: 'PROCESS', content: 'Developed across five Scrum sprints with full ceremony: standups, sprint reviews, retrospectives. The real learning was in the handoffs, keeping the API contract stable while three views evolved independently.' },
    ],
    pullquote: 'The hardest part wasn\'t the code. It was agreeing on what "done" meant.',
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin/oaxaca' }],
  },
  {
    number: '02',
    title: 'Valora',
    descriptor: 'an AI-powered financial chatbot for economic insight',
    stack: 'React · Python',
    cardClass: 'card-2',
    annotation: 'fintech, but make it readable',
    pronunciation: '/ və · ˈlɔː · rə /',
    definition: 'an AI-powered financial chatbot that delivers economic insights on demand, with dynamic charts of stock and revenue data filtered across industries.',
    etymology: 'from Spanish "valor," meaning value or worth; filed under "projects that made me care about finance."',
    status: 'Complete',
    role: 'Frontend',
    stack_full: 'React · Python',
    filed: 'Spring 2025',
    sections: [
      { heading: 'PREMISE', content: 'Financial data is everywhere and legible to almost no one. Valora was built to close that gap. A chatbot interface that answers economic questions and surfaces the underlying data as clean, filterable charts.' },
      { heading: 'APPROACH', content: 'The Python backend handles AI query processing and data aggregation across industries. I contributed the React frontend - the chat interface, the dropdown-filtered chart system, and the layout that tries to make dense data feel approachable.' },
      { heading: 'LEARNINGS', content: 'Presenting financial data well is a design problem as much as an engineering one. Every chart decision - axis labels, colour, granularity - changes what a user walks away believing.' },
    ],
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin/Valora' }],
  },
  {
    number: '03',
    title: 'Lav-oogle',
    descriptor: 'a mini search engine built on PageRank',
    stack: 'Python · NumPy',
    cardClass: 'card-3',
    annotation: 'google, but smaller and more honest',
    pronunciation: '/ læv · uː · ɡ(ə)l /',
    definition: 'a miniature search engine implementing PageRank via graph-based link analysis and NumPy matrix operations, built from first principles.',
    etymology: 'portmanteau of Lavanya + Google; filed under "things I built because algorithms coursework went too well."',
    status: 'Complete',
    role: 'Sole Engineer',
    stack_full: 'Python · NumPy',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'PageRank is one of those algorithms that sounds simple until you implement it. Lav-oogle started as a coursework curiosity and became a full graph-based search engine built from the matrix up.' },
      { heading: 'APPROACH', content: 'Link structure is modelled as a directed graph and represented as a NumPy adjacency matrix. Iterative power method converges to the stationary distribution, the PageRank scores. Query matching runs over an inverted index built at crawl time.' },
      { heading: 'LEARNINGS', content: 'The maths is elegant. The edge cases are not. Dangling nodes, sink pages, and damping factor tuning each require careful handling before rankings start to feel meaningful.' },
    ],
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin/mini-search-engine' }],
  },
  {
    number: '04',
    title: 'Sort It Out.',
    descriptor: 'an interactive sorting algorithm visualiser',
    stack: 'React · JavaScript',
    cardClass: 'card-4',
    annotation: 'revision, but make it watchable',
    pronunciation: '/ sɔːt · ɪt · aʊt /',
    definition: 'an animated visualiser for Bubble, Merge, Quicksort, and Insertion Sort, with speed control and a tabbed revision sheet for each algorithm.',
    etymology: 'imperative mood; filed under "tools I wished existed when I was revising."',
    status: 'Live',
    role: 'Sole Engineer',
    stack_full: 'React · JavaScript',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'Sorting algorithms are easier to understand in motion than on paper. Sort It Out turns four canonical algorithms into animated bar charts, with enough control - speed slider, step-through - to watch the logic unfold.' },
      { heading: 'APPROACH', content: 'Each algorithm is implemented as a generator function, yielding intermediate states that drive the animation frame by frame. A tabbed revision sheet sits alongside: definitions, complexity tables, and notes in plain English.' },
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
    cardClass: 'card-5',
    annotation: 'spoiler: it usually does',
    pronunciation: '/ ðə · haʊs · ɔːlweɪz · wɪnz /',
    definition: 'a Monte Carlo simulation exploring whether single-player tables and AI automation increase casino profitability across blackjack, baccarat, and poker.',
    etymology: 'from the gambling idiom; filed under "data projects with a question worth asking."',
    status: 'In Progress',
    role: 'Sole Engineer',
    stack_full: 'Python · Pandas · Matplotlib · Jupyter',
    filed: 'Spring 2026',
    sections: [
      { heading: 'PREMISE', content: 'Casinos are probability engines. The question this project asks is whether removing the human dealer — replacing them with AI-automated tables — measurably shifts the house edge or throughput in the casino\'s favour.' },
      { heading: 'APPROACH', content: 'Monte Carlo simulation runs thousands of game iterations across three variants - blackjack, baccarat, poker - under different table configurations. Pandas handles the aggregation; Matplotlib surfaces the distributions. Jupyter keeps the analysis reproducible.' },
      { heading: 'STATUS', content: 'Currently in progress. Early results suggest the edge case is not the house advantage itself - which barely moves - but table throughput. Automated tables are simply faster, and speed compounds.' },
    ],
    pullquote: 'The house doesn\'t win by cheating. It wins by being slightly right, very often.',
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin/casino-sim' }],
  },
];

export default function Projects() {
  const [openProject, setOpenProject] = useState(null);
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">
        <SectionHeader number="III" title="Selected works" />
        <div className="projects-grid reveal">
          {projects.map((project) => (
            <article
              key={project.number}
              className={`project-card ${project.cardClass}`}
              onClick={() => setOpenProject(project)}
              data-cursor="read →"
            >
              <div className="project-top">
                <span className="project-number">№ {project.number}</span>
                <span className="project-stack-tag">{project.stack}</span>
              </div>

              <div className="project-title-row">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-n">n.</span>
              </div>

              <p className="project-descriptor">{project.descriptor}</p>

              <div className="project-card-footer">
                <span className="project-cta">Read the case →</span>
                <span className="project-annotation">{project.annotation}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {openProject && (
        <ProjectCase project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  );
}