import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
gsap.registerPlugin(SplitText);
import Nav from "./Nav";
const Hero = () => {
  const containerHero = useRef(null);
  const leftPanel = useRef(null);
  useGSAP(
    () => {
      const tlH = gsap.timeline({
        defaults: { duration: 1, ease: "power1.inOut" },
      });
      let splitTitle = SplitText.create(".title", { type: "chars, words" });

      tlH
        .from(splitTitle.words, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.05,
        })
        .from(
          ".left-panel",
          {
            opacity: 0,
            duration: 1.1,
          },
          0
        )
        .from(
          ".right-panel",
          {
            opacity: 0,
            duration: 1.1,
          },
          0
        )
        .from(
          ".scroll-text",
          {
            opacity: 0,
            duration: 1.1,
          },
          0
        )
        .from(".scroll-img", {
          opacity: 0,
          duration: 0.5,
          y: -7,
          ease: "power2",
          yoyo: true,
          repeat: -1,
        });
    },
    { scope: containerHero }
  );

  return (
    <header>
      <div className="container bg-amber- h-dvh">
        <Nav />
        <div ref={containerHero} className="hero-section">
          <div className="hero-panels flex flex-wrap justify-between">
            <div ref={leftPanel} className="left-panel">
              <div className="size-full   overflow-hidden w-3xs h-[370px] border-[3px] border-black rounded-[25px] rounded-bl-[250px] transition-all duration-500 ease-in-out hover:rounded-bl-[25px]">
                <div className="flex ml-2 mt-7">
                  <img src="/images/me.png" alt="" />
                  <div>
                    <p>Hi, I'm</p>
                    <h3 className="text-4xl font-bold">Justin</h3>
                  </div>
                </div>
                <div className="px-5 flex flex-col">
                  <p className="px-2 text-[14px]">
                    I am a high school student who caught on to programming and
                    designing web applications from an early age.
                  </p>
                  <button className="button bg-primary border-[3px] border-primary text-white mt-10 mb-2.5 hover:bg-white hover:text-primary">
                    <a href="">My Projects</a>
                  </button>
                  <button className="button border-[3px] border-black text-black hover:bg-black hover:text-white">
                    <a href="https://github.com/DevDesignJustin">My Github</a>
                  </button>
                </div>
              </div>
            </div>
            <div className="right-panel">
              <div className="size-full overflow-hidden w-[880px] h-[370px] border-[3px] border-black rounded-tr-[250px] rounded-[25px] transition-all duration-500 ease-in-out hover:rounded-tr-[25px]">
                <div className="size-full flex p-5">
                  <div className="text flex flex-col w-64 h-full">
                    <h6 className="text-[20px]">Amazon Redesign:</h6>
                    <h3 className="text-[40px]/12 font-bold">Habitual</h3>
                    <p className="text-[14px] font-bold text-blue-700 ">
                      UI & UX
                    </p>
                    <h4 className="font-bold mt-auto">Featured Design</h4>
                  </div>
                  <div className="panel-content ml-10 w-full">
                    <div className="mockups flex relative bottom-[-100px]">
                      <img
                        className=""
                        src="/images/mockups/habitual-1.png"
                        alt=""
                      />
                      <img
                        className="absolute bottom-[-60px] left-[150px]"
                        src="/images/mockups/habitual-2.png"
                        alt=""
                      />
                      <div className="bg-pink-300 blur-3xl w-[300px] h-[250px] rounded-full absolute left-[-50px] -z-10"></div>
                      <div className="bg-pink-300 blur-3xl w-[200px] h-[150px] rounded-full absolute left-[150px] bottom-[30px] -z-10"></div>
                    </div>
                  </div>
                  <button className="button border-[3px] border-primary text-primary w-[240px] mt-auto hover:bg-primary hover:text-white">
                    <a href="">Check it out</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom flex justify-between">
            <h1 className="title text-9xl font-bold mt-6">
              web developer & <br /> designer
            </h1>
            <div className="hero-scroll items-end flex">
              <h5 className="scroll-text">SCROLL DOWN</h5>
              <img
                src="images/icons/arrow-down.svg"
                alt=""
                className="scroll-img"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
