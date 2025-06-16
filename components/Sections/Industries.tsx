import React from 'react'
import { AirLinesImage, AirLinesLogo, FinanceImage, FinanceLogo, HospitalityImage, HospitalityLogo, TeleComImage, TeleComLogo } from '../Icons'
import Image from 'next/image'

const Industries = () => {

  const Contents = [
    {icon: FinanceLogo, title:'Financial Products & Services', description:'Unlock unprecedented global growth for your financial offerings.', image: FinanceImage},
    {icon: TeleComLogo, title:'Telecommunications', description:'Expand your reach and market share in the dynamic telecom landscape.', image: TeleComImage},
    {icon: HospitalityLogo, title:'Hospitality', description:'Craft compelling international strategies to attract a global clientele.', image: HospitalityImage},
    {icon: AirLinesLogo, title:'Airlines', description:'Optimize your passenger acquisition and loyalty strategies for high-growth corridors.', image: AirLinesImage},
  ]




  return (
    <div id="Industries-section" className="md:px-[80px] px-[16px]">
      <h1 className="xl:text-[48px] lg:text-[38px] md:text-[35px] text-[20px] font-bold md:leading-[50px] leading-[24px] md:tracking-[-2px] tracking-[-1px] text-[#060B13] md:w-[696px] w-[300px] text-center justify-center items-center mx-auto">
        Driving <span className="text-[#A10E2B]">Growth</span> Across Diverse
        Industries Worldwide
      </h1>

      <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2  grid-cols-1 md:gap-8 gap-4 mt-[50px] ">
        {Contents.map((content, index) => (
          <div
            key={index}
            className="bg-[#F9F5F6] md:rounded-[40px] rounded-[20px]  hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="md:pt-8 pt-5 pl-[32px] md:px-7 px-10">
              <div className="flex flex-col md:items-start items-center xl:mb-6 lg:mb-6 mb-1 md:space-y-2">
                <Image src={content.icon} alt="icon" className="w-10 h-10" />

                <h2 className="xl:text-[36px] lg:text-[20px] md:text-[20px] text-[14px] xl:leading-10 lg:leading-10 font-bold text-[#060B13] md:mt-0 md:mt-1">
                  {content.title}
                </h2>
                <p className="xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px]  xl:leading-[19px] lg:leading-[19px] md:leading-[16px] text-[#909090] mb-6 xl:w-[532px] lg:w-[432px] md:text-start text-center">
                  {content.description}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center ">
              <Image
                src={content.image}
                alt="icon"
                className="xl:w-[410px] xl:h-[410px] md:w-[410px] lg:w-[420px] w-[370px] lg:block hidden sm:block md:block hover:scale-101"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Industries
