import Lottie from "lottie-react";
import hero from "../animations/home.json";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../UserContext";
import { useGSAP } from "@gsap/react"; // Importing the useGSAP hook from @gsap/react
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import mouse from '../animations/mouse.json';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const email = userInfo?.email;
  const main = useRef(null);
  const headTxt = useRef(null);
  const subTxt = useRef(null);
  const btn = useRef(null);

  // Using useGSAP for global animations
  useGSAP(() => {
    // Main container animation
    gsap.from(main.current, {
      opacity: 0,
      x: -500,
      duration: 1,
      scrollTrigger: {
        trigger: main.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Header text animation
    gsap.from(headTxt.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: headTxt.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Subtext animation
    gsap.from(subTxt.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: subTxt.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Button animation
    gsap.from(btn.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      scrollTrigger: {
        trigger: btn.current,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <>
    <div className="flex flex-col md:flex-row items-center justify-center w-full py-10 px-10 mt-20">
      {/* Image Section */}
      <div className="w-[45%] max-md:w-full mb-6 md:mb-0" ref={main}>
        <Lottie animationData={hero} loop={true} />
      </div>

      {/* Text Section */}
      <div className="w-[40%] md:pl-8 max-md:w-full">
        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold mb-4" ref={headTxt}>
          Find your best flavour <Link to="/login" className="text-pink-500 underline">now</Link>
        </h1>
        <p className="mb-6" ref={subTxt}>
          Best gelato for best your
        </p>

        {/* Button */}
        {!email ? (
          <Link to="/login" className="relative inline-block text-lg group" ref={btn}>
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative">Get Started</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
          </Link>
        ) : (
          <Link to="/foods" className="relative inline-block text-lg group" ref={btn}>
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative">Explore Foods</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
          </Link>
        )}
      </div>
    </div>
      <div className='flex gap-2 items-center justify-center'>
            <Lottie animationData={mouse} loop={true} className='w-16 pt-4'/>
            <p className='text-2xl font-bold text-orange-500 text-center mt-10 mb-6'>Scroll down</p>
        </div>
    </>
  );
};

export default HeroSection;
