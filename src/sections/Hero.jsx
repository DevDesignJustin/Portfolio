import Nav from "./Nav";
const Hero = () => {
  return (
    <header>
      <div className="container bg-amber- h-dvh">
        <Nav />
        <div className="hero-section">
          <div className="hero-panels flex flex-wrap justify-between">
            <div className="left-panel w-3xs h-[370px] border-[3px] border-black rounded-bl-[250px] rounded-[25px] transition-all duration-800 ease-in-out hover:rounded-bl-[25px]">
              <div className="flex ml-2 mt-7">
                <img src="/images/me.png" alt="" />
                <div>
                  <p className="text-[16px]">Hi, I'm</p>
                  <h3 className="text-4xl font-bold">Justin</h3>
                </div>
              </div>
              <div className="px-[20px]">
                <p className="px-2 text-[14px]">
                  I am a high school student who caught on to programming and
                  designing web applications from an early age.
                </p>
                
              </div>
            </div>
            <div className="right-panel w-[880px] h-[370px] border-[3px] border-black rounded-tr-[250px] rounded-[25px] "></div>
          </div>
          <div className="hero-bottom flex justify-between">
            <h1 className="text-9xl font-bold mt-6">
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
