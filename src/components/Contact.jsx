import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import SectionHeader from './SectionHeader.jsx';
import { useRevealElements } from '../hooks/useReveal.js';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const styles = `
  .contact-section {
    padding: 7rem 0;
    border-top: 1px solid var(--rule);
  }

  .contact-note {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.82rem;
    color: var(--muted);
    margin-bottom: 2.5rem;
    opacity: 0.8;
    line-height: 1.6;
  }

  .contact-note-link {
    color: var(--muted);
    border-bottom: 1px solid rgba(107,97,87,0.3);
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .contact-note-link:hover {
    color: var(--rose);
    border-bottom-color: var(--rose);
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
    transition: border-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
    width: 100%;
    text-transform: uppercase;
  }

  .form-submit:hover:not(:disabled) {
    border-color: var(--rose);
    color: var(--rose);
  }

  .form-submit:disabled {
    opacity: 0.4;
  }

  .form-submit-dot {
    color: var(--rose);
    font-size: 0.5rem;
  }

  .form-submit.sent {
    border-color: var(--rose);
    color: var(--rose);
  }

  .form-error {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.85rem;
    color: #c77;
    margin-top: 0.75rem;
    text-align: center;
  }

  .contact-success {
    padding: 1rem 0;
  }

  .contact-success-row {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .contact-success-name {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--ink);
  }

  .contact-success-phonetic {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.9rem;
    color: var(--muted);
  }

  .contact-success-pos {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.9rem;
    color: var(--rose);
  }

  .contact-success-def {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.6;
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
  { platform: 'View My CV',  handle: 'Lavanya Kamble.pdf',       href: '/LavanyaKamble-CV.pdf',                                                                         target: '_blank' },
  { platform: 'LinkedIn',    handle: 'lavanyakamble',             href: 'https://www.linkedin.com/in/lavanyakamble/',                                                    target: '_blank' },
  { platform: 'GitHub',      handle: 'lyvnrin',                   href: 'https://github.com/lyvnrin',                                                                    target: '_blank' },
  { platform: 'Notion',      handle: 'visual portfolio',          href: 'https://lavanya-k-portfolio.notion.site/Welcome-to-My-Portfolio-303e4dd70aaf80499338ee34e86937a6', target: '_blank' },
  { platform: 'Credly',      handle: 'lavanya k',                 href: 'https://www.credly.com/users/lavanya-kamble.73b64a62',                                          target: '_blank' },
  { platform: 'Email',       handle: 'lavanya.kamble6@gmail.com', href: 'mailto:lavanya.kamble6@gmail.com',                                                              target: '_self'  },
];

export default function Contact() {
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' });
  const [status, setStatus] = useState('idle');
  useRevealElements();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const allFilled = form.from_name && form.from_email && form.message;

  const handleSend = async () => {
    if (!allFilled || status === 'sending') return;
    setStatus('sending');
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <SectionHeader number="IV" title="Correspondence" />
        <p className="contact-note">
          † the form sends directly - no email client needed. if you prefer to write directly, please ensure your broswer's Protocol Handlers allow mail links.
        </p>

        <div className="contact-grid">
          <div className="contact-form-wrap reveal">
            {status === 'success' ? (
              <div className="contact-success">
                <div className="contact-success-row">
                  <span className="contact-success-name">{form.from_name}</span>
                  <span className="contact-success-phonetic">/ ˈkær.ə.spɒn.dənt /</span>
                  <span className="contact-success-pos">n.</span>
                </div>
                <p className="contact-success-def">
                  catalogued. a reply will follow in due course.
                </p>
              </div>
            ) : (
              <>
                <div className="form-field">
                  <div className="form-label-wrap">
                    <span className="form-label-word">name</span>
                    <span className="form-label-pos">n.</span>
                  </div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="your name"
                    value={form.from_name}
                    onChange={e => set('from_name', e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="form-field">
                  <div className="form-label-wrap">
                    <span className="form-label-word">email address</span>
                    <span className="form-label-pos">n.</span>
                  </div>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="your email address"
                    value={form.from_email}
                    onChange={e => set('from_email', e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="form-field">
                  <div className="form-label-wrap">
                    <span className="form-label-word">message</span>
                    <span className="form-label-pos">v.</span>
                  </div>
                  <textarea
                    className="form-textarea"
                    placeholder="write something worth cataloguing…"
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="form-ornament" aria-hidden="true">
                  <span className="form-ornament-line" />
                  <span className="form-ornament-cross">+</span>
                  <span className="form-ornament-line" />
                </div>

                <button
                  className={`form-submit${status === 'success' ? ' sent' : ''}`}
                  onClick={handleSend}
                  disabled={!allFilled || status === 'sending'}
                  data-cursor="write →"
                >
                  <span className="form-submit-dot">·</span>
                  {status === 'sending' ? 'cataloguing…' : 'send to catalogue'}
                  <span className="form-submit-dot">·</span>
                </button>

                {status === 'error' && (
                  <p className="form-error">something went wrong — try emailing directly.</p>
                )}
              </>
            )}
          </div>

          <aside className="contact-aside reveal reveal-delay-2">
            <span className="elsewhere-label">Elsewhere</span>
            <ul className="elsewhere-list">
              {elsewhereLinks.map(link => (
                <li key={link.platform} className="elsewhere-item">
                  <span className="elsewhere-platform">{link.platform}</span>
                  <a
                    href={link.href}
                    target={link.target}
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