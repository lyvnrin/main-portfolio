import { useEffect, useState, useRef } from 'react';

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

  .navbar-sub {
    font-family: var(--font-sc);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    color: var(--muted);
    text-transform: uppercase;
    flex: 0 0 auto;
    position: relative;
    transition: color 0.3s ease;
  }

  .navbar-sub::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--rose);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 550ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .navbar-sub:hover {
    color: var(--rose);
  }

  .navbar-sub:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 768px) {
    .navbar-center { display: none; }
    .navbar-sub { display: none; }
    .navbar-inner { padding: 0 1.5rem; }
  }
`;

const navItems = [
  { label: 'about', pos: 'n.', href: '#about' },
  { label: 'skills', pos: 'n.', href: '#skills' },
  { label: 'work', pos: 'n.', href: '#projects' },
  { label: 'contact', pos: 'v.', href: '#contact' },
];

const SECTIONS = ['about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');
  const styleRef = useRef(null);

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
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getPOS = (item) => {
    const sectionId = item.href.replace('#', '');
    if (active === sectionId) return 'curr.';
    return item.pos;
  };

  return (
    <nav className={`navbar${visible ? ' visible' : ''}`} aria-label="Main navigation">
      <div className="navbar-inner">
        <button className="navbar-monogram" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-cursor="top ↑">
          LK
        </button>

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

        <a
          href="https://roserendered.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-sub"
          data-cursor="read →"
        >
          ↗ Rose Rendered
        </a>
      </div>
    </nav>
  );
}