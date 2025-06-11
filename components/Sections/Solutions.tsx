"use client";
import React, { useState } from 'react'
import { BlackGuy, CustomerIcon, ExecutionIcon, Graph, MarketIcon, ProductIcon, StrategyIcon } from '../Icons'
import Image from 'next/image'

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
    <div id="Solutions-section" className="w-full items-center justify-center ">
      <h1 className="xl:text-[48px] lg:text-[38px] md:[28px] text-[20px] font-bold md:leading-[50px] leading-[24px] md:tracking-[-2px] tracking-[-1px] text-[#060B13] md:w-[696px] w-[300px] text-center justify-center items-center mx-auto">
        Driving <span className="text-[#A10E2B]">Revenue</span> Through
        Data-Led, Results-Driven Action
      </h1>

      <div className="flex md:flex-row flex-col justify-center items-start mt-[50px] ">
        {/* Left side - Image */}
        <div className="relative">
          <Image
            src={BlackGuy}
            alt="blk guy"
            className="md:h-[514px] md:w-auto md:pl-0 pl-5 md:object-contain object-cover"
          />
          <div className="absolute 2xl:bottom-0 2xl:-right-[14%] xl:bottom-0 xl:-right-[5%] ">
            <Image
              src={Graph}
              alt="Graph"
              className="h-[120px] object-contain hidden sm:block md:block"
            />
          </div>
        </div>

        {/* Right side - Interactive Content */}
        <div className="flex flex-col md:space-y-7 space-y-5 md:max-w-[550px] max-w-[370px] mx-auto md:mt-0  mt-10"> 
          {Contents.map((content, index) => (
            <div
              key={index}
              className={`border border-[#E9E8EA] rounded-[14px] cursor-pointer transition-all duration-500 ${
                activeIndex === index
                  ? "bg-white shadow-lg"
                  : "bg-transparent hover:bg-white"
              }`}
              onClick={() => handleItemClick(index)}
            >
              {/* Title Section - Always Visible */}
              <div className="flex flex-row items-center px-[18px] py-[13px] space-x-4">
                <Image
                  src={content.logo}
                  alt="Icon"
                  className="w-[24px] h-[25px] flex-shrink-0"
                />
                <h1 className="text-[#000000] md:text-[18px] text-[14px] md:leading-[30px] font-semibold">
                  {content.title}
                </h1>
              </div>

              {/* Description Section - Only visible when active */}
              {activeIndex === index && (
                <div className=" pb-4 pt-0 animate-in slide-in-from-top-2 duration-700">
                  <p className="text-[#727272] text-[12px] leading-[12px] ml-4 md:w-[454px] ">
                    {content.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Solutions