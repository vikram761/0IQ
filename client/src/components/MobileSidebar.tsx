"use client";
import { FC, useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

interface MobileSidebarProps {}

const MobileSidebar: FC<MobileSidebarProps> = ({}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <div className="md:hidden transition">
      <Sheet>
        <SheetTrigger>
          <div className="rounded-lg hover:bg-gray-300">
            <BiMenuAltLeft size="30" />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-gray-900">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
