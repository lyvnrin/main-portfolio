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
    grid-template-rows: auto auto;
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
    .card-1, .card-2, .card-3 {
      grid-column: 1;
      grid-row: auto;
      min-height: 240px;
    }
  }
`;

const projects = [
  {
    number: '01',
    title: 'RoseDB',
    descriptor: 'a personal knowledge graph for the anxiously organised',
    stack: 'Python · PostgreSQL',
    cardClass: 'card-1',
    annotation: 'built at 2am out of spite',
    pronunciation: '/ rəʊz · diː · biː /',
    definition: 'a semantic graph database for personal knowledge management, born from the frustration of losing good ideas in a notes app graveyard.',
    etymology: 'from rose (the newsletter, the person) + DB (database); filed under "projects that became too serious too quickly."',
    status: 'Active',
    role: 'Sole Engineer',
    filed: 'Spring 2025',
    sections: [
      { heading: 'PREMISE', content: 'Every writer accumulates notes at a rate that outpaces their organisational willpower. RoseDB emerged from this exact entropy — a structured graph store for ideas, references, and the half-formed thoughts that might become essays.' },
      { heading: 'APPROACH', content: 'Built on PostgreSQL with a recursive CTE schema for node-edge traversal. A FastAPI backend exposes the graph via a REST interface. The frontend is intentionally sparse: a search field, a node inspector, and a force-directed visualisation for when you want to feel like a conspiracy theorist with taste.' },
      { heading: 'LEARNINGS', content: 'Graph traversal at scale requires aggressive indexing. The real engineering challenge was not the data model but the query language — deciding what a "related note" means semantically, not just structurally.' },
    ],
    pullquote: 'The most interesting problems aren\'t the technical ones — they\'re deciding what counts as a connection.',
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin' }],
  },
  {
    number: '02',
    title: 'Ledger',
    descriptor: 'personal finance tracking with a literary sensibility',
    stack: 'React · Flask · SQLite',
    cardClass: 'card-2',
    annotation: 'finance app for people who read',
    pronunciation: '/ ˈlɛdʒ · ər /',
    definition: 'a minimalist personal finance tracker that treats expense categorisation as taxonomy, not punishment.',
    etymology: 'from Middle English "legger," a book for recording financial transactions; repurposed here for the digitally literate.',
    status: 'Complete',
    role: 'Full Stack',
    filed: 'Autumn 2024',
    sections: [
      { heading: 'PREMISE', content: 'Most budgeting apps are designed with the assumption that users hate themselves. Ledger was built with the opposite premise: that the act of tracking spending can be made thoughtful and even pleasant.' },
      { heading: 'APPROACH', content: 'A Flask API handles transaction persistence and categorisation logic. The React frontend uses a deliberately restrained design language — monochrome charts, typeset tables, and zero gamification elements.' },
      { heading: 'OUTCOME', content: 'Used daily since launch. The most important feature turned out to be the monthly summary email — a quiet, typeset note about where the money went, written in a tone that doesn\'t judge.' },
    ],
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin' }],
  },
  {
    number: '03',
    title: 'Marginalia',
    descriptor: 'an API for annotating the open web',
    stack: 'FastAPI · Vercel · PostgreSQL',
    cardClass: 'card-3',
    annotation: 'what if the internet had margins?',
    pronunciation: '/ mɑː · dʒɪ · ˈneɪ · lɪ · ə /',
    definition: 'a web annotation service that lets readers leave notes in the margins of any URL — private, shared, or public.',
    etymology: 'from Latin "marginalia," notes written in the margins of manuscripts; extended here to the margins of hypertext.',
    status: 'In Progress',
    role: 'Backend Lead',
    filed: 'Winter 2025',
    sections: [
      { heading: 'PREMISE', content: 'Reading on the web is a solitary act. Marginalia treats URLs as addressable documents and lets readers build a layer of annotation on top of any page — a reading community without requiring the site\'s cooperation.' },
      { heading: 'APPROACH', content: 'FastAPI handles annotation CRUD and serves a lightweight JavaScript snippet that surfaces annotations as overlaid margin notes. PostgreSQL with a URL-normalisation layer ensures that annotations survive redirects and protocol variations.' },
      { heading: 'NEXT', content: 'The interesting unsolved problem is conflict resolution: what happens when two readers annotate the same character offset in a text that the publisher then edits? The current approach is conservative — annotations orphan gracefully.' },
    ],
    pullquote: 'Every interesting technical problem is secretly a philosophical one about identity and change.',
    links: [{ label: '↗ GitHub', href: 'https://github.com/lyvnrin' }],
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