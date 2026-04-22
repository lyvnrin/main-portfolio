import { useEffect, useRef } from 'react';

export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current || document;
    const elements = container.querySelectorAll
      ? container.querySelectorAll('.reveal')
      : [];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options }
    );

    elements.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return ref;
}

export function useRevealElements() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const attach = () => {
      document.querySelectorAll('.reveal:not(.in-view)').forEach((el) => {
        obs.observe(el);
      });
    };

    attach();
    const interval = setInterval(attach, 500);
    setTimeout(() => clearInterval(interval), 4000);

    return () => {
      obs.disconnect();
      clearInterval(interval);
    };
  }, []);
}