import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';
import { injectStyles } from '../utils/injectStyles.js';

const styles = `
  .contact-section {
    padding: 4rem 0 2rem;
  }

  .contact-note {
    font-family: var(--font-serif);
    font-size: 1rem;
    color: var(--muted);
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }

  .contact-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  /* slate pills matching the hero pronoun badge; on hover the border darkens, the pill lifts and the arrow nudges */
  .contact-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45em;
    padding: 0.2rem 0.75rem;
    background: var(--slate-soft);
    border: 0.5px solid var(--slate);
    border-radius: 2rem;
    font-family: var(--font-serif);
    font-size: 0.95rem;
    color: var(--slate-deep);
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  }

  .contact-pill-arrow {
    display: inline-block;
    transition: transform 0.3s var(--ease-out-expo);
  }

  .contact-pill:hover,
  .contact-pill:focus-visible {
    border-color: var(--slate-deep);
    transform: translateY(-2px);
  }

  .contact-pill:hover .contact-pill-arrow,
  .contact-pill:focus-visible .contact-pill-arrow {
    transform: translate(2px, -2px);
  }

  /* narrow screens: stack into full-width pills */
  @media (max-width: 600px) {
    .contact-links {
      flex-direction: column;
    }
    .contact-pill {
      justify-content: space-between;
    }
  }
`;

injectStyles('contact-styles', styles);

const elsewhereLinks = [
  { platform: 'view my cv',  handle: 'Lavanya Kamble.pdf',       href: '/LavanyaKamble_CV.pdf',                                                                         target: '_blank' },
  { platform: 'linkedin',    handle: 'lavanyakamble',             href: 'https://www.linkedin.com/in/lavanyakamble/',                                                    target: '_blank' },
  { platform: 'github',      handle: 'lyvnrin',                   href: 'https://github.com/lyvnrin',                                                                    target: '_blank' },
  { platform: 'credly',      handle: 'lavanya k',                 href: 'https://www.credly.com/users/lavanya-kamble.73b64a62',                                          target: '_blank' },
  { platform: 'email',       handle: 'lavanya.kamble6@gmail.com', href: 'mailto:lavanya.kamble6@gmail.com',                                                              target: '_self'  },
];

export default function Contact() {
  useRevealElements();

  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <SectionHeader number="IV" title="Correspondence" />
        <p className="contact-note">
          Get in touch, or find me here.
        </p>

        <div className="contact-links reveal">
          {elsewhereLinks.map(link => (
            <a
              key={link.platform}
              href={link.href}
              target={link.target}
              rel="noopener noreferrer"
              className="contact-pill"
            >
              {link.platform}
              <span className="contact-pill-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
