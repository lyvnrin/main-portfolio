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
              I'm most at home in the space between a question and the system that answers it.
            </blockquote>
            <p className="about-margin-note">
              - that space is usually a FastAPI route and three stack overflows.
            </p>
          </div>

          <div className="about-right">
            <div className="about-para reveal reveal-delay-1">
              <span className="about-para-label">¶ I.</span>
              <p className="about-para-text">
                Hi, I'm a penultimate year Computer Science student at Royal Holloway,
                University of London - presently absorbed in the art of making machines
                do interesting things. My work sits at the intersection of data systems,
                clean interfaces, and the stubborn belief that software should be both
                rigorous and human.
              </p>
            </div>

            <div className="about-para reveal reveal-delay-2">
              <span className="about-para-label">¶ II.</span>
              <p className="about-para-text">
                I'm drawn to the full stack - from wrangling messy datasets and building
                APIs to crafting the interfaces that sit on top. Lately I've been deep
                in data analytics, financial systems, and the quiet satisfaction of a
                query that actually runs fast.
              </p>
            </div>

            <div className="about-para reveal reveal-delay-3">
              <span className="about-para-label">¶ III.</span>
              <p className="about-para-text">
                I'm open to summer 2026 internships - full-stack, data, or anywhere the
                problems are genuinely hard. Preferably somewhere with a good coffee
                situation, real ownership, and things worth building.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}