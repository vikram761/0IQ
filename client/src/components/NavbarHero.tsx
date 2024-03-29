"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface NavbarHeroProps {}

const NavbarHero: FC<NavbarHeroProps> = ({}) => {
  const router = useRouter();
  return (
    <nav className="flex justify-center  h-16 w-full bg-[#ffffff] shadow-lg z-20 ">
      <div className="flex justify-between items-center sm:w-[70%] h-full w-full max-sm:mx-4 ease transition-all ">
        <div onClick={() => router.push("/")}>
          <h1 className=" cursor-pointer	text-xl font-semibold transition  hover:border-b-2  hover:border-gray-300">
            <span className=" mr-2 jose">ECHO</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <Button
            className="sm:px-8 sm:py-1  text-md transition duration-150 ease-in bg-black"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHero;
