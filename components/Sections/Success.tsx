"use client";
import React, { useEffect, useRef, useState } from 'react'
import { EndImage, GlobalImage, RapidImage, ResultImage } from '../Icons'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Success = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

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

  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const scrollContainer = scrollContainerRef.current

    if (!container || !scrollContainer) return

    // Wait for component to be fully loaded
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const container = containerRef.current
    const scrollContainer = scrollContainerRef.current
    const pinWrapper = pinWrapperRef.current

    if (!container || !scrollContainer || !pinWrapper) return

    // Clear any existing animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    gsap.set(scrollContainer, { clearProps: "all" })

    const setupAnimation = () => {
      // Force layout recalculation
      container.offsetHeight
      scrollContainer.offsetWidth

      const containerWidth = container.offsetWidth
      const scrollWidth = scrollContainer.scrollWidth

      // Calculate proper scroll distance based on screen size
      let paddingRight = window.innerWidth >= 640 ? 32 : 16

      // Calculate the scroll distance to show the last card completely
      const scrollDistance = scrollWidth - containerWidth + paddingRight

      if (scrollDistance <= 0) {
        console.warn('No scroll needed, content fits in container')
        return
      }

      // Create the pinned horizontal scroll animation
      const scrollTween = gsap.to(scrollContainer, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: pinWrapper,
          start: "top top",
          end: () => `+=${scrollDistance * 2}`, // Adjust multiplier to control scroll duration
          scrub: 1,
          pin: true, // Pin the section
          anticipatePin: 1,
          refreshPriority: 1,
          onUpdate: (self) => {
            console.log('Scroll progress:', self.progress, 'x:', gsap.getProperty(scrollContainer, "x"))
          },

        }
      })

      return scrollTween
    }

    // Add a longer delay to ensure all images are loaded and layout is stable
    const animationTimer = setTimeout(() => {
      const tween = setupAnimation()

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh()

      // Store cleanup function
      if (container) {
        (container as any)._cleanup = () => {
          if (tween) tween.kill()
          ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
      }
    }, 500)

    // Cleanup function
    return () => {
      clearTimeout(animationTimer)
      if (container && (container as any)._cleanup) {
        (container as any)._cleanup()
      }
    }
  }, [isLoaded, dimensions])

  // Handle window resize with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <>
      <div
        ref={pinWrapperRef}
        id="expertise-section"
        className="w-full py-12 sm:py-16 md:py-20 md:min-h-screen flex items-center hidden sm:block md:block"
      >
        <div
          ref={containerRef}
          className="w-full flex flex-col justify-center overflow-hidden relative"
        >
          {/* Header Section */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-[#060B13] max-w-full md:max-w-2xl lg:max-w-3xl text-center md:text-start">
              Your Strategic Partner for International{" "}
              <span className="text-[#A10E2B]">Success</span>
            </h1>
          </div>

          {/* Scrollable Cards Section */}
          <div className="w-full overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex flex-row gap-4 sm:gap-5 md:gap-6 items-center pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16 pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16"
              style={{
                width: "max-content",
                minWidth: "100%",
              }}
            >
              {contents.map((content, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start space-y-3 sm:space-y-4 justify-between bg-[#F9F5F6] px-4 sm:px-5 md:px-6 py-6 sm:py-7 md:py-8 lg:py-10 
                          w-72 sm:w-80 md:w-[350px] lg:w-[380px] xl:w-[410px] 
                          h-72 sm:h-80 md:h-[350px] lg:h-[380px] xl:h-[410px] 
                          flex-shrink-0 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-1 space-y-2 sm:space-y-3">
                    <h2 className="text-[#060B13] text-lg sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px] leading-tight tracking-tight text-start font-semibold">
                      {content.title}
                    </h2>
                    <p className="text-[#909090] text-sm sm:text-base md:text-[15px] lg:text-[16px] leading-relaxed">
                      {content.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-2 sm:pt-3 md:pt-4">
                    <Image
                      src={content.image}
                      alt={`${content.title} icon`}
                      className="w-auto h-auto max-w-full"
                      priority={index < 2} // Prioritize loading first 2 images
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='min-h-screen mb-15'>
  <div className='flex flex-col space-y-6'>
    <div className="px-4 mb-6">
      <h1 className="text-2xl font-bold leading-tight tracking-tight w-[284px] mx-auto text-[#060B13] text-center">
        Your Strategic Partner for International{" "}
        <span className="text-[#A10E2B]">Success</span>
      </h1>
    </div>
    {contents.map((content, index) => (
      <div
        key={index}
        className="relative bg-[#F9F5F6] px-4 py-6 w-full h-82 flex-shrink-0 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      >
        <div className="space-y-2">
          <h2 className="text-[#060B13] text-lg leading-tight tracking-tight text-start font-semibold">
            {content.title}
          </h2>
          <p className="text-[#909090] text-sm leading-[15px]">
            {content.description}
          </p>
        </div>
        <div className="absolute">
          <Image
            src={content.image}
            alt={`${content.title} icon`}
            className="w-100 h-full mt-7"
            priority={index < 2}
          />
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
}

export default Success