"use client";
import React, { useState } from 'react'
import { BlackGuy, CustomerIcon, ExecutionIcon, Graph, MarketIcon, ProductIcon, StrategyIcon } from '../Icons'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';

const Solutions = () => {
  const [activeIndex, setActiveIndex] = useState(0) 

  const Contents = [
    {
      logo: MarketIcon,
      title: "Market Potential Assessment",
      description: "Unlock where to play. We deep-dive into customer behavior, competitive dynamics, and white spaces to spotlight your most promising growth opportunities."
    },
    {
      logo: ProductIcon,
      title: "Product & Service Optimization",
      description: "Adapt to win. We fine-tune your offerings to meet the needs of each market, ensuring relevance, impact, and differentiation."
    },
    {
      logo: StrategyIcon,
      title: "Go-to-Market Strategy Development",
      description: "Enter new markets with confidence. From channel selection to campaign planning, we build data-backed GTM strategies that convert."
    },
    {
      logo: CustomerIcon,
      title: "Customer Acquisition & Retention",
      description: "We help you grow faster—attracting new customers through precision marketing and keeping them loyal with personalized engagement and loyalty programs. It's top-line impact, powered by insight."
    },
    {
      logo: ExecutionIcon,
      title: "Execution & Rollout Support",
      description: "We don't just strategize—we execute. Our team works with yours to deliver seamless implementation and measurable outcomes, start to finish."
    },
  ]

  const handleItemClick = (index: React.SetStateAction<number>) => {
    setActiveIndex(index)
  }

  return (
    <div id="Solutions-section" className="w-full py-10 px-4  max-w-7xl mx-auto">
      <h1 className="xl:text-[48px] lg:text-[38px] md:[28px] text-[20px] font-bold md:leading-[50px] leading-[24px] md:tracking-[-2px] tracking-[-1px] text-[#060B13] md:w-[696px] w-[300px] text-center justify-center items-center mx-auto">
        Driving <span className="text-[#A10E2B]">Revenue</span> Through
        Data-Led, Results-Driven Action
      </h1>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12 xl:gap-16 mt-[50px]">
        {/* Left side - Image */}
        <div className="w-full lg:w-auto flex justify-center lg:block relative">
          <div className="relative">
            <Image
              src={BlackGuy}
              alt="blk guy"
              width={500}
              height={600}
              className="w-full max-w-md lg:max-w-none h-auto lg:h-[514px] object-contain"
            />
            <div className="absolute bottom-0 right-5">
              <Image
                src={Graph}
                alt="Graph"
                width={150}
                height={120}
                className="h-20 sm:h-24 lg:h-28 object-contain hidden sm:block"
              />
            </div>
          </div>
        </div>

        {/* Right side - Interactive Content */}
        <div className="w-full lg:w-auto flex-1 max-w-lg lg:max-w-md xl:max-w-md mx-auto lg:mx-0 "> 
          {Contents.map((content, index) => (
            <div
              key={index}
              className={`border border-[#E9E8EA] rounded-xl cursor-pointer transition-all duration-500 mb-4 last:mb-0  ${
                activeIndex === index
                  ? "bg-white shadow-lg"
                  : "bg-transparent hover:bg-white"
              }`}
              onClick={() => handleItemClick(index)}
            >
              {/* Title Section - Always Visible */}
              <div className="flex items-center p-3 sm:p-4 space-x-3">
                <Image
                  src={content.logo}
                  alt="Icon"
                  width={24}
                  height={25}
                  className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6"
                />
                <h1 className="text-sm sm:text-base md:text-lg font-semibold text-[#000000]">
                  {content.title}
                </h1>
              </div>

              {/* Description Section - Only visible when active */}
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-[12px] text-[#727272] p-3 sm:p-4 pt-0 sm:pt-0">
                      {content.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Solutions