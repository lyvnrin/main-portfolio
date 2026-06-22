import { useEffect } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .about-section {
    padding: 5rem 0 4rem;
    border-top: 1px solid var(--rule);
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: stretch;
  }

  .about-left {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .about-photo {
    width: 100%;
    flex: 1;
    min-height: 280px;
    background: var(--rule);
    border: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about-photo-label {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    opacity: 0.6;
  }

  .about-margin-note {
    margin-top: 2rem;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.85rem;
    color: var(--rose-deep);
    border-left: 1px solid rgba(184,98,74,0.4);
    padding-left: 0.75rem;
    line-height: 1.5;
    max-width: 80%;
  }

  .about-cf {
    margin-top: 2rem;
    border-left: 1px solid rgba(184,98,74,0.4);
    padding-left: 0.75rem;
  }

  .about-cf-label {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.85rem;
    color: var(--rose-deep);
    margin-right: 0.5em;
  }

  .about-cf-text {
    display: inline;
    font-family: var(--font-serif);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--muted);
  }

  .about-summary {
    margin-top: 1.25rem;
    font-family: var(--font-serif);
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--muted);
    max-width: 85%;
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
    font-size: 1.2rem;
    line-height: 1.75;
    color: var(--ink);
  }

  .about-area-term {
    position: relative;
    color: var(--ink);
    transition: color 0.3s ease;
  }

  .about-area-term::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.05em;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease-out-expo);
  }

  .about-area-term:hover {
    color: var(--rose);
    font-style: italic;
  }

  .about-area-term:hover::after {
    transform: scaleX(1);
  }

  /* ── Meta strip ── */
  .about-meta-strip {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--rule);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .meta-item dt {
    font-family: var(--font-sc);
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    color: var(--muted);
    margin-bottom: 0.65rem;
  }

  .meta-item dd {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    color: var(--ink);
    line-height: 1.6;
  }

  .meta-item dd span {
    display: block;
  }

  .meta-item dd .meta-sub {
    font-style: italic;
    font-size: 0.82rem;
    color: var(--muted);
    margin-top: 0.1rem;
  }

  .meta-item dd .meta-entry {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(31,26,21,0.06);
  }

  .meta-item dd .meta-entry:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  @media (max-width: 900px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .about-left {
      height: auto;
    }
    .about-photo {
      flex: none;
      aspect-ratio: 4 / 3;
    }
    .about-meta-strip {
      grid-template-columns: 1fr;
      gap: 1.5rem;
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
            <div className="about-photo">
              <span className="about-photo-label">image</span>
            </div>
            <p className="about-margin-note">
              - taken somewhere between a deploy and a deadline.
            </p>

            <div className="about-cf reveal reveal-delay-2">
              <span className="about-cf-label">cf.</span>
              <p className="about-cf-text">
                <span className="about-area-term">Data Science</span>,{' '}
                <span className="about-area-term">Research</span>,{' '}
                <span className="about-area-term">Web Development</span>,{' '}
                <span className="about-area-term">Financial Systems</span>,{' '}
                <span className="about-area-term">Systems Thinking</span>
              </p>
            </div>

            <p className="about-summary">
              Full-stack leaning - drawn to wrangling messy datasets, building APIs,
              and crafting the interfaces that sit on top.
            </p>
          </div>

          <div className="about-right">
            <div className="about-para reveal reveal-delay-1">
              <span className="about-para-label">¶ I.</span>
              <p className="about-para-text">
                Hi, I'm a penultimate year Computer Science student at Royal Holloway,
                University of London. I'm presently absorbed in the art of making machines
                do interesting things. My work sits at the intersection of data systems,
                clean interfaces, and the stubborn belief that software should be both
                rigorous and human.
              </p>
            </div>

            <div className="about-para reveal reveal-delay-2">
              <span className="about-para-label">¶ II.</span>
              <p className="about-para-text">
                This summer, I'm interning at TCS as a Business Analyst (AI & ST),
                working at the intersection of emerging tech and strategy. Still chasing
                problems that are genuinely hard, ideally with good coffee nearby.
              </p>
            </div>
          </div>
        </div>

        <dl className="about-meta-strip reveal reveal-delay-2">
          <div className="meta-item">
            <dt>Education</dt>
            <dd>
              <div className="meta-entry">
                <span>BSc Computer Science</span>
                <span className="meta-sub">Royal Holloway, University of London</span>
                <span className="meta-sub">2024 – Present</span>
              </div>
            </dd>
          </div>

          <div className="meta-item">
            <dt>Experience</dt>
            <dd>
              <div className="meta-entry">
                <span>Business Analyst Intern, AI & ST</span>
                <span className="meta-sub">TCS · Summer 2026</span>
              </div>
              <div className="meta-entry">
                <span>BFSI Data Lab Spring Intern</span>
                <span className="meta-sub">TCS · 2025</span>
              </div>
              <div className="meta-entry">
                <span>FinTech Work Experience</span>
                <span className="meta-sub">HSBC · 2022</span>
              </div>
            </dd>
          </div>

          <div className="meta-item">
            <dt>Currently</dt>
            <dd>
              <div className="meta-entry">
                <span>Penultimate year</span>
                <span className="meta-sub">Interning at TCS, Summer 2026</span>
                <span className="meta-sub">London, England</span>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}