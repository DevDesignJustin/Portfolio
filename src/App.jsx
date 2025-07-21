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
    // let smoother = ScrollSmoother.create({
    //   smooth: 2,
    //   effects: true,
    //   normalizeScroll: true,
    // });
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".content",
    //     start: "bottom bottom",
    //     end: "bottom top",
    //     scrub: 1,
    //   },
    // });
    // tl.to(".content", {
    //   y: -1000,
    //   ease: "power1.inOut",
    // });
    // document.querySelector('.about-btn').addEventListener('click', () => {
    //   smoother.scrollTo('#about', true);
    // });

    gsap.from('.mid', {
      opacity: 0,
      y: 300,
      duration: 1,
      ease: 'power1.inOut',
    })
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
