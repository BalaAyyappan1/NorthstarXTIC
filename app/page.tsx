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
      <div className="md:mt-[120px] md:mb-[120px]">
      <Industries />
      </div>
      <div className="md:px-[180px] px-[16px] md:mb-[120px]">
      <Solutions />
      </div>
      <div className="md:px-[80px] px-[16px] md:mb-[120px]">
      <Success />
      </div>
      <div className="md:px-[80px] px-[16px]"> 

      <Contact />
      </div>
      <div className="md:px-[80px] px-[16px] mt-[120px] mb-10">
      <Footer />
      </div>
    </div>
  );
}
