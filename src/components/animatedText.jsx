import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const BigTextSection = () => {
  const pinRef = useRef(null); // Ref for the pinned section
  const textRef = useRef(null); // Ref for the big text
  const imageRef = useRef(null); // Ref for the image

  useGSAP(() => {
    // ScrollTrigger animation for the text
    gsap.fromTo(
      textRef.current,
      { x: '100%' }, // Start off-screen to the right
      {
        x: '-100%', // Slide to off-screen to the left
        duration: 10, // Duration of the sliding effect
        ease: 'linear', // Linear easing for constant speed
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top', // Pin when the top of the section hits the top of the viewport
          end: '+=2000', // Adjust the end based on how long you want the section to be pinned
          pin: true, // Enable pinning
          scrub: 1, // Smooth scrubbing (1 second)
        },
      }
    );

    // ScrollTrigger animation for the image
    gsap.fromTo(
      imageRef.current,
      { x: '-100%' }, // Start off-screen to the left
      {
        x: '100%', // Slide to off-screen to the right
        duration: 10, // Match the duration with the text
        ease: 'linear', // Linear easing for constant speed
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top ', // Pin when the top of the section hits the top of the viewport
          end: '+=2000', // Same as text
          scrub: 1, // Smooth scrubbing
        },
      }
    );
  });

  return (
    <div ref={pinRef} className="max-sm:hidden h-screen flex items-center justify-center relative overflow-x-hidden">
      <img
        ref={imageRef}
        src={"/gelato3d.png"}
        alt="Crossing"
        className="absolute h-[900px] " // Adjust height and positioning as needed
        style={{ left: '0', top: '50%', transform: 'translateY(-50%)' }} // Center the image vertically
      />
      <div ref={textRef} className="whitespace-nowrap font-bold text-[250px] text-pink-800">
        Best Gelato You Have Ever Seen!
      </div>
    </div>
  );
};

export default BigTextSection;
