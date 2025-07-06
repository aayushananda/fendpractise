import React, { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import Orb from './Orb'
import { gsap } from 'gsap'

// Cash pile model component
function CashPileModel(props) {
  // Use correct path to the model file
  const { scene } = useGLTF('/scene/public/scene.gltf')
  
  useEffect(() => {
    // Make sure the model is visible by adjusting material properties if needed
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = false
      }
    })
  }, [scene])
  
  return (
    <primitive 
      object={scene} 
      scale={4.5} 
      rotation={[0, Math.PI / 4, 0]} 
      position={[0, 0, 0]}
      {...props}
    />
  )
}

// Preload the model
useGLTF.preload('/scene/public/scene.gltf')

const Contact = () => {
  const contactTextRef = useRef(null);
  const formContainerRef = useRef(null);
  const inputRefs = useRef([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    if (contactTextRef.current) {
      // Animate the contact text similar to the Hero component
      gsap.fromTo(contactTextRef.current,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5, 
          ease: 'elastic.out(1, 0.3)',
          delay: 0.5 
        }
      );
    }

    // Initialize the form container position off-screen
    if (formContainerRef.current) {
      gsap.set(formContainerRef.current, { x: '100%' });
    }

    // Attempt to preload the 3D model
    const preloadModel = async () => {
      try {
        await useGLTF.preload('/scene/public/scene.gltf');
        setModelLoaded(true);
      } catch (err) {
        console.error("Error preloading model:", err);
      }
    };
    
    preloadModel();
  }, []);

  useEffect(() => {
    // Animation for form elements when the form becomes visible
    if (showForm && formContainerRef.current) {
      const formElements = formContainerRef.current.querySelectorAll('.animate-in');
      gsap.fromTo(formElements, 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: 'power2.out',
          delay: 0.4
        }
      );
    }
  }, [showForm]);

  const handleContactClick = () => {
    setIsClicked(true);
    
    // Show the form immediately so it's in the DOM
    setShowForm(true);
    
    // Use a small timeout to ensure the form is in the DOM before animating
    setTimeout(() => {
      // Animate the text when clicked
      gsap.to(contactTextRef.current, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });

      // Slide in the form from right to left
      if (formContainerRef.current) {
        gsap.to(formContainerRef.current, { 
          x: '0%', 
          duration: 0.8, 
          ease: 'power3.out'
        });
      }
      
      // Reset click state after animation
      setTimeout(() => setIsClicked(false), 500);
    }, 10);
  };

  const handleCloseForm = () => {
    // Slide out the form from left to right
    if (formContainerRef.current) {
      gsap.to(formContainerRef.current, {
        x: '100%',
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          setShowForm(false);
          setFocusedInput(null); // Reset focused input
        }
      });
    }
  };

  const handleInputFocus = (index) => {
    setFocusedInput(index);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  return (
    <>
      <div className="w-full h-[800px] relative flex items-center justify-center overflow-hidden">
        {/* Orb container - fixed size in center - Now entirely clickable */}
        <div 
          className="w-[600px] h-[600px] relative flex items-center justify-center cursor-pointer"
          onClick={handleContactClick}
        >
          {/* Orb component as background */}
          <div className="w-full h-full absolute flex items-center justify-center">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={isClicked}
            />
            
            {/* Text overlay positioned in the center of the Orb */}
            <div 
              ref={contactTextRef}
              className={`absolute z-10 flex flex-col items-center justify-center ${showForm && !isClicked ? 'pointer-events-none' : ''}`}
            >
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide">
                Contact Us
              </h2>
            </div>
          </div>
        </div>
        
        {/* Contact Form Container that slides in - full height and width of parent */}
        <div 
          ref={formContainerRef}
          className={`absolute top-0 left-0 w-full h-[800px] bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 z-20 flex flex-col ${showForm ? 'block' : 'hidden'}`}
        >
          {/* Subtle grid background pattern with dollar bill aesthetic */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-200/40 via-emerald-200/20 to-green-300/30"></div>
          </div>

          {/* Close button (X icon) */}
          <button 
            onClick={handleCloseForm}
            className="absolute top-10 right-8 z-40 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-green-800/10 text-green-800 hover:bg-green-800/20 hover:text-green-900 transition-all duration-300"
            aria-label="Close form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18"></path>
              <path d="M6 6L18 18"></path>
            </svg>
          </button>
          
          {/* Form content with two columns - 3D element left, form right */}
          <div className="flex flex-col md:flex-row w-full h-full py-12 px-8 md:px-16 relative z-10">
            {/* Left column for 3D element */}
            <div className="w-full md:w-1/2 h-64 md:h-full flex items-center justify-center p-4 md:pr-12 animate-in relative">
              {/* 3D model container with highest z-index */}
              <div className="w-full h-3/4 absolute z-30" style={{ minHeight: '300px', overflow: 'visible' }}>
                <Canvas
                  shadows
                  camera={{ position: [0, 2, 5], fov: 50 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* Increased brightness with higher intensity lights */}
                  <ambientLight intensity={0.8} />
                  <directionalLight 
                    position={[10, 10, 10]}
                    intensity={1.5}
                    castShadow
                  />
                  <directionalLight 
                    position={[-5, 5, -5]}
                    intensity={0.8}
                  />
                  <Suspense fallback={null}>
                    <CashPileModel />
                  </Suspense>
                  {/* Auto-rotate but disabled user controls */}
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    enableRotate={false}
                    autoRotate 
                    autoRotateSpeed={2} 
                  />
                </Canvas>
              </div>
              
              {/* Container with lower z-index */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8 z-20 pointer-events-none relative">
                {/* Placeholder for the 3D model space */}
                <div className="w-full h-3/4 relative"></div>
                
                {/* Heading text now positioned with absolute positioning to appear below the 3D model */}
                <div className="animate-in mt-6 absolute bottom-8">
                  <h3 className="text-green-800 text-2xl md:text-3xl font-light text-center leading-tight tracking-wide">
                    Maximize Your Profits &<br />
                    <span className="text-green-600 font-medium">Turn Ideas into Revenue</span>
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Right column for form */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-4 md:pl-12 z-20">
              <h3 className="text-3xl md:text-4xl font-light text-green-800 mb-3 animate-in tracking-wide">Get In Touch</h3>
              <p className="text-green-700 text-lg mb-10 animate-in">We're excited to hear from you and bring your ideas to reality.</p>
              
              <form className="flex flex-col gap-8">
                <div className="form-group relative animate-in">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    ref={el => inputRefs.current[0] = el}
                    className="peer w-full p-4 bg-white/60 border border-green-300 rounded-lg focus:border-green-500 focus:bg-white/80 focus:outline-none transition-all duration-300 text-green-800 placeholder-green-600 backdrop-blur-sm"
                    placeholder="Your Name"
                    onFocus={() => handleInputFocus(0)}
                    onBlur={handleInputBlur}
                  />
                  <div className={`absolute inset-0 rounded-lg border-2 border-transparent ${focusedInput === 0 ? 'border-green-400' : ''} pointer-events-none transition-all duration-300`}></div>
                </div>
                
                <div className="form-group relative animate-in">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    ref={el => inputRefs.current[1] = el}
                    className="peer w-full p-4 bg-white/60 border border-green-300 rounded-lg focus:border-green-500 focus:bg-white/80 focus:outline-none transition-all duration-300 text-green-800 placeholder-green-600 backdrop-blur-sm"
                    placeholder="Your Email"
                    onFocus={() => handleInputFocus(1)}
                    onBlur={handleInputBlur}
                  />
                  <div className={`absolute inset-0 rounded-lg border-2 border-transparent ${focusedInput === 1 ? 'border-green-400' : ''} pointer-events-none transition-all duration-300`}></div>
                </div>
                
                <div className="form-group relative animate-in">
                  <textarea 
                    id="message" 
                    name="message"
                    rows="4"
                    ref={el => inputRefs.current[2] = el}
                    className="peer w-full p-4 bg-white/60 border border-green-300 rounded-lg focus:border-green-500 focus:bg-white/80 focus:outline-none transition-all duration-300 resize-none text-green-800 placeholder-green-600 backdrop-blur-sm"
                    placeholder="Your Message"
                    onFocus={() => handleInputFocus(2)}
                    onBlur={handleInputBlur}
                  ></textarea>
                  <div className={`absolute inset-0 rounded-lg border-2 border-transparent ${focusedInput === 2 ? 'border-green-400' : ''} pointer-events-none transition-all duration-300`}></div>
                </div>
                
                <div className="form-group flex justify-end mt-4 animate-in">
                  <button 
                    type="submit"
                    className="py-4 px-8 bg-green-800 text-white border border-green-700 rounded-lg font-medium hover:bg-green-700 hover:border-green-600 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;