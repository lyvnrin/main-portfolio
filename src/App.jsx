import Cursor from './components/Cursor.jsx';
import Navbar from './components/Navbar.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Marquee from './components/Marquee.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import SubstackBanner from './components/SubstackBanner.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import AreasBanner from './components/AreasBanner.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Marquee />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SubstackBanner />
        <Skills />
        <Projects />
        <AreasBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}