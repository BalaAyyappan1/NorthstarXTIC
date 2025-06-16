"use client";
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { CompnayLogo } from './Icons';

type NavItem = {
  link: string;
  name: string;
  sectionId: string;
};

const menuVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] }
  },
  closed: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] }
  }
};

const itemVariants = {
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  }),
  closed: (i: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  })
};

const TopNav = () => {
  const [activeSection, setActiveSection] = useState('home-section');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navContents.map(item => document.getElementById(item.sectionId));
      const scrollPosition = window.scrollY + 100; // Adding offset for navbar height

      for (const section of sections) {
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <>
      <header className="absolute w-full z-50 xl:px-[80px] lg:px-[70px] md:px-[30px] px-[16px] mt-10 ">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <Link href="#home-section">
              <Image
                src={CompnayLogo}
                alt="Company Logo"
                width={500}
                height={500}
                className="md:w-[371px] md:h-[41px] w-[203px] h-[28px]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-6">
              {navContents.map((item) => (
                <li key={item.sectionId}>
                  <Link
                    href={item.link}
                    onClick={(e) => handleScrollToSection(e, item.sectionId)}
                    className={`px-1 py-2 text-[18px] tracking-[0.5px] transition-colors font-medium hover:text-black hover:font-semibold ${
                      activeSection === item.sectionId
                        ? "text-black font-bold"
                        : "text-[#060B13]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-[#A10E2B] p-2 z-50 relative"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col h-full p-6">
              {/* Header with logo and close button */}
              <motion.div
                className="flex justify-between items-center pb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              ></motion.div>

              {/* Navigation items */}
              <nav className="flex-1 flex flex-col justify-center">
                <ul className="space-y-4">
                  {navContents.map((item, index) => (
                    <motion.li
                      key={item.sectionId}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={item.link}
                        className={`block py-3 text-center text-2xl font-medium ${
                          activeSection === item.sectionId
                            ? "text-[#A10E2B] font-bold"
                            : "text-gray-600"
                        }`}
                        onClick={(e) => {
                          handleScrollToSection(e, item.sectionId);
                          toggleMenu();
                        }}
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.name}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNav;