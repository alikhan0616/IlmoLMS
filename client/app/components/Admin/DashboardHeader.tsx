"use client";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
type Props = {
  open?: boolean;
  setOpen?: any;
};
const DashboardHeader = ({ open, setOpen }: Props) => {
  const [notifications] = useState([
    {
      _id: "1",
      title: "New Order Received",
      message: "You have received a new order from John Doe.",
      createdAt: "2025-08-09T10:00:00Z",
    },
    {
      _id: "2",
      title: "Payment Successful",
      message: "Payment for order #1234 has been completed.",
      createdAt: "2025-08-08T15:30:00Z",
    },
    {
      _id: "3",
      title: "New Message",
      message: "A customer sent you a new message.",
      createdAt: "2025-08-07T09:15:00Z",
    },
  ]);

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[9999999]">
      <ThemeSwitcher />
      {/* Theme switcher placeholder */}

      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications.length}
        </span>
      </div>

      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[1000000000] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>

          {notifications.map((item, index) => (
            <div
              className="dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
              key={index}
            >
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">{item.title}</p>
                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">{item.message}</p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
