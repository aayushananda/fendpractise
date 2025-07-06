import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Info from './components/Info'
import Contact from './components/Contact'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
   <>
   <Hero/>
   <About/>
   <Info/>
   <Contact/>
   <About/>
   </>
  )
}

export default App