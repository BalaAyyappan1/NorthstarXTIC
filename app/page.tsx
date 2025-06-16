import Footer from "@/components/Footer";
import Contact from "@/components/Sections/Contact";
import Hero from "@/components/Sections/Hero";
import Industries from "@/components/Sections/Industries";
import Solutions from "@/components/Sections/Solutions";
import Success from "@/components/Sections/Success";
import TopNav from "@/components/TopNav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <TopNav />
      <Hero />
      <div className="md:mt-[120px] mt-[60px] md:mb-[120px] mb-[50px]">
      <Industries />
      </div>
      <div className="xl:px-[180px] lg:px-[16px] md:px-[16px] px-[16px] xl:mb-[60px] lg:mb-[50px] md:mb-[100px] mb-[50px]">
      <Solutions />
      </div>
      <div className="xl:pl-[80px] lg:pl-[80px] md:pl-[16px] pl-[16px] md:pl-0 pr-[16px]">
      <Success />
      </div>
      <div className="xl:px-[80px] lg:px-[70px] px-[16px] xl:mt-[1px] lg:mt-[1px] md:mt-[80px]"> 
      <Contact />
      </div>
      <div className="xl:px-[80px] lg:px-[70px] px-[16px] xl:mt-[120px] mt-[50px] mb-10">
      <Footer />
      </div>
    </div>
  );
}
