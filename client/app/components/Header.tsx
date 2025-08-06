"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NavItems from "./NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
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

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "screen") {
      setOpenSidebar(false);
    }
  };

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
              {/* Only for Mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer 800px:block hidden dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        {/* Mobile Sidebar */}
        {openSidebar && (
          <div
            className="fixed 800px:hidden w-full h-screen top-0 z-[9999] dark:bg-[unset] bg-[#0000005e]"
            id="screen"
            onClick={handleClose}
          >
            <div className="w-[70%] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-20 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-md px-2 pl-5 text-black dark:text-white">
                Copyright &#169; 2025 Ilmo LMS
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
