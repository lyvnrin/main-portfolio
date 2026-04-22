import { useEffect } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .about-section {
    padding: 7rem 0;
    border-top: 1px solid var(--rule);
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }

  .about-left {
    position: relative;
  }

  .about-pull-quote {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(1.6rem, 3.2vw, 2.4rem);
    line-height: 1.35;
    color: var(--ink);
    position: relative;
    padding-left: 1rem;
  }

  .about-pull-quote::before {
    content: '\\201C';
    font-family: var(--font-serif);
    font-size: 5rem;
    color: var(--rose);
    position: absolute;
    top: -1.2rem;
    left: -0.5rem;
    line-height: 1;
    font-style: normal;
  }

  .about-pull-quote::after {
    content: '\\201D';
    font-family: var(--font-serif);
    font-size: 5rem;
    color: var(--rose);
    line-height: 0;
    vertical-align: -1.2em;
    font-style: normal;
    margin-left: 0.15em;
  }

  .about-margin-note {
    margin-top: 2rem;
    transform: rotate(-2deg);
    transform-origin: left;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.85rem;
    color: var(--rose-deep);
    border-left: 1px solid rgba(184,98,74,0.4);
    padding-left: 0.75rem;
    line-height: 1.5;
    max-width: 80%;
  }

  .about-right {
    padding-top: 0.5rem;
  }

  .about-para {
    margin-bottom: 2rem;
  }

  .about-para-label {
    font-family: var(--font-sc);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    color: var(--rose);
    display: block;
    margin-bottom: 0.6rem;
  }

  .about-para-text {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    line-height: 1.75;
    color: var(--ink);
  }

  @media (max-width: 900px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
`;

export default function About() {
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="section-wrap">
        <SectionHeader number="I" title="On the writer" />
        <div className="about-grid">
          <div className="about-left reveal">
            <blockquote className="about-pull-quote">
              I write code the way I write prose — with intention, rhythm, and
              a refusal to let the first draft be the last.
            </blockquote>
            <p className="about-margin-note">
              — first noted at 2am debugging a parser that turned out to be entirely correct
            </p>
          </div>

          <div className="about-right">
            <div className="about-para reveal reveal-delay-1">
              <span className="about-para-label">¶ I.</span>
              <p className="about-para-text">
                Lavanya Kamble is a Computer Science student at Royal Holloway, University of
                London — presently absorbed in the art of making machines do interesting things.
                Her work sits at the comfortable intersection of data systems, clean interfaces,
                and the stubborn belief that software should be both rigorous and human.
              </p>
            </div>

            <div className="about-para reveal reveal-delay-2">
              <span className="about-para-label">¶ II.</span>
              <p className="about-para-text">
                She writes at <em>Rose Rendered</em> — a Substack publication about technology,
                culture, and the small moments where the two collide unexpectedly. The essays
                are long, considered, and occasionally about why someone had to touch grass.
                The thinking is always about something larger.
              </p>
            </div>

            <div className="about-para reveal reveal-delay-3">
              <span className="about-para-label">¶ III.</span>
              <p className="about-para-text">
                She is available for summer 2026 — internships, research roles, or projects
                that require someone who will stay up too late thinking about architecture.
                Preferably with a good coffee situation and genuine problems to solve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}