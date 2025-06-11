"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Bg, heroImage } from '../Icons';
import { AnimatePresence, motion } from 'framer-motion';

const Hero = () => {
  const texts = ['Growth', 'Impact', 'Scale', 'Performance', 'Acquisition', 'Reach', 'Value', 'Demand', 'Engagemnet', 'Strategy', 'Velocity', 'growth'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 1400); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div id='home-section' className="relative flex flex-row  justify-between items-center h-dvh w-full ">
      {/* Background Image - fills entire screen behind content */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src={Bg}
          alt="Background"
          fill
          className="object-cover h-full w-full"
          quality={100}
          priority
        />
      </div>

      {/* Content */}
      <div className="container mx-auto flex md:flex-row flex-col justify-between items-center px-4 z-10 xl:px-[80px] lg:px-[70px] md:px-[50px] px-[10px]">
        <div className='md:max-w-[457px] max-w-[357px] flex flex-col space-y-2'>
          <h1 className="xl:text-[54px] lg;text-[44px] md:text-[30px] text-[20px]  font-bold text-[#000000] md:leading-[56px] mt-10 relative">
            Accelerating Global Expansion Redefining{" "}
            <span className="inline-block overflow-hidden md:h-[40px] h-[20px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={texts[index]}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full xl:text-[54px] lg;text-[44px] md:text-[30px] text-[20px] font-bold text-[#A10E2B]  "
                >
                  {texts[index]}
                </motion.div>
              </AnimatePresence>
            </span>
          </h1>
          <p className='xl:text-[26px] lg:text-[22px] md:text-[18px] text-[12px] md:leading-[30px] text-[#000000] md:w-full w-55' >
            Marketing management consultancy that scales with you
          </p>
        </div>

        <div className="flex-1 flex justify-end md:mt-0 mt-10 ">
          <Image
            src={heroImage}
            alt="hero"
            className="w-full max-w-[600px]"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Hero