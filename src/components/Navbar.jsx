// src/components/Navbar.jsx
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme.js';

const styles = `
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 8000;
    height: 60px;
    display: flex;
    align-items: center;
    background: rgba(250,247,242,0.55);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    opacity: 0;
    transform: translateY(-100%);
    transition: opacity 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);
    pointer-events: none;
  }

  .navbar.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .navbar::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(31,26,21,0.15);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 2.5rem;
  }

  .navbar-monogram {
    font-family: var(--font-sc);
    font-size: 1rem;
    letter-spacing: 0.32em;
    color: var(--ink);
    font-weight: 600;
    transition: color 0.3s ease;
    flex: 0 0 auto;
  }

  .navbar-monogram:hover {
    color: var(--rose);
  }

  .navbar-center {
    display: flex;
    align-items: center;
    gap: 2rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .nav-item {
    display: flex;
    align-items: baseline;
    gap: 0.3em;
    position: relative;
  }

  .nav-item-word {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 1rem;
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

  .nav-item-pos {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 0.8rem;
    color: var(--muted);
    transition: color 0.3s ease;
  }

  .nav-item.active .nav-item-pos {
    color: var(--rose);
  }

  .nav-sep {
    color: var(--muted);
    font-size: 0.75rem;
    opacity: 0.5;
  }

  .theme-toggle {
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: var(--muted);
    transition: border-color 0.3s ease, color 0.3s ease, transform 0.4s var(--ease-out-expo);
    background: transparent;
  }

  .theme-toggle:hover {
    border-color: var(--rose);
    color: var(--rose);
    transform: rotate(20deg);
  }

  /* ── Mobile menu ── */
  .mobile-menu-btn {
    display: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--rule);
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 300;
    color: var(--muted);
    background: transparent;
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
    top: 60px;
    right: 1.5rem;
    background: rgba(250,247,242,0.96);
    backdrop-filter: blur(16px) saturate(150%);
    -webkit-backdrop-filter: blur(16px) saturate(150%);
    border: 1px solid var(--rule);
    min-width: 180px;
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
    pointer-events: none;
    transition: opacity 0.3s var(--ease-out-expo), transform 0.3s var(--ease-out-expo);
    z-index: 9000;
  }

  .mobile-dropdown.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .mobile-dropdown-item {
    display: flex;
    align-items: baseline;
    gap: 0.4em;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid rgba(31,26,21,0.06);
    width: 100%;
    text-align: left;
    transition: background 0.2s ease;
  }

  .mobile-dropdown-item:last-child {
    border-bottom: none;
  }

  .mobile-dropdown-item:hover {
    background: rgba(184,98,74,0.05);
  }

  .mobile-dropdown-item:hover .nav-item-word {
    color: var(--rose);
  }

  .mobile-dropdown-divider {
    height: 1px;
    background: var(--rule);
    margin: 0;
  }

  .mobile-theme-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1.25rem;
  }

  .mobile-theme-label {
    font-family: var(--font-sc);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    color: var(--muted);
  }

  .mobile-theme-toggle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.78rem;
    color: var(--muted);
    background: transparent;
    transition: border-color 0.3s ease, color 0.3s ease;
  }

  .mobile-theme-toggle:hover {
    border-color: var(--rose);
    color: var(--rose);
  }

  /* ── Dark mode navbar ── */
  [data-theme='dark'] .navbar {
    background: rgba(22,18,14,0.65);
  }

  [data-theme='dark'] .mobile-dropdown {
    background: rgba(22,18,14,0.96);
  }

  .mobile-menu-wrap {
    display: none;
    position: relative;
  }

  @media (max-width: 768px) {
    .navbar-center { display: none; }
    .theme-toggle { display: none; }
    .mobile-menu-wrap { display: block; }
    .mobile-menu-btn { display: flex; }
    .navbar-inner { padding: 0 1.5rem; }
  }
`;

const navItems = [
  { label: 'about',   pos: 'n.', href: '#about' },
  { label: 'skills',  pos: 'n.', href: '#skills' },
  { label: 'work',    pos: 'n.', href: '#projects' },
  { label: 'contact', pos: 'n.', href: '#contact' },
];

const SECTIONS = ['about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const [visible, setVisible]     = useState(false);
  const [active, setActive]       = useState('');
  const [menuOpen, setMenuOpen]   = useState(false);
  const { theme, toggle }         = useTheme();
  const styleRef                  = useRef(null);
  const dropdownRef               = useRef(null);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => el.remove();
  }, []);

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

  return (
    <nav className={`navbar${visible ? ' visible' : ''}`} aria-label="Main navigation">
      <div className="navbar-inner">

        <button
          className="navbar-monogram"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-cursor="top ↑"
        >
          LK
        </button>

        {/* Desktop centre nav */}
        <div className="navbar-center">
          {navItems.map((item, i) => (
            <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {i > 0 && <span className="nav-sep">·</span>}
              <button
                className={`nav-item${active === item.href.replace('#', '') ? ' active' : ''}`}
                onClick={() => scrollTo(item.href)}
                data-cursor="view →"
              >
                <span className="nav-item-word">{item.label}</span>
                <span className="nav-item-pos">{getPOS(item)}</span>
              </button>
            </span>
          ))}
        </div>

        {/* Desktop theme toggle */}
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          data-cursor={theme === 'light' ? 'dark ◑' : 'light ◑'}
        >
          {theme === 'light' ? '☽' : '☀'}
        </button>

        {/* Mobile + button */}
        <div ref={dropdownRef} className="mobile-menu-wrap">
          <button
            className={`mobile-menu-btn${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            +
          </button>

          <div className={`mobile-dropdown${menuOpen ? ' open' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.label}
                className="mobile-dropdown-item"
                onClick={() => scrollTo(item.href)}
              >
                <span className="nav-item-word">{item.label}</span>
                <span className="nav-item-pos">{getPOS(item)}</span>
              </button>
            ))}
            <div className="mobile-dropdown-divider" />
            <div className="mobile-theme-row">
              <span className="mobile-theme-label">
                {theme === 'light' ? 'light mode' : 'dark mode'}
              </span>
              <button
                className="mobile-theme-toggle"
                onClick={toggle}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '☽' : '☀'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}