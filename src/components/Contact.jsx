import { useEffect } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .contact-section {
    padding: 4rem 0;
    border-top: 1px solid var(--rule);
  }

  .contact-note {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.95rem;
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
    border-bottom: 1px solid rgba(31,26,21,0.08);
  }

  .directory-platform {
    font-family: var(--font-sc);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--ink);
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

  .directory-handle {
    position: relative;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.98rem;
    color: var(--ink);
    white-space: nowrap;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .directory-handle::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.15em;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease-out-expo);
  }

  .directory-handle:hover {
    color: var(--rose);
  }

  .directory-handle:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 768px) {
    .directory-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const elsewhereLinks = [
  { platform: 'View My CV',  handle: 'Lavanya Kamble.pdf',       href: '/LavanyaKamble-CV.pdf',                                                                         target: '_blank' },
  { platform: 'LinkedIn',    handle: 'lavanyakamble',             href: 'https://www.linkedin.com/in/lavanyakamble/',                                                    target: '_blank' },
  { platform: 'GitHub',      handle: 'lyvnrin',                   href: 'https://github.com/lyvnrin',                                                                    target: '_blank' },
  { platform: 'Notion',      handle: 'visual portfolio',          href: 'https://lavanya-k-portfolio.notion.site/Welcome-to-My-Portfolio-303e4dd70aaf80499338ee34e86937a6', target: '_blank' },
  { platform: 'Credly',      handle: 'lavanya k',                 href: 'https://www.credly.com/users/lavanya-kamble.73b64a62',                                          target: '_blank' },
  { platform: 'Email',       handle: 'lavanya.kamble6@gmail.com', href: 'mailto:lavanya.kamble6@gmail.com',                                                              target: '_self'  },
];

export default function Contact() {
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <SectionHeader number="IV" title="Correspondence" />
        <p className="contact-note">
          An incomplete directory, indexed below.
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
                data-cursor="view →"
              >
                {link.handle}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
