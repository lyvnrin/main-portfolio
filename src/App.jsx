import { useState, useEffect } from 'react';
import Cursor from './components/Cursor.jsx';
import Navbar from './components/Navbar.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Marquee from './components/Marquee.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import SubstackBanner from './components/SubstackBanner.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Intro from './components/Intro.jsx';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (showIntro) window.scrollTo(0, 0);
  }, []);

  const handleIntroComplete = () => {
    window.scrollTo(0, 0);
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <Cursor />
      {!showIntro && <ScrollProgress />}
      <Navbar />
      <main>
        <Marquee />
        <Hero />
        <About />
        <SubstackBanner />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}