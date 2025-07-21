import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const techStackRef = useRef(null);
  const techItems = [
    'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind CSS', 'JavaScript',
    'TypeScript', 'React', 'GSAP', 'Python', 'Node.js', 'Express.js',
    'MongoDB', 'Git', 'GitHub', 'Vite', 'VSCode', 'Figma'
  ];

  useEffect(() => {
    
    const techStack = techStackRef.current;
    const techItems = techStack.querySelectorAll('.tech-item');
    const containerWidth = techStack.scrollWidth / 2;
    
    // Create a timeline for the infinite scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: techStack,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5, // Smoother scrubbing
        onUpdate: (self) => {
          // Calculate progress for continuous loop with slower speed
          const progress = self.progress * 50; // Reduced from 100 to slow down
          const x = -progress * 0.5; // Reduced multiplier for slower movement
          gsap.set(techItems, { 
            x: x % containerWidth,
            ease: 'none' // Linear movement for smoother scrolling
          });
        },
      },
    });

    // Auto-scroll animation independent of scroll position
    const autoScroll = gsap.to(techItems, {
      x: `-=${containerWidth}`, // Move left by container width
      duration: 40, // Increased duration for slower movement
      ease: 'none',
      repeat: -1, // Infinite loop
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % containerWidth) // Seamless loop
      }
    });

    // Pause auto-scroll when hovering
    techStack.addEventListener('mouseenter', () => autoScroll.pause());
    techStack.addEventListener('mouseleave', () => autoScroll.play());

    // Clean up ScrollTrigger and event listeners on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
      autoScroll.kill();
      techStack.removeEventListener('mouseenter', () => {});
      techStack.removeEventListener('mouseleave', () => {});
    };
  }, []);

  return (
    <section className="tech-stack w-full h-[150px] bg-black mt-[125px] text-white overflow-hidden relative">
      <div 
        ref={techStackRef} 
        className="absolute top-[-12px] left-0 h-full flex items-center whitespace-nowrap will-change-transform"
      >
        {[...techItems, ...techItems].map((tech, index) => (
          <div 
            key={`${tech}-${index}`} 
            className="tech-item inline-block text-6xl md:text-8xl px-8 "
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
