import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const About = () => {
  useGSAP(() => {
    
  });
  return (
    <section className="about py-[120px] rounded-t-[150px] bg-[#efffee]">
      <div className="container text-[#67a73f]">
        <div className="about-intro pb-15 row">
          <h2 className="subtitle">About Me</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-">
          <div className="about-item col-span-1 ">
            <h4 className="about-topic">Hobbies</h4>
            <p className="about-text">
              Besides programming and designing website, I enjoy playing video
              games, fishing, playing sports, trying new foods, video editing
              and spending time with friends and family.
            </p>
          </div>
          <div className="about-item col-span-2 pl-8">
            <h4 className="about-topic">Sports</h4>
            <p className="about-text">
              I like to play a variety of different sports, and among them I
              enjoy skiing and table tennis the most. I play table tennis on a
              international level, competing is places like Chile. I also love
              skiing with family and friends, which is one of the best things
              ever, but we can’t ski all year round. :(
            </p>
          </div>
          <div className="about-item col-span-3 pt-8">
            <h4 className="about-topic">What I Do</h4>
            <p className="about-text">
              I like to play a variety of different sports, and among them I
              enjoy skiing and table tennis the most. I play table tennis on a
              international level, competing is places like Chile. I also loveqa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
