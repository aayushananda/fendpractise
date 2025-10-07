import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import StarBorder from './StarBorder'

const Hero = () => {
  const heroRef = useRef(null)
  const logoContainerRef = useRef(null)
  const evolveRef = useRef(null)
  const eightRef = useRef(null)
  const studioRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    // Initial state - invisible
    gsap.set([evolveRef.current, eightRef.current, studioRef.current, footerRef.current], { 
      opacity: 0 
    })
    
    // Logo container subtle scaling
    gsap.fromTo(logoContainerRef.current,
      { scale: 0.95 },
      { scale: 1, duration: 1.8, ease: 'elastic.out(1, 0.3)' }
    )
    
    // Animate elements in sequence
    tl.to(evolveRef.current, { 
      opacity: 1, 
      duration: 1.2,
      y: 0,
      ease: 'power2.out'
    })
    .to(eightRef.current, { 
      opacity: 1, 
      duration: 1.5,
      scale: 1,
      rotation: 360,
      ease: 'elastic.out(1, 0.3)'
    }, "-=0.7")
    .to(studioRef.current, { 
      opacity: 1, 
      duration: 1,
      y: 0,
      ease: 'power2.out'
    }, "-=0.5")
    .to(footerRef.current, { 
      opacity: 0.8, 
      duration: 0.8,
    }, "-=0.3")
  }, [])

  return (
    <div 
      ref={heroRef} 
      className="flex flex-col justify-center items-center w-full min-h-screen relative"
    >
      {/* Center content container */}
      <div 
        ref={logoContainerRef}
        className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <StarBorder
          color="#A584FF"
          speed="8s"
          thickness={2}
          className="transition-all duration-300 hover:scale-105"
        >
          <div className="py-16 px-20">
            {/* Logo Container */}
            <div className="flex items-center justify-center">
              {/* EVOLVE text */}
              <span 
                ref={evolveRef}
                className="text-white text-6xl sm:text-7xl lg:text-8xl font-bold tracking-normal"
                style={{ opacity: 0, transform: 'translateY(-20px)' }}
              >
                EV
                <span 
                  ref={eightRef}
                  className="inline-block text-[#A584FF]"
                  style={{ opacity: 0, transform: 'scale(0.5)' }}
                >
                  8
                </span>
                LVE
              </span>
            </div>
            
            {/* STUDIO text */}
            <div 
              ref={studioRef}
              className="text-white text-4xl sm:text-5xl tracking-[0.3em] text-center font-light mt-3"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              STUDIO
            </div>
          </div>
        </StarBorder>
      </div>
      
      {/* Footer text */}
      <div 
        ref={footerRef}
        className="absolute bottom-6 left-0 w-full text-center opacity-0 flex flex-col gap-0"
      >
        <p className="text-white/70 text-sm">Evolve8Studio 2025. All rights reserved.</p>
        <p className="text-white/70 text-sm">Evolve8Studio.com</p>
      </div>
    </div>
  )
}

export default Hero