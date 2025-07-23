import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const About = () => {
  useGSAP(() => {
    
  });
  return (
    <section className="about xl:py-[120px] lg:py-[80px] mt-5 md:py-[60px] py-[50px] xl:rounded-t-[150px] lg:rounded-t-[100px] rounded-t-[50px] bg-[#efffee]">
      <div className="container text-[#67a73f]">
        <div className="about-intro xl:pb-15 lg:pb-10 md:pb-8 pb-6 row">
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
          <div className="about-item md:col-span-2 col-span-1 md:pl-8 md:pt-0 pt-8">
            <h4 className="about-topic">Sports</h4>
            <p className="about-text">
              I like to play a variety of different sports, and among them I
              enjoy skiing and table tennis the most. I also love
              skiing with family and friends, which is one of the best things
              ever, but we can’t ski all year round. :(
            </p>
          </div>
          <div className="about-item md:col-span-3 col-span-1 pt-8">
            <h4 className="about-topic">What I Do</h4>
            <p className="about-text">
              I create websites and applications using the latest technologies
              and frameworks. I also enjoy designing and creating user
              interfaces that are both visually appealing and easy to use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
