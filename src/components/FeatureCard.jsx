import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react'; // Import useGSAP from @gsap/react
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

const FeatureCard = ({ image, title, description, link }) => {

  return (
    <Link
      to={link}
      className="w-[300px] h-[300px]  rounded-full overflow-hidden shadow-xl shadow-gray-500 hover:shadow-2xl transition-all hover:shadow-gray-500 transition-all duration-300"
    >
      <img className="w-full h-2/4 object-cover" src={image} alt={`${title} image`} />
      <div className="px-6 py-4 flex flex-col items-center justify-center">
        <h1 className="font-bold text-xl mb-2 underline text-orange-400">{title}</h1>
        <p className="text-gray-700 text-base text-center">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default FeatureCard;
