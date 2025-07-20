import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
gsap.registerPlugin(SplitText);

const Nav = () => {
  const container = useRef(0);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      let splitLogo = SplitText.create(".logo-text", { type: "chars" });
      tl.from(".logo-img", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power1.inOut",
      }).from(splitLogo.chars, {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power1.inOut",
      }, '-=0.8');
      gsap.from(".nav-list", {
        opacity: 0,
        y: -200,
        duration: 0.8,
        ease: "power1.inOut",
      });
    },
    { scope: container }
  );
  return (
    <nav
      className="flex flex-col items-center w-full my-8 sm:flex-row sm:items-baseline sm:my-14"
      ref={container}
    >
      <div className="logo flex items-center mb-2 sm:mb-0">
        <img className="size-4 logo-img" src="/images/logo.svg" alt="" />{" "}
        <h6 className="logo-text text-2xl ml-0.5">ustin</h6>
      </div>
      <div className="nav-container w-[calc(100%-58px)] justify-center flex sm:w-[calc(100%-63px)]">
        <ul className="nav-list flex h-[50px] w-[460px] justify-between items-center rounded-full bg-black">
          <li className="nav-item w-[41px] active ml-[4.5px]">
            <a href="">
              <img src="/images/icons/home.svg" alt="" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Projects
            </a>
          </li>
          <li className="nav-item mr-[4.5px]">
            <a className="nav-link" href="">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
