import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MetaBalls from './MetaBalls';
import ScrambledText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Additional animation for when the text is scrolled out of view
    // const text = textRef.current;
    
    // if (!text) return;
    
    // gsap.to(text, {
    //   xPercent: -100,
    //   opacity: 0,
    //   ease: "power2.in",
    //   scrollTrigger: {
    //     trigger: text,
    //     start: "top top-=20%",
    //     end: "top top-=50%",
    //     scrub: true,
    //   }
    // });
    
    return () => {
      // Clean up ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen w-full relative flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Content container with absolute positioning for perfect centering */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-center items-center z-10"
      >
        {/* Agency description content with ScrambleText effect in two separate lines */}
        <div className="flex flex-col justify-center items-center gap-4 md:gap-6 px-6">
          <ScrambledText
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
            className="text-center text-xl md:text-4xl lg:text-4xl font-light text-white/90 whitespace-nowrap tracking-wide"
          >
            <p className="mb-2">We are an Independent digital agency</p>
            <p className="text-lg md:text-3xl lg:text-3xl font-medium text-white/80">Passionate about modern age technologies</p>
          </ScrambledText>
        </div>
      </div>

      {/* Left MetaBalls */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] z-0 pointer-events-none">
        <MetaBalls
          color="#ffffff"
          cursorBallColor="#ffffff"
          cursorBallSize={1.5}
          ballCount={10}
          animationSize={18}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={0.8}
          speed={0.15}
        />
      </div>

      {/* Right MetaBalls */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] z-0 pointer-events-none">
        <MetaBalls
          color="#ffffff"
          cursorBallColor="#ffffff"
          cursorBallSize={1.5}
          ballCount={10}
          animationSize={18}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={0.8}
          speed={0.15}
        />
      </div>
    </section>
  );
};

export default About;