import React from "react";
import Card from "../components/Card";
const Projects = () => {
  return (
    <section className="projects mt-[120px] ">
      <div className="container">
        <div className="projects-grid grid  grid-cols-2 gap-6">
          <div className="projects-intro pb-12">
            <h2 className="subtitle">Projects</h2>
            <p className="text-[18px] w-[321px] text-height-[1px]">
              Here are some of my biggest designs and websites I’ve created.
            </p>
          </div>
          <div className="row-span-3">
            <Card
              message="React • Tailwind CSS • GSAP"
              title="GTA VI Landing Page Clone"
              image="GTA-VI"
              link=""
            />
          </div>
          <div className="row-span-2">
            <Card
              message="UI & UX • Figma"
              title="Amazon Redesign: Habitual"
              image="habitual"
              link=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
