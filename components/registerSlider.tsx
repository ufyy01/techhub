'use client';
import SliderCards from './sliderCards';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const RegisterSlider = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(!show), 5000);
  }, [show, setShow]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className=""
          key="slide1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.6 }}
        >
          <SliderCards
            list={[
              'Easily browse a wide variety of co-working spaces based on your needs and location',
              'Add your favorite hubs to a personal folder for quick access anytime.',
              'Stay informed with exclusive offers, new spaces, and more!',
            ]}
            text="Create an Account!"
            url="https://lottie.host/ad41f4c6-ca96-45d1-9581-0a1bfaa192c8/PqMIVCP0at.lottie"
            color="#ff6b6b"
          />
        </motion.div>
      )}
      {!show && (
        <motion.div
          className=""
          key="slide2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.6 }}
        >
          <SliderCards
            list={[
              'User: Ideal for explorers! Browse through hubs, find the best spaces, and save your top picks in your favorites folder.',
              'Add your favorite hubs to a personal folder for quick access anytime.',
              'Manager: Perfect for hub owners! Create new hubs, claim existing ones, and showcase your co-working space to the community.',
            ]}
            text="Choose Your Role!"
            color="#ffd166"
            url="https://lottie.host/bff5bcb9-05f8-4907-8e8d-001f2b869537/JrY73KDM2i.json"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterSlider;
