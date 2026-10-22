import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme.js';
import { injectStyles } from '../utils/injectStyles.js';

const styles = `
  /* ── Contents sidebar (wide screens) ── */
  .toc {
    position: fixed;
    top: 50%;
    left: 1.75rem;
    z-index: 8000;
    width: 8rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    opacity: 0;
    transform: translate(-1rem, -50%);
    transition: opacity 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);
    pointer-events: none;
  }

  .toc.visible {
    opacity: 1;
    transform: translate(0, -50%);
    pointer-events: auto;
  }

  .navbar-monogram {
    font-family: var(--font-sc);
    font-size: 1rem;
    letter-spacing: 0.32em;
    color: var(--ink);
    font-weight: 600;
    transition: color 0.3s ease;
    align-self: flex-start;
  }

  .navbar-monogram:hover {
    color: var(--rose);
  }

  .toc-heading {
    font-family: var(--font-sc);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.24em;
    color: var(--ink);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--rule);
    margin-bottom: -0.6rem;
  }

  .toc-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .nav-item {
    display: flex;
    align-items: baseline;
    gap: 0.3em;
    position: relative;
    width: 100%;
    text-align: left;
  }

  .toc-num {
    font-family: var(--font-serif);
    font-size: 0.7rem;
    color: var(--muted);
    min-width: 1.1rem;
    transition: color 0.3s ease;
  }

  .nav-item-word {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--ink);
    position: relative;
    transition: color 0.3s ease;
  }

  .nav-item-word::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--rose);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 550ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-item:hover .nav-item-word::after {
    transform: scaleX(1);
  }

  .toc-leader {
    flex: 1;
    min-width: 0.5rem;
    border-bottom: 1px dotted var(--rule);
    transform: translateY(-0.25em);
  }

  .nav-item-pos {
    font-family: var(--font-serif);
    font-size: 0.7rem;
    color: var(--muted);
    transition: color 0.3s ease;
  }

  .nav-item.active .nav-item-pos,
  .nav-item.active .toc-num {
    color: var(--rose);
  }

  /* sits right under the last entry, styled as a link rather than an icon button */
  .theme-toggle {
    align-self: flex-start;
    margin-top: -0.9rem;
    font-family: var(--font-serif);
    font-size: 0.75rem;
    color: var(--muted);
    background: transparent;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.2em;
    transition: color 0.3s ease, text-decoration-color 0.3s ease;
  }

  .theme-toggle:hover {
    color: var(--rose);
    text-decoration-color: currentColor;
  }

  /* ── Compact contents menu (narrow screens) ── */
  .mobile-menu-wrap {
    display: none;
    position: fixed;
    top: 1.25rem;
    left: 1.25rem;
    z-index: 8000;
    opacity: 0;
    transform: translateX(-1rem);
    transition: opacity 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);
    pointer-events: none;
  }

  .mobile-menu-wrap.visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }

  .mobile-menu-btn {
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--rule);
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 300;
    color: var(--muted);
    background: var(--bg);
    transition: border-color 0.3s ease, color 0.3s ease, transform 0.4s var(--ease-out-expo);
    line-height: 1;
    flex-shrink: 0;
  }

  .mobile-menu-btn:hover {
    border-color: var(--rose);
    color: var(--rose);
  }

  .mobile-menu-btn.open {
    transform: rotate(45deg);
    border-color: var(--rose);
    color: var(--rose);
  }

  .mobile-dropdown {
    position: absolute;
    top: 44px;
    left: 0;
    background: rgba(245,246,249,0.96);
    backdrop-filter: blur(16px) saturate(150%);
    -webkit-backdrop-filter: blur(16px) saturate(150%);
    border: 1px solid var(--rule);
    min-width: 200px;
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
    transform-origin: top left;
    pointer-events: none;
    transition: opacity 0.3s var(--ease-out-expo), transform 0.3s var(--ease-out-expo);
    z-index: 9000;
  }

  .mobile-dropdown.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .mobile-dropdown .toc-heading {
    padding: 0.9rem 1.25rem 0.5rem;
    margin-bottom: 0;
  }

  .mobile-dropdown-item {
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid rgba(22,26,43,0.06);
    transition: background 0.2s ease;
  }

  .mobile-dropdown-item:hover {
    background: rgba(2,12,114,0.05);
  }

  .mobile-dropdown-item:hover .nav-item-word {
    color: var(--rose);
  }

  /* the whole row is the toggle, a text link like the sidebar's */
  .mobile-theme-toggle {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.9rem 1.25rem;
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: var(--ink);
    opacity: 0.7;
    background: transparent;
    transition: color 0.3s ease, opacity 0.3s ease;
  }

  .mobile-theme-toggle:hover {
    color: var(--rose);
    opacity: 1;
  }

  [data-theme='dark'] .mobile-dropdown {
    background: rgba(18,20,28,0.96);
  }

  /* The sidebar needs the gutter beside the 1200px content column */
  @media (max-width: 1499px) {
    .toc { display: none; }
    .mobile-menu-wrap { display: block; }
  }
`;

injectStyles('navbar-styles', styles);

const navItems = [
  { num: 'i.',   label: 'about',   pos: 'n.', href: '#about' },
  { num: 'ii.',  label: 'skills',  pos: 'n.', href: '#skills' },
  { num: 'iii.', label: 'projects', pos: 'n.', href: '#projects' },
  { num: 'iv.',  label: 'contact', pos: 'n.', href: '#contact' },
];

const SECTIONS = ['about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const [visible, setVisible]     = useState(false);
  const [active, setActive]       = useState('');
  const [menuOpen, setMenuOpen]   = useState(false);
  const { theme, toggle }         = useTheme();
  const dropdownRef               = useRef(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const getPOS = (item) => {
    const sectionId = item.href.replace('#', '');
    if (active === sectionId) return 'curr.';
    return item.pos;
  };

  const isActive = (item) => active === item.href.replace('#', '');

  const entry = (item, className) => (
    <button
      className={`nav-item ${className}${isActive(item) ? ' active' : ''}`}
      onClick={() => scrollTo(item.href)}
    >
      <span className="toc-num">{item.num}</span>
      <span className="nav-item-word">{item.label}</span>
      <span className="toc-leader" />
      <span className="nav-item-pos">{getPOS(item)}</span>
    </button>
  );

  return (
    <>
      {/* Contents sidebar (wide screens) */}
      <nav className={`toc${visible ? ' visible' : ''}`} aria-label="Contents">
        <button
          className="navbar-monogram"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          LK
        </button>

        <p className="toc-heading">contents</p>

        <ol className="toc-list">
          {navItems.map((item) => (
            <li key={item.label}>{entry(item, 'toc-entry')}</li>
          ))}
        </ol>

        <button
          className="theme-toggle"
          onClick={toggle}
        >
          {theme === 'light' ? 'dark mode' : 'light mode'}
        </button>
      </nav>

      {/* Compact contents menu (narrow screens) */}
      <div ref={dropdownRef} className={`mobile-menu-wrap${visible ? ' visible' : ''}`}>
        <button
          className={`mobile-menu-btn${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle contents"
        >
          +
        </button>

        <nav className={`mobile-dropdown${menuOpen ? ' open' : ''}`} aria-label="Contents">
          <p className="toc-heading">contents</p>
          {navItems.map((item) => (
            <div key={item.label}>{entry(item, 'mobile-dropdown-item')}</div>
          ))}
          <button className="mobile-theme-toggle" onClick={toggle}>
            {theme === 'light' ? 'dark mode' : 'light mode'}
          </button>
        </nav>
      </div>
    </>
  );
}
