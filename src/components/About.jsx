import { useEffect } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .about-section {
    padding: 5rem 0 1.5rem;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: stretch;
  }

  .about-aside {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .about-photo {
    width: 100%;
    border: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 8rem;
  }

  .about-photo img {
    width: 100%;
    height: auto;
    display: block;
  }

  .about-photo-label {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: var(--muted);
    opacity: 0.6;
  }

  .about-body {
    padding-top: 0.5rem;
  }

  .about-para {
    margin-bottom: 2rem;
  }

  .about-para:last-child {
    margin-bottom: 0;
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

  /* ── Meta strip ── */
  .about-meta-strip {
    margin-top: 1rem;
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
    .about-aside {
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
          <div className="about-body">
            <div className="about-para reveal reveal-delay-1">
              <span className="about-para-label">¶ I.</span>
              <p className="about-para-text">
                Hi, I'm a final year Computer Science student at Royal Holloway,
                University of London. I'm presently absorbed in the art of making machines
                do interesting things.
              </p>
            </div>

            <div className="about-para reveal reveal-delay-2">
              <span className="about-para-label">¶ II.</span>
              <p className="about-para-text">
                My work sits at the intersection of data systems, clean interfaces, and
                the stubborn belief that software should be both rigorous and human.
              </p>
            </div>
          </div>

          <div className="about-aside reveal">
            <div className="about-photo">
              <img src="/about-photo.jpg" alt="Lavanya sitting by a window overlooking London" />
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
                <span>Final year</span>
                <span className="meta-sub">London, England</span>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}