import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const linkContainersRef = useRef([]);
  const socialLinksRef = useRef(null);
  
  useEffect(() => {
    if (footerRef.current) {
      // Animate footer elements
      gsap.fromTo(
        footerRef.current.querySelectorAll('.animate-in'),
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Setup hover animations for social links
      if (linksRef.current) {
        linksRef.current.forEach((link, index) => {
          if (!link || !linkContainersRef.current[index]) return;
          
          const container = linkContainersRef.current[index];
          const linkBg = link.querySelector('.link-bg');
          const linkGlow = link.querySelector('.link-glow');
          
          // Set initial states explicitly for proper reversing
          gsap.set(link, { 
            y: 0,
            scale: 1,
            color: 'rgba(255, 255, 255, 0.7)' // text-white/70
          });
          
          if (linkBg) {
            gsap.set(linkBg, { 
              opacity: 0,
              scale: 1
            });
          }
          
          if (linkGlow) {
            gsap.set(linkGlow, { 
              opacity: 0,
              scale: 1
            });
          }
          
          // Create sophisticated hover animation timeline for each link
          const tl = gsap.timeline({ paused: true });
          
          // Enhanced hover animations with better visual feedback - no underline
          tl.to(link, { 
            y: -4,
            scale: 1.02,
            color: '#ffffff',
            duration: 0.4,
            ease: 'power2.out'
          });
          
          if (linkBg) {
            tl.to(linkBg, {
              opacity: 1,
              scale: 1.02,
              duration: 0.4,
              ease: 'power2.out'
            }, '-=0.4');
          }
          
          if (linkGlow) {
            tl.to(linkGlow, {
              opacity: 0.6,
              scale: 1.1,
              duration: 0.4,
              ease: 'power2.out'
            }, '-=0.4');
          }

          // Mouse enter/leave events
          link.addEventListener('mouseenter', () => {
            tl.play();
          });
          
          link.addEventListener('mouseleave', () => {
            tl.reverse();
          });
        });
      }
    }
  }, []);

  return (
    <footer ref={footerRef} className="w-full py-24 px-8 md:px-16 lg:px-24 relative overflow-hidden bg-gradient-to-t from-black via-gray-900 to-transparent">
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto relative z-10">
        {/* Social Links with clean horizontal layout */}
        <div className="flex flex-col items-center justify-center mb-20">
          <div className="animate-in mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-white/90 text-center mb-4">
              Let's Connect
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
          </div>
          
          <div ref={socialLinksRef} className="social-links">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {/* Snapchat */}
              <div className="animate-in" ref={el => linkContainersRef.current[0] = el}>
                <a 
                  href="#" 
                  ref={el => linksRef.current[0] = el}
                  className="relative group text-lg md:text-xl font-medium text-white/70 inline-block py-3 px-2"
                >
                  <span className="link-glow absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 rounded-lg blur-sm -z-20"></span>
                  <span className="link-bg absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 rounded-lg -z-10 backdrop-blur-sm"></span>
                  <span className="relative z-10 px-4">Snapchat</span>
                </a>
              </div>
              
              {/* Dribbble */}
              <div className="animate-in" ref={el => linkContainersRef.current[1] = el}>
                <a 
                  href="#" 
                  ref={el => linksRef.current[1] = el}
                  className="relative group text-lg md:text-xl font-medium text-white/70 inline-block py-3 px-2"
                >
                  <span className="link-glow absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 opacity-0 rounded-lg blur-sm -z-20"></span>
                  <span className="link-bg absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 rounded-lg -z-10 backdrop-blur-sm"></span>
                  <span className="relative z-10 px-4">Dribbble</span>
                </a>
              </div>
              
              {/* Instagram */}
              <div className="animate-in" ref={el => linkContainersRef.current[2] = el}>
                <a 
                  href="#" 
                  ref={el => linksRef.current[2] = el}
                  className="relative group text-lg md:text-xl font-medium text-white/70 inline-block py-3 px-2"
                >
                  <span className="link-glow absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-500/20 opacity-0 rounded-lg blur-sm -z-20"></span>
                  <span className="link-bg absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 rounded-lg -z-10 backdrop-blur-sm"></span>
                  <span className="relative z-10 px-4">Instagram</span>
                </a>
              </div>
              
              {/* LinkedIn */}
              <div className="animate-in" ref={el => linkContainersRef.current[3] = el}>
                <a 
                  href="#" 
                  ref={el => linksRef.current[3] = el}
                  className="relative group text-lg md:text-xl font-medium text-white/70 inline-block py-3 px-2"
                >
                  <span className="link-glow absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 rounded-lg blur-sm -z-20"></span>
                  <span className="link-bg absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 rounded-lg -z-10 backdrop-blur-sm"></span>
                  <span className="relative z-10 px-4">LinkedIn</span>
                </a>
              </div>
              
              {/* Email */}
              <div className="animate-in" ref={el => linkContainersRef.current[4] = el}>
                <a 
                  href="mailto:info@evolve8studio.com"
                  ref={el => linksRef.current[4] = el}
                  className="relative group text-lg md:text-xl font-medium text-white/70 inline-block py-3 px-2"
                >
                  <span className="link-glow absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 rounded-lg blur-sm -z-20"></span>
                  <span className="link-bg absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 rounded-lg -z-10 backdrop-blur-sm"></span>
                  <span className="relative z-10 px-4">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16 animate-in"></div>
        
        {/* Bottom footer with company info and locations */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Company info - centered */}
          <div className="flex flex-col items-center lg:items-start animate-in">
            <div className="text-center lg:text-left">
              <p className="text-white/60 text-sm mb-2">© 2025 Evolve8Studio. All rights reserved.</p>
              <p className="text-white/60 text-sm mb-3">evolve8studio@gmail.com</p>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm underline decoration-white/30 hover:decoration-white">
                Careers
              </a>
            </div>
          </div>
          
          {/* Locations - horizontal layout */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 animate-in">
            {/* New York */}
            <div className="text-center md:text-left">
              <h3 className="text-white/90 text-base font-medium mb-2">Dubai</h3>
              <p className="text-white/60 text-sm">120 Broadway, Suite 1010</p>
              <p className="text-white/60 text-sm">New York, NY 10271</p>
            </div>
            
            {/* Los Angeles */}
            <div className="text-center md:text-left">
              <h3 className="text-white/90 text-base font-medium mb-2">Ahmedabad</h3>
              <p className="text-white/60 text-sm">8605 Santa Monica Blvd</p>
              <p className="text-white/60 text-sm">Los Angeles, CA 90069</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;