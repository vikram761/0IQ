import { FC } from "react";
import Link from "next/link";

import NavbarHero from "./NavbarHero";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <>
      <NavbarHero />
      <section className=" relative pb-20 sm:h-[800px] h-[800px]  bg-cover bg-center  flex flex-col justify-center items-center text-center bg-gradient-to-tr bg-[#ffffff] bg-no-repeat ">
        <h1 className="sm:w-[70%] text-6xl sm:text-7xl md:text-9xl font-bold  max-sm:mx-4  mb-4 md:text-black pt-20">
          Grader
        </h1>
        <h2 className="sm:w-[70%] text-3xl sm:text-4xl md:text-5xl font-semibold max-sm:mx-4 text-black flex items-center justify-center mb-8">
          A Digital AI Grader
        </h2>
        <p className="sm:w-[70%] text-lg sm:text-xl  max-sm:mx-4 text-black mb-12">
          Grade your papers within minutes
        </p>
        <Link
          href="/dashboard"
          className="bg-gradient-to-r bg-black  text-white text-md sm:text-xl font-medium py-3 px-8 rounded-xl transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2"
        >
          Start Your Magical Journey
        </Link>
      </section>
    </>
  );
};

export default Hero;
