'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Image {
  public_id: string;
  secure_url: string;
  _id: string;
}

const Slider = ({ images }: { images: Image[] }) => {
  // console.log(images);
  const [postionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % images.length
      );
      return updatedIndexes;
    });
  };

  const positions = ['center', 'left', 'right', 'right1'];

  const imageVariants = {
    center: { x: '0%', scale: 1, zIndex: 5 },
    left: { x: '-70%', scale: 0.8, zIndex: 3 },
    right: { x: '80%', scale: 0.5, zIndex: 1 },
    right1: { x: '50%', scale: 0.7, zIndex: 3 },
  };
  const smallVariants = {
    center: { x: '0%', display: 'block', opacity: 1, zIndex: 5 },
    left: { x: '-100%', display: 'none', opacity: 0, zIndex: 3 },
    right: { x: '80%', display: 'none', opacity: 0, zIndex: 1 },
    right1: { x: '100%', display: 'none', opacity: 0, zIndex: 3 },
  };

  return (
    <div className="h-[450px] lg:h-[350px] xl:h-[450px] pt-3 relative">
      <div className="hidden lg:flex w-full justify-center ms-6">
        {images.map((image, index) => (
          <motion.img
            key={image._id}
            className="rounded-[12px] object-cover"
            src={image.secure_url}
            initial="center"
            animate={positions[postionIndexes[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ width: '40%', position: 'absolute' }}
          />
        ))}
      </div>

      <div className="flex lg:hidden w-full justify-center h-full">
        {images.map((image, index) => (
          <motion.img
            key={image._id}
            className="rounded-[12px] object-cover"
            src={image.secure_url}
            initial="center"
            animate={positions[postionIndexes[index]]}
            variants={smallVariants}
            transition={{ duration: 0.8 }}
            style={{ width: '95%', position: 'absolute', height: '80%' }}
          />
        ))}
      </div>

      <Button
        className="rounded-full absolute bottom-1 right-5 shadow-md p-6"
        onClick={handleNext}
      >
        <Icon icon="maki:arrow" style={{ width: '20', height: '20' }} />
      </Button>
    </div>
  );
};

export default Slider;
