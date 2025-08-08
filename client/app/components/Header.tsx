"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NavItems from "./NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SingUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar.jpg";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header = ({ activeItem, open, route, setRoute, setOpen }: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login successful");
      }
    }
    if (data === null) {
      setLogout(true);
    }
  }, [data, user]);
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
            ? "bg-white-900 dark:bg-opacity-50  dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0f1419]  backdrop-blur-sm fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-gray-200 dark:border-[#ffffff1c] shadow-xl transition-all duration-500"
            : "bg-transparet  dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0f1419]   w-full border-b border-gray-200 dark:border-[#ffffff70] dark:border-b-2  shadow-md h-[80px] z-[80] dark:shadow-md transition-all duration-500"
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
              {user ? (
                <Link href={"/profile"} passHref>
                  <Image
                    width={30}
                    height={30}
                    src={user.avatar ? user.avatar.url : avatar}
                    alt="user-icon"
                    className={`w-[30px] 800px:block hidden h-[30px] rounded-full cursor-pointer`}
                    style={{
                      border: activeItem === 5 ? "2px solid #37a39a" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer 800px:block hidden dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
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
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
