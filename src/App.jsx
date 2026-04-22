import Cursor from './components/Cursor.jsx';
import TopMark from './components/TopMark.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Marquee from './components/Marquee.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Cursor />
      <TopMark />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}