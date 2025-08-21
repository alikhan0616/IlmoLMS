"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import bannerImg1 from "../../../public/assets/banner-img-1.png";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useRouter } from "next/navigation";
import Loader from "../Common/Loader/Loader";

const Hero = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full my-20 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0f1419] relative overflow-hidden">
          {/* Animated background overlay */}
          <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:h-[600px] h-[50vh] w-full hero_animation rounded-full opacity-30"></div>

          <div className="w-[95%] 800px:w-[92%] m-auto relative z-10 pt-[80px]">
            <div className="flex flex-col-reverse 1000px:flex-row items-center justify-between min-h-screen py-8 1000px:py-0">
              {/* Left side - Text content */}
              <div className="w-full 1000px:w-[60%] flex flex-col items-center 1000px:items-start justify-center text-center 1000px:text-left mt-8 1000px:mt-0">
                <h2 className="text-gray-900 dark:text-white text-[28px] 400px:text-[32px] 800px:text-[40px] 1000px:text-[50px] 1200px:text-[60px] 1300px:text-[70px] font-bold font-Josefin leading-tight px-3 w-full 1000px:px-0 1100px:w-[85%] 1200px:w-[80%] 1300px:w-[75%]">
                  {data?.layout?.banner?.title}
                </h2>

                <br className="hidden 800px:block" />

                <p className="text-gray-600 dark:text-gray-300 font-Josefin font-normal text-[16px] 800px:text-[18px] leading-relaxed px-3 1000px:px-0 w-full 1000px:w-[85%] 1200px:w-[75%] mt-4 1000px:mt-0">
                  {data?.layout?.banner?.subTitle}
                </p>

                <br className="hidden 800px:block" />
                <br className="hidden 800px:block" />

                {/* Search Bar */}
                <div className="w-[90%] 800px:w-[85%] 1000px:w-[80%] 1200px:w-[75%] 1300px:w-[70%] h-[50px] bg-transparent relative mt-6 1000px:mt-0">
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Courses..."
                    className="bg-white/90 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-[5px] p-3 pr-[60px] w-full h-full outline-none text-gray-900 dark:text-white text-[16px] 800px:text-[18px] 1000px:text-[20px] font-Josefin placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-lg"
                  />
                  <div
                    className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-cyan-500 hover:bg-cyan-400 dark:bg-cyan-400 dark:hover:bg-cyan-300 rounded-r-[5px] transition-all duration-300"
                    onClick={handleSearch}
                  >
                    <BiSearch className="text-white" size={24} />
                  </div>
                </div>

                <br className="hidden 800px:block" />
                <br className="hidden 800px:block" />

                {/* Trust indicators */}
                <div className="w-[90%] 800px:w-[85%] 1000px:w-[80%] 1200px:w-[75%] flex flex-col 400px:flex-row items-center justify-center 1000px:justify-start mt-6 1000px:mt-0">
                  <div className="flex items-center mb-4 400px:mb-0">
                    <div className="w-[40px] h-[40px] 800px:w-[50px] 800px:h-[50px] rounded-full bg-gradient-to-r from-orange-400 to-red-400 border-2 border-gray-300 dark:border-white/20 flex items-center justify-center text-white font-bold shadow-lg text-sm 800px:text-base">
                      A
                    </div>
                    <div className="w-[40px] h-[40px] 800px:w-[50px] 800px:h-[50px] rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-gray-300 dark:border-white/20 ml-[-10px] flex items-center justify-center text-white font-bold shadow-lg text-sm 800px:text-base">
                      B
                    </div>
                    <div className="w-[40px] h-[40px] 800px:w-[50px] 800px:h-[50px] rounded-full bg-gradient-to-r from-green-400 to-blue-400 border-2 border-gray-300 dark:border-white/20 ml-[-10px] flex items-center justify-center text-white font-bold shadow-lg text-sm 800px:text-base">
                      C
                    </div>
                  </div>
                  <p className="font-Josefin text-gray-600 dark:text-gray-300 400px:pl-3 1000px:pl-4 text-[14px] 800px:text-[16px] 1000px:text-[18px] font-normal text-center 400px:text-left">
                    500K+ People already trusted us.{" "}
                    <Link
                      href="/courses"
                      className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300 font-semibold"
                    >
                      View Courses
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right side - Hero Image */}
              <div className="w-full 1000px:w-[40%] flex items-center justify-center 1000px:justify-end relative">
                {/* Main circular background matching the image */}
                <div className="relative w-[280px] h-[280px] 400px:w-[320px] 400px:h-[320px] 800px:w-[400px] 800px:h-[400px] 1100px:w-[450px] 1100px:h-[450px] 1200px:w-[500px] 1200px:h-[500px] 1300px:w-[550px] 1300px:h-[550px] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 dark:from-[#4338ca] dark:via-[#6366f1] dark:to-[#3730a3] rounded-full shadow-2xl">
                  {/* Image container */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <Image
                      src={data?.layout?.banner?.image?.url || bannerImg1}
                      width={400}
                      height={400}
                      alt="Learning illustration"
                      className="object-contain w-[85%] h-[85%] relative z-20"
                      priority
                    />
                  </div>

                  {/* Floating decorative elements around the circle */}
                  <div className="absolute -top-2 -right-2 800px:-top-4 800px:-right-4 w-[24px] h-[24px] 800px:w-[32px] 800px:h-[32px] bg-pink-400 dark:bg-pink-300 rounded transform rotate-12 shadow-lg"></div>
                  <div className="absolute top-1/4 -left-3 800px:-left-6 w-[20px] h-[20px] 800px:w-[24px] 800px:h-[24px] bg-yellow-400 dark:bg-yellow-300 rounded transform rotate-45 shadow-lg"></div>
                  <div className="absolute bottom-1/4 -right-4 800px:-right-8 w-[20px] h-[20px] 800px:w-[24px] 800px:h-[24px] bg-blue-400 dark:bg-blue-300 rounded-full shadow-lg"></div>
                  <div className="absolute top-8 left-2 800px:left-4 w-[16px] h-[16px] 800px:w-[20px] 800px:h-[20px] bg-green-400 dark:bg-green-300 rounded transform rotate-12 shadow-lg"></div>

                  {/* Plant illustration on the bottom left */}
                  <div className="absolute bottom-0 -left-4 800px:-left-8 w-[32px] h-[40px] 800px:w-[48px] 800px:h-[64px]">
                    {/* Pot */}
                    <div className="absolute bottom-0 w-[20px] h-[16px] 800px:w-[32px] 800px:h-[24px] bg-gray-300 dark:bg-gray-200 rounded-b-full mx-auto shadow-md"></div>
                    {/* Stem */}
                    <div className="absolute bottom-3 800px:bottom-4 left-1/2 transform -translate-x-1/2 w-[2px] h-[20px] 800px:h-[32px] bg-green-600"></div>
                    {/* Leaves */}
                    <div className="absolute bottom-6 800px:bottom-8 left-0 800px:left-1 w-[12px] h-[16px] 800px:w-[16px] 800px:h-[24px] bg-green-400 rounded-full transform rotate-45 shadow-sm"></div>
                    <div className="absolute bottom-6 800px:bottom-8 right-0 800px:right-1 w-[12px] h-[16px] 800px:w-[16px] 800px:h-[24px] bg-green-400 rounded-full transform -rotate-45 shadow-sm"></div>
                    <div className="absolute bottom-8 800px:bottom-10 left-1/2 transform -translate-x-1/2 w-[10px] h-[12px] 800px:w-[12px] 800px:h-[20px] bg-green-500 rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
