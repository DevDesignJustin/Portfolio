import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import TechStack from "./sections/TechStack";
import About from "./sections/About";
import Contact from "./sections/Contact";

function App() {
  useGSAP(() => {
    gsap.from('.mid', {
      opacity: 0,
      y: 300,
      duration: 1,
      ease: 'power1.inOut',
    });
  });
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className="relative min-h-screen">
        <div className="content z-10 bg-white relative">
          <div className="sticky top-0 -z-20">
            <Hero />
          </div>
          <div className="mid">
            <About />
            <Projects />
            <TechStack />
          </div>
        </div>
        <div className="h-[800px]"></div>
        <div className="fixed bottom-0 w-full -z-10 bg-white">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
