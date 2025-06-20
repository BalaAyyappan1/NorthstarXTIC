"use client";
import React, { useState } from 'react'
import { CompnayLogo } from './Icons'
import Image from 'next/image'
import Link from 'next/link';

type NavItem = {
  link: string;
  name: string;
  sectionId: string;
};

const Footer = () => {
  const [activeSection, setActiveSection] = useState('home-section');


  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = sectionId === 'home-section'
        ? 0
        : elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navContents: NavItem[] = [
    {
      link: "#home",
      name: "Home",
      sectionId: "home-section",
    },
    {
      link: "#industries",
      name: "Industries",
      sectionId: "Industries-section",
    },
    {
      link: "#solutions",
      name: "Solutions",
      sectionId: "Solutions-section",
    },
    {
      link: "#expertise",
      name: "Expertise",
      sectionId: "expertise-section",
    },

  ];

  return (
    <>
      {/* Destop version */}
      <div className='hidden lg:block '>
        <div className="relative md:h-[338px] bg-[#F9F5F6] rounded-[20px] xl:px-[115px] lg:px-[70px] md:px-[30px] py-[47px] flex flex-col items-center justify-center">
          <div className="w-full max-w-[1200px] flex md:flex-row flex-col justify-between items-start gap-8">
            <Link href={'#home-section'}>
              <Image src={CompnayLogo} alt="Company Logo" className="w-[369px]" />
            </Link>

            <div className="flex flex-col gap-[19px]">
              <ul className="flex flex-col  gap-[12px]">
                {navContents.map((item) => (
                  <li key={item.sectionId}>
                    <Link
                      href={item.link}
                      onClick={(e) => handleScrollToSection(e, item.sectionId)}
                      className={`px-1 py-2 text-[18px] tracking-[0.5px] transition-colors font-medium hover:font-bold ${activeSection === item.sectionId
                        ? 'text-[#909090] font-bold'
                        : 'text-[#909090]'
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col max-w-[331px]">
              <span className="text-[#6F6F6F] font-semibold text-[16px]">Get in touch</span>
              <span className="text-[#909090] text-[16px]">
                info@northstargrowthadvisors.com
              </span>
              <span className="text-[#909090] text-[16px]">
                Unit No. GB-06, Ground Floor, Pragya Accelerator, Gift City,
                Gandhinagar - 382355, INDIA.
              </span>
            </div>
          </div>
          <div className='absolute bottom-[7%] xl:left-[8%] lg:left-[6%] pb-5 md:pb-5 text-[#909090] text-[16px]'>
            © designed &  developed by  <Link href={'https://www.theinternetcompany.one/'} target="_blank" rel="noopener noreferrer" className='hover:underline'>TIC GLOBAL</Link>.
          </div>
        </div>
      </div>




      {/* mobile version */}
      <div className=' lg:hidden block'>
        <div className="relative md:h-auto bg-[#F9F5F6] rounded-[20px] px-[16px] py-10 flex flex-col">

          <div className="flex justify-center mb-8">
            <Link href={'#home-section'}>
              <Image src={CompnayLogo} alt="Company Logo" className="w-[269px]" />
            </Link>
          </div>


          <div className="flex flex-col items-start space-y-5">
            <ul className="flex flex-col gap-[5px]">
              {navContents.map((item) => (
                <li key={item.sectionId}>
                  <Link
                    href={item.link}
                    onClick={(e) => handleScrollToSection(e, item.sectionId)}
                    className={`px-1 py-2 text-[12px] tracking-[0.5px] transition-colors font-medium hover:font-bold ${activeSection === item.sectionId
                        ? 'text-[#909090] font-bold'
                        : 'text-[#909090]'
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="flex flex-col max-w-[331px] mt-5">
            <span className="text-[#6F6F6F] font-semibold text-[14px]">Get in touch</span>
            <span className="text-[#909090] text-[12px]">
              info@northstargrowthadvisors.com
            </span>
            <span className="text-[#909090] text-[12px]">
              Unit No. GB-06, Ground Floor, Pragya Accelerator, Gift City,
              Gandhinagar - 382355, INDIA.
            </span>
          </div>


          <div className='flex flex-row space-x-2 justify-center pt-5 md:pt-8 text-[#909090] text-[13px]'>
            © designed & developed by&nbsp;<Link href={'https://www.theinternetcompany.one/'} target="_blank" rel="noopener noreferrer" className='hover:underline'> TIC GLOBAL</Link>.
          </div>
        </div>

      </div>

    </>
  );
}

export default Footer
