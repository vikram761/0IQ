"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { IconType } from "react-icons";
import { BsArrowRightShort, BsChatLeft } from "react-icons/bs";
import { BiBarChartSquare, BiEditAlt, BiBookBookmark } from "react-icons/bi";

interface pageProps {}

interface route {
  label: string;
  icon: IconType;
  href: string;
  color: string;
  bgColor: string;
}

const routes: route[] = [
  {
    label: "Past Tests",
    icon: BiBookBookmark,
    href: "/ptests",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Current Tests",
    icon: BiEditAlt,
    href: "/ctests",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    label: "Analysis",
    icon: BiBarChartSquare,
    href: "/analysis",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    label: "Doubts",
    icon: BsChatLeft,
    href: "/doubts",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
];

const Page: FC<pageProps> = ({}) => {
  return (
    <div className="w-full space-y-4 bg-white pt-20">
      <h1 className="text-2xl font-bold md:text-5xl text-center">
        Evaluate Your Papers Faster With Echo.
      </h1>
      <div className="md:text-lg text-center text-muted-foreground font-light text-sm flex justify-center w-full gap-1">
        <h3>Every Second Matters</h3>
        <div className="inline"></div>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-6 md:py-18 py-12 flex justify-center w-full h-auto flex-col items-center overflow-x-hidden">
        {routes.map((route) => (
          <Card
            className=" border border-slate-400 hover:bg-zinc-100 lg:w-[40rem] md:w-[30rem] sm:w-4/5 w-[90%] font-medium transition-all hover:-translate-y-2 duration-150 ease-in delay-100"
            key={route.href}
          >
            <a href={route.href}>
              <div className="flex item-center justify-between px-4 py-2 ">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-lg text-xl flex justify-center items-center",
                      route.bgColor,
                      route.color,
                    )}
                  >
                    {<route.icon />}
                  </div>
                  <div className="text-md  flex items-center ">
                    <h3>{route.label}</h3>
                  </div>
                </div>
                <div className="text-2xl flex items-center">
                  <BsArrowRightShort />
                </div>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
