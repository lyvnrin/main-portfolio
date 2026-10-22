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

  .directory-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 4rem;
  }

  .directory-entry {
    display: flex;
    align-items: baseline;
    padding: 0.85rem 0;
    border-bottom: 1px solid rgba(22,26,43,0.08);
  }

  .directory-platform {
    font-family: var(--font-sc);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--rose);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .directory-leader {
    flex: 1;
    height: 0;
    margin: 0 0.75rem;
    border-bottom: 1px dotted var(--rule);
    transform: translateY(-0.35em);
  }

  /* links read as buttons: outlined navy pill that fills on hover */
  .directory-handle {
    display: inline-flex;
    align-items: center;
    gap: 0.35em;
    padding: 0.2rem 0.75rem;
    border: 1px solid var(--rose);
    border-radius: 2rem;
    font-family: var(--font-serif);
    font-size: 0.85rem;
    color: var(--rose);
    white-space: nowrap;
    text-decoration: none;
    transition: background 0.3s ease, color 0.3s ease;
  }

  .directory-handle-arrow {
    display: inline-block;
    transition: transform 0.3s var(--ease-out-expo);
  }

  .directory-handle:hover {
    background: var(--rose);
    color: var(--bg);
  }

  .directory-handle:hover .directory-handle-arrow {
    transform: translate(2px, -2px);
  }

  @media (max-width: 900px) {
    .directory-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  /* on phones the label sits above its link, so long handles like the email fit */
  @media (max-width: 480px) {
    .directory-entry {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.45rem;
    }
    .directory-leader {
      display: none;
    }
    .directory-handle {
      white-space: normal;
      word-break: break-all;
    }
  }

  [data-theme="dark"] .directory-entry {
    border-bottom-color: rgba(226,229,238,0.14);
  }

  [data-theme="dark"] .directory-leader {
    border-bottom-color: rgba(226,229,238,0.4);
  }
`;

injectStyles('contact-styles', styles);

const elsewhereLinks = [
  { platform: 'View My CV',  handle: 'Lavanya Kamble.pdf',       href: '/LavanyaKamble_CV.pdf',                                                                         target: '_blank' },
  { platform: 'LinkedIn',    handle: 'lavanyakamble',             href: 'https://www.linkedin.com/in/lavanyakamble/',                                                    target: '_blank' },
  { platform: 'GitHub',      handle: 'lyvnrin',                   href: 'https://github.com/lyvnrin',                                                                    target: '_blank' },
  { platform: 'Credly',      handle: 'lavanya k',                 href: 'https://www.credly.com/users/lavanya-kamble.73b64a62',                                          target: '_blank' },
  { platform: 'Email',       handle: 'lavanya.kamble6@gmail.com', href: 'mailto:lavanya.kamble6@gmail.com',                                                              target: '_self'  },
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

        <div className="directory-grid reveal">
          {elsewhereLinks.map(link => (
            <div key={link.platform} className="directory-entry">
              <span className="directory-platform">{link.platform}</span>
              <span className="directory-leader" aria-hidden="true" />
              <a
                href={link.href}
                target={link.target}
                rel="noopener noreferrer"
                className="directory-handle"
              >
                {link.handle}
                <span className="directory-handle-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
