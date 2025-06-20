"use client";
import React, { useEffect, useRef } from 'react'
import { EndImage, GlobalImage, RapidImage, ResultImage } from '../Icons'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Success: React.FC = () => {
  const contents = [
    {
      title: 'Global Network',
      description: 'Benefit from our extensive network of partners and resources in over 60 countries.',
      image: GlobalImage
    },
    {
      title: 'Rapid Scalability',
      description: 'Accelerate your international expansion with our proven methodologies and expert guidance.',
      image: RapidImage
    },
    {
      title: 'End to End Solutions',
      description: 'From initial assessment to ongoing execution, we provide extensive support every step.',
      image: EndImage
    },
    {
      title: 'Results Oriented Approach',
      description: 'We are committed to delivering measurable results and maximizing your ROI.',
      image: ResultImage
    },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scrollTrigger: ScrollTrigger | null = null

    const initHorizontalScroll = () => {
      const container = containerRef.current
      const scrollElement = scrollRef.current
    
      if (!container || !scrollElement) return
    
      // Only apply on devices with width >= 1024px
      if (window.innerWidth < 1024) {
        gsap.set(scrollElement, { x: 0 })
        return
      }
    
      // Check if it's a touch device
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
      // For iPads and touch devices, use a much simpler approach
      if (isTouchDevice) {
        // Simple scroll-based animation without pinning
        const handleScroll = () => {
          const rect = container.getBoundingClientRect()
          const containerHeight = container.offsetHeight
          const windowHeight = window.innerHeight
          
          // Calculate progress based on how much of the container is visible
          let progress = 0
          if (rect.top < windowHeight && rect.bottom > 0) {
            progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (containerHeight + windowHeight)))
          }
          
          const scrollDistance = scrollElement.scrollWidth - container.offsetWidth
          gsap.to(scrollElement, {
            x: -scrollDistance * progress,
            duration: 0.3,
            ease: "power2.out"
          })
        }
    
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial call
    
        // Store cleanup function
        scrollTrigger = {
          kill: () => {
            window.removeEventListener('scroll', handleScroll)
          }
        }
      } else {
        // Desktop version with pinning
        const scrollDistance = scrollElement.scrollWidth - container.offsetWidth
    
        if (scrollDistance <= 0) return
    
        scrollTrigger = ScrollTrigger.create({
          trigger: container,
          scrub: 1,
          pin: true,
          start: "center center",
          end: "bottom top+=100",
          animation: gsap.fromTo(scrollElement,
            { x: 0 },
            { x: -scrollDistance, ease: "none" }
          ),
          invalidateOnRefresh: true
        })
      }
    }

    
    const timer = setTimeout(() => {
      initHorizontalScroll()
    }, 100)

    const handleResize = () => {
      if (scrollTrigger) {
        scrollTrigger.kill()
        scrollTrigger = null
      }
      setTimeout(initHorizontalScroll, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      if (scrollTrigger) {
        scrollTrigger.kill()
      }
    }
  }, [])

  return (
    <>
      {/* Desktop version */}
      <div className="hidden lg:block w-full py-16">
        <div
          ref={containerRef}
          className="w-full h-screen overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 pb-12">
            <h1 className="xl:text-[48px] lg:text-[35px] md:text-[38px] text-[20px] font-bold leading-tight tracking-tight text-[#060B13] max-w-full md:max-w-md lg:max-w-3xl text-center md:text-left">
              Your Strategic Partner for International{" "}
              <span className="text-[#A10E2B]">Success</span>
            </h1>
          </div>

          {/* Horizontal scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-6 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16 pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16"
          >
            {contents.map((content, index) => (
              <div
                key={index}
                className="flex flex-col justify-between bg-[#F9F5F6] px-6 py-8 
                          w-80 md:w-96 lg:w-[400px] xl:w-[450px] 
                          h-80 md:h-96 lg:h-[400px] 
                          flex-shrink-0 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="space-y-4">
                  <h2 className="text-[#060B13] text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                    {content.title}
                  </h2>
                  <p className="text-[#909090] text-base md:text-lg leading-relaxed">
                    {content.description}
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <Image
                    src={content.image}
                    alt={`${content.title} icon`}
                    className="w-full h-full max-w-full "
                    priority={index < 2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className='mt-15 mb-15  w-full flex items-center justify-center lg:hidden'>
        <div className='flex flex-col space-y-6 w-full px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0'>
          <div className="mb-6 sm:col-span-2"> {/* Title spans both columns */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight text-[#060B13] max-w-full text-center sm:text-left">
              Your Strategic Partner for International{" "}
              <span className="text-[#A10E2B]">Success</span>
            </h1>
          </div>
          {contents.map((content, index) => (
            <div
              key={`mobile-${index}`}
              className="relative bg-[#F9F5F6] pt-6 px-6 w-full flex flex-col rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-2 mb-4">
                <h2 className="text-[#060B13] text-lg leading-tight tracking-tight text-start font-semibold">
                  {content.title}
                </h2>
                <p className="text-[#909090] text-sm leading-[15px]">
                  {content.description}
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src={content.image}
                  alt={`${content.title} icon`}
                  className="w-full h-auto object-contain max-h-[250px]"
                  priority={index < 2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Success