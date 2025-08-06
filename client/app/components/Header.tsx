"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NavItems from "./NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header = ({ activeItem, open, setOpen }: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "bg-white-900 dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black backdrop-blur-sm fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-gray-200 dark:border-[#ffffff1c] shadow-xl transition-all duration-500"
            : "bg-transparet dark:bg-gradient-to-b dark:from-gray-900 dark:to-black  w-full border-b border-gray-200 dark:border-[#ffffff70] dark:border-b-2  shadow-md h-[80px] z-[80] dark:shadow-md transition-all duration-500"
        }`}
      >
        {/* Add your header content here */}
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div className="">
              <Link
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                href={"/"}
              >
                Ilmo LMS
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
