import React, { useRef } from 'react';
import FeatureCard from './FeatureCard';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const features = [
  {
    image: '/tiramisu.jpg',
    title: 'Order Online',
    description: 'Stay home and order to your doorstep',
    link: '/foods'
  },
  {
    image: '/tiramisu.jpg',
    title: 'Come and enjoy',
    description: 'View the city\'s favorite gelato ',
    link: '/restaurants'
  },
  
];

const FeatureCards = () => {

  return (
    <div className="flex justify-center flex-wrap max-md:gap-10 md:gap-20">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          image={feature.image}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeatureCards;
