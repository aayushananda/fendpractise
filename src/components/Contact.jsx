import React, { useRef, useEffect, useState } from 'react'
import Orb from './Orb'
import { gsap } from 'gsap'

const Contact = () => {
  const contactTextRef = useRef(null);
  const formContainerRef = useRef(null);
  const inputRefs = useRef([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

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
        {/* Orb container - fixed size in center */}
        <div className="w-[600px] h-[600px] relative flex items-center justify-center">
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
              className={`absolute z-10 flex flex-col items-center justify-center cursor-pointer ${showForm && !isClicked ? 'pointer-events-none' : ''}`}
              onClick={handleContactClick}
            >
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-normal">
                Contact Us
              </h2>
            </div>
          </div>
        </div>
        
        {/* Contact Form Container that slides in - full height and width of parent */}
        <div 
          ref={formContainerRef}
          className={`absolute top-0 left-0 w-full h-[800px] bg-[#fffce1] z-20 flex flex-col ${showForm ? 'block' : 'hidden'}`}
        >
          {/* Close button (X icon) */}
          <button 
            onClick={handleCloseForm}
            className="absolute top-8 left-8 z-30 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-[#33302A]/10 text-[#33302A] hover:bg-[#33302A]/20 transition-colors"
            aria-label="Close form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18"></path>
              <path d="M6 6L18 18"></path>
            </svg>
          </button>
          
          {/* Form content with two columns - 3D element left, form right */}
          <div className="flex flex-col md:flex-row w-full h-full py-16 px-8 md:px-16">
            {/* Left column for 3D element */}
            <div className="w-full md:w-1/2 h-64 md:h-full flex items-center justify-center p-4 md:pr-12 animate-in">
              <div className="w-full h-full bg-[#33302A]/5 rounded-3xl flex flex-col items-center justify-center p-8">
                {/* Visual element or illustration */}
                <div className="w-24 h-24 rounded-full bg-[#F5B082] mb-6 animate-in"></div>
                <h3 className="text-[#33302A] text-2xl font-bold mb-4 animate-in">Let's Connect</h3>
                <p className="text-[#33302A]/70 text-center leading-relaxed animate-in">
                  Ready to bring your vision to life? We're just a message away from creating something extraordinary together.
                </p>
              </div>
            </div>
            
            {/* Right column for form */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-4 md:pl-12">
              <h3 className="text-3xl md:text-4xl font-bold text-[#33302A] mb-3 animate-in">Get In Touch</h3>
              <p className="text-[#33302A]/70 mb-10 animate-in">We're excited to hear from you and bring your ideas to reality.</p>
              
              <form className="flex flex-col gap-8">
                <div className="form-group relative animate-in">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    ref={el => inputRefs.current[0] = el}
                    className="peer w-full p-4 bg-transparent border-b-2 border-[#33302A]/30 focus:border-[#33302A] focus:outline-none transition-colors"
                    placeholder=" "
                    onFocus={() => handleInputFocus(0)}
                    onBlur={handleInputBlur}
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute left-0 -top-2 text-sm transition-all duration-300 ${focusedInput === 0 ? 'text-[#33302A]' : 'text-[#33302A]/70'}`}
                  >
                    Name
                  </label>
                </div>
                
                <div className="form-group relative animate-in">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    ref={el => inputRefs.current[1] = el}
                    className="peer w-full p-4 bg-transparent border-b-2 border-[#33302A]/30 focus:border-[#33302A] focus:outline-none transition-colors"
                    placeholder=" "
                    onFocus={() => handleInputFocus(1)}
                    onBlur={handleInputBlur}
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-0 -top-2 text-sm transition-all duration-300 ${focusedInput === 1 ? 'text-[#33302A]' : 'text-[#33302A]/70'}`}
                  >
                    Email
                  </label>
                </div>
                
                <div className="form-group relative animate-in">
                  <textarea 
                    id="message" 
                    name="message"
                    rows="4"
                    ref={el => inputRefs.current[2] = el}
                    className="peer w-full p-4 bg-transparent border-b-2 border-[#33302A]/30 focus:border-[#33302A] focus:outline-none transition-colors resize-none"
                    placeholder=" "
                    onFocus={() => handleInputFocus(2)}
                    onBlur={handleInputBlur}
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className={`absolute left-0 -top-2 text-sm transition-all duration-300 ${focusedInput === 2 ? 'text-[#33302A]' : 'text-[#33302A]/70'}`}
                  >
                    Message
                  </label>
                </div>
                
                <div className="form-group flex justify-end mt-4 animate-in">
                  <button 
                    type="submit"
                    className="py-4 px-8 bg-[#33302A] text-[#fffce1] rounded-lg font-medium hover:bg-[#1A1814] transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
                    <span className="absolute inset-0 bg-[#F5B082] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
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