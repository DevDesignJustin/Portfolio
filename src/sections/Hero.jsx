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

      gsap.set(".line", { width: 0 });
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
        })
        .to(
          ".line",
          {
            width: "100%",
            duration: 1.1,
          },
          0
        );
    },
    { scope: containerHero }
  );

  return (
    <header className="">
      <div className="container ">
        <Nav />
        <div
          ref={containerHero}
          className="hero-section flex md:flex-col xs:flex-row flex-col w-full h-full  "
        >
          <div className="hero-panels flex md:flex-wrap justify-between">
            <div ref={leftPanel} className="left-panel xs:w-3xs w-full">
              <div className="size-full   overflow-hidden  w-full xs:h-[370px] xs:pb-0 pb-5  border-[3px] border-black rounded-[25px] md:rounded-bl-[250px] rounded-bl-[25px] transition-all duration-500 ease-in-out hover:rounded-bl-[25px]">
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
                    <a href="#projects">My Projects</a>
                  </button>
                  <button className="button border-[3px] border-black text-black hover:bg-black hover:text-white">
                    <a
                      href="https://github.com/DevDesignJustin"
                      target="_blank"
                    >
                      My Github
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="right-panel w-[calc(100%-300px)] md:flex hidden">
              <div className="size-full overflow-hidden w-full h-[370px] border-[3px] border-black rounded-tr-[250px] rounded-[25px] transition-all duration-500 ease-in-out hover:rounded-tr-[25px]">
                <div className="size-full flex p-5">
                  <div className="text flex flex-col w-64 h-full">
                    <h6 className="mg:text-[20px] text-[19px] w-[153px]">
                      Amazon Redesign:
                    </h6>
                    <h3 className="mg:text-[40px] text-[36px]/12 font-bold">
                      Habitual
                    </h3>
                    <p className="mg:text-[14px] text-[12px] font-bold text-blue-700 ">
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
                        className="absolute bottom-[-60px] mg:flex hidden left-[150px]"
                        src="/images/mockups/habitual-2.png"
                        alt=""
                      />
                      <div className="bg-pink-300 blur-3xl mg:w-[300px] mg:h-[250px] w-[250px] h-[250px] rounded-full absolute mg:bottom-[0px]   bottom-[30px] left-[-50px] -z-10"></div>
                      <div className="mg:flex hidden bg-pink-300 blur-3xl w-[200px] h-[150px] rounded-full absolute left-[150px] bottom-[30px] -z-10"></div>
                    </div>
                  </div>
                  <button className="button border-[3px] border-primary text-primary w-[240px] mt-auto hover:bg-primary hover:text-white">
                    <a
                      href="https://www.figma.com/community/file/1237947468175384783/amazon-redesign-devdesignjustin"
                      target="_blank"
                    >
                      Check it out
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom flex md:flex-row flex-col w-full h-full justify-center md:justify-between md:ml-0 xs:ml-7 ml-0  mb-6">
            <h1 className="title lg:text-9xl mg:text-9xl md:text-6xl sd:text-8xl text-7xl font-bold md:mt-6 mt-0 ">
              web developer & <br /> designer
            </h1>
            <div className="hero-scroll items-end flex  flex-row md:mt-0 mt-6">
              <h5 className="scroll-text mg:text-[20px] md:text-[18px]   text-[16px] ">
                SCROLL DOWN
              </h5>
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
