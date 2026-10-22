import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import SubstackBanner from './components/SubstackBanner.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
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
