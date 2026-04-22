import { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const styles = `
  .contact-section {
    padding: 7rem 0;
    border-top: 1px solid var(--rule);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 6rem;
    align-items: start;
  }

  .contact-form-wrap {}

  .form-field {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: baseline;
    gap: 1.5rem;
    margin-bottom: 2.25rem;
    padding-bottom: 2.25rem;
    border-bottom: 1px solid rgba(31,26,21,0.07);
  }

  .form-field:last-of-type {
    border-bottom: none;
  }

  .form-label-wrap {
    display: flex;
    align-items: baseline;
    gap: 0.3em;
    flex-direction: column;
  }

  .form-label-word {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--ink);
  }

  .form-label-pos {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.78rem;
    color: var(--muted);
  }

  .form-input,
  .form-textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--rule);
    padding: 0.4rem 0;
    font-family: var(--font-serif);
    font-size: 1.05rem;
    color: var(--ink);
    outline: none;
    transition: border-color 0.3s ease;
    resize: none;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: var(--muted);
    font-style: italic;
    opacity: 0.7;
  }

  .form-input:focus,
  .form-textarea:focus {
    border-color: var(--rose);
  }

  .form-textarea {
    min-height: 120px;
    line-height: 1.65;
  }

  .form-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin: 2rem 0;
  }

  .form-ornament-line {
    width: 3rem;
    height: 1px;
    background: var(--rule);
  }

  .form-ornament-cross {
    color: var(--rose);
    font-size: 0.9rem;
    line-height: 1;
  }

  .form-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6em;
    border: 1px solid var(--ink);
    padding: 0.75rem 2rem;
    font-family: var(--font-sc);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    color: var(--ink);
    transition: border-color 0.3s ease, color 0.3s ease;
    width: 100%;
    text-transform: uppercase;
  }

  .form-submit:hover {
    border-color: var(--rose);
    color: var(--rose);
  }

  .form-submit-dot {
    color: var(--rose);
    font-size: 0.5rem;
  }

  .form-submit.sent {
    border-color: var(--rose);
    color: var(--rose);
  }

  .contact-aside {}

  .elsewhere-label {
    font-family: var(--font-sc);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    color: var(--muted);
    display: block;
    margin-bottom: 1.75rem;
  }

  .elsewhere-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .elsewhere-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 1px solid rgba(31,26,21,0.06);
    padding-bottom: 1.25rem;
  }

  .elsewhere-item:last-child {
    border-bottom: none;
  }

  .elsewhere-platform {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    color: var(--muted);
  }

  .elsewhere-handle {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.92rem;
    color: var(--ink);
    position: relative;
  }

  .elsewhere-handle::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--rose);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.55s var(--ease-out-expo);
  }

  .elsewhere-item:hover .elsewhere-handle::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 900px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 4rem;
    }
    .form-field {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
`;

const elsewhereLinks = [
  { platform: 'GitHub', handle: 'lyvnrin', href: 'https://github.com/lyvnrin' },
  { platform: 'Substack', handle: 'Rose Rendered', href: 'https://roserendered.substack.com' },
  { platform: 'LinkedIn', handle: 'Lavanya Kamble', href: 'https://linkedin.com/in/lavanyakamble' },
  { platform: 'Email', handle: 'hello@lavanyakamble.com', href: 'mailto:hello@lavanyakamble.com' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Hello from ${form.name || 'your website'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:hello@lavanyakamble.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <SectionHeader number="IV" title="Correspondence" />
        <div className="contact-grid">
          <div className="contact-form-wrap reveal">
            <div className="form-field">
              <div className="form-label-wrap">
                <span className="form-label-word">name</span>
                <span className="form-label-pos">n.</span>
              </div>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <div className="form-label-wrap">
                <span className="form-label-word">address</span>
                <span className="form-label-pos">n.</span>
              </div>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="your address"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <div className="form-label-wrap">
                <span className="form-label-word">message</span>
                <span className="form-label-pos">v.</span>
              </div>
              <textarea
                name="message"
                className="form-textarea"
                placeholder="write something worth cataloguing…"
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
            </div>

            <div className="form-ornament" aria-hidden="true">
              <span className="form-ornament-line" />
              <span className="form-ornament-cross">+</span>
              <span className="form-ornament-line" />
            </div>

            <button
              className={`form-submit${sent ? ' sent' : ''}`}
              onClick={handleSubmit}
              data-cursor="write →"
            >
              <span className="form-submit-dot">·</span>
              {sent ? 'sent — thank you' : 'send to catalogue'}
              <span className="form-submit-dot">·</span>
            </button>
          </div>

          <aside className="contact-aside reveal reveal-delay-2">
            <span className="elsewhere-label">Elsewhere</span>
            <ul className="elsewhere-list">
              {elsewhereLinks.map((link) => (
                <li key={link.platform} className="elsewhere-item">
                  <span className="elsewhere-platform">{link.platform}</span>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="elsewhere-handle"
                    data-cursor="view →"
                  >
                    {link.handle}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}