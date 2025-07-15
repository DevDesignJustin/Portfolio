import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
import Hero from "./sections/Hero";

function App() {
  return (
    <>
      <Hero />
    </>
  );
}

export default App;
