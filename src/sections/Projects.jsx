import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import Card from "../components/Card";
const Projects = () => {
  useGSAP(() => {
 
  });
  return (
    <section className="projects py-[120px] bg-white ">
      <div className="container  " id="smooth-wrapper">
        <div
          className="projects-grid grid md:grid-cols-2 grid-cols-1 justify-between"
          id="smooth-content"
        >
          <div className="projects-left grid">
            <div className="projects-intro pb-15 row">
              <h2 className="subtitle">Projects</h2>
              <p className="text-[18px] w-[321px] text-height-[1px]">
                Here are some of my biggest designs and websites I’ve created.
              </p>
            </div>
            <div className="">
              <Card
                message="React • Tailwind CSS • GSAP"
                title="GTA VI Landing Page Clone"
                image="GTA-VI"
                link=""
              />
            </div>
          </div>
          <div className="projects-right grid">
            <div className="">
              <Card
                message="UI & UX • Figma"
                title="Amazon Redesign: Habitual"
                image="habitual"
                link=""
              />
            </div>
          </div>
        </div>
        {/* <div className="line h-[1.5px] bg-black mt-10"></div> */}
      </div>
    </section>
  );
};

export default Projects;
