import React from 'react'
import { AirLinesImage, AirLinesLogo, FinanceImage, FinanceLogo, HospitalityImage, HospitalityLogo, TeleComImage, TeleComLogo } from '../Icons'
import Image from 'next/image'

const Industries = () => {
  const Contents = [
    { icon: FinanceLogo, title: 'Financial Products & Services', description: 'Unlock unprecedented global growth for your financial offerings.', image: FinanceImage },
    { icon: TeleComLogo, title: 'Telecommunications', description: 'Expand your reach and market share in the dynamic telecom landscape.', image: TeleComImage },
    { icon: HospitalityLogo, title: 'Hospitality', description: 'Craft compelling international strategies to attract a global clientele.', image: HospitalityImage },
    { icon: AirLinesLogo, title: 'Airlines', description: 'Optimize your passenger acquisition and loyalty strategies for high-growth corridors.', image: AirLinesImage },
  ]

  return (
    <section id="Industries-section" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24 py-12">
      <div className="w-full flex flex-col items-center mb-10 lg:mb-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center text-[#060B13] max-w-4xl">
          Driving <span className="text-[#A10E2B]">Growth</span> Across Diverse Industries Worldwide
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {Contents.map((content, index) => (
          <div
            key={index}
            className="bg-[#F9F5F6] rounded-2xl md:rounded-3xl hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full"
          >
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <div className="flex flex-col items-start space-y-3 sm:space-y-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Image 
                    src={content.icon} 
                    alt={`${content.title} icon`} 
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#060B13]">
                  {content.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#909090]">
                  {content.description}
                </p>
              </div>
            </div>
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 mt-auto">
              <Image
                src={content.image}
                alt={`${content.title} illustration`}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Industries