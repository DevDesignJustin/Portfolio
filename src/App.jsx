import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import TechStack from "./sections/TechStack";
import About from "./sections/About";
import Contact from "./sections/Contact";

function App() {
  useGSAP(() => {
   let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    });

    // document.querySelector('.about-btn').addEventListener('click', () => {
    //   smoother.scrollTo('#about', true);
    // });

    
  });
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Hero />
        <Projects />
        <About />
        <TechStack />
        <Contact />
      </div>
    </div>
  );
}

export default App;
