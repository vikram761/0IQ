"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

import { IconType } from "react-icons";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineGift } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

import { usePathname } from "next/navigation";

interface sidebarProps {}

interface route {
  label: string;
  icon: IconType;
  href: string;
  color: string;
}

const teacherRoutes: route[] = [
  {
    label: "Dashboard",
    icon: LuLayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Tests",
    icon: BsChatLeftText,
    href: "/createTest",
    color: "text-violet-500",
  },
  {
    label: "Knowledge bases",
    icon: FaRegFilePdf,
    href: "/knowledge-base",
    color: "text-green-500",
  },
  {
    label: "Results",
    icon: FaCheck,
    href: "/results",
    color: "text-rose-500",
  },
];

const studentRoutes: route[] = [
  {
    label: "Dashboard",
    icon: LuLayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "View Test",
    icon: BsChatLeftText,
    href: "/viewTest",
    color: "text-violet-500",
  },

  {
    label: "Results",
    icon: FaCheck,
    href: "/results",
    color: "text-rose-500",
  },
];

const Sidebar: FC<sidebarProps> = ({}) => {
  const pathname: string = usePathname();
  return (
    <div className="flex flex-col py-4 h-full w-full text-white space-y-4">
      <div className="py-2 px-2">
        <Link href="/" className="flex items-center pl-7  mb-12 ">
          <h1 className="text-2xl font-bold ">
            <span className="jose ">ECHO</span>
          </h1>
        </Link>
        <div className="space-y-2">
          {teacherRoutes.map((route: route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "flex text-sm group py-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg pl-7 transition",
                pathname == route.href ? "bg-white/10" : ""
              )}
            >
              <div className="flex items-center">
                {<route.icon className={cn("h-5 w-5 mr-3", route.color)} />}
                <p>{route.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
