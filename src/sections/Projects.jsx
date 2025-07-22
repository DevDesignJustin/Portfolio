import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Card from "../components/Card";
import { useRef } from "react";

const Projects = () => {
  const projectsRef = useRef(null);
  useGSAP(() => {
    const projectArr = gsap.utils.toArray(".card");
    projectArr.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power1.out",
      });
    });
  });
  return (
    <section
      className="projects py-[120px] bg-white"
      id="projects"
      ref={projectsRef}
    >
      <div className="container" id="smooth-wrapper">
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
            <div className="card">
              <Card
                message="React • Tailwind CSS • GSAP"
                title="GTA VI Landing Page Clone"
                image="GTA-VI"
                link="https://gtavi.kjustin.me"
              />
            </div>
          </div>
          <div className="projects-right grid">
            <div className="card">
              <Card
                message="UI & UX • Figma"
                title="Amazon Redesign: Habitual"
                image="habitual"
                link="https://www.figma.com/community/file/1237947468175384783/amazon-redesign-devdesignjustin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
