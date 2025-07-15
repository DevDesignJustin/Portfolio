import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
gsap.registerPlugin(SplitText);

const Nav = () => {
  const container = useRef(0);

  useGSAP(() => {
    let splitLogo = SplitText.create(".logo-text", { type: "chars" });
    gsap.from(splitLogo.chars, {
      x: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: "power1.inOut",
    });
    window.addEventListener("DOMContentLoaded", {});
    gsap.from(".nav-list", {
      opacity: 0,
      //   width: 60,
      y: -200,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }, { scope: container });
  return (
    <nav className="flex w-full mt-14" ref={container}>
      <div className="logo flex  items-center">
        <img className="size-4" src="/images/logo.svg" alt="" />{" "}
        <h6 className="logo-text text-2xl ml-0.5">ustin</h6>
      </div>
      <div className="nav-container w-[calc(100%-63px)] justify-center flex">
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
          <li className="nav-item">
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
