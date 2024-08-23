import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({ imageUrl, height, text }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <motion.div
      className="parallax-image relative"
      style={{
        height: `${height}px`,
        overflow: 'hidden',
      }}
    >
      <div className="parallax-text absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 text-white max-w-[700px]">{text}</div>
      <motion.img
        src={imageUrl}
        alt="Parallax Image"
        className="w-full h-full object-cover"
        style={{
          y, 
        }}
      />
    </motion.div>
  );
};

export default ParallaxImage;