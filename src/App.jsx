import React, { useRef } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Info from './components/Info'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SplashCursor from './components/SplashCursor'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const heroRef = useRef(null);
  const footerRef = useRef(null);
  
  return (
    <>
      <div ref={heroRef} className="splash-section">
        <Hero/>
      </div>
      <About/>
      <Info/>
      <Contact/>
      <div ref={footerRef} className="splash-section">
        <Footer/>
      </div>
      <SplashCursor targetRefs={[heroRef, footerRef]} />
    </>
  )
}

export default App