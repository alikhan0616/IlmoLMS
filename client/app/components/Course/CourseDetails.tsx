import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import CourseContentList from "./CourseContentList";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const CourseDetails = ({ data }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const discountPercentage =
    ((data.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    console.log("Order confirmed");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="w-[90%] 800px:w-[90%] m-auto py-8">
        <div className="w-full flex flex-col-reverse 800px:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full 800px:w-[65%]">
            {/* Course Title */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <h1 className="text-[28px] 800px:text-[32px] font-Poppins font-[700] text-gray-900 dark:text-white mb-4">
                {data.name}
              </h1>
              <div className="flex flex-col 800px:flex-row 800px:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Ratings rating={data.ratings} />
                  <span className="text-[16px] text-gray-600 dark:text-gray-300">
                    ({data?.reviews?.length} Reviews)
                  </span>
                </div>
                <div className="text-[16px] text-blue-600 dark:text-blue-400 font-medium">
                  {data.purchased} Students Enrolled
                </div>
              </div>
            </div>

            {/* What you will learn */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white mb-6">
                What you will learn from this course?
              </h2>
              <div className="grid grid-cols-1 800px:grid-cols-2 gap-4">
                {data?.benefits.map((item: any, index: number) => (
                  <div
                    className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    key={index}
                  >
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0"
                    />
                    <p className="text-[16px] text-gray-700 dark:text-gray-300">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white mb-6">
                What are the pre-requisites before starting this course?
              </h2>
              <div className="space-y-3">
                {data?.prerequisites?.map((item: any, index: number) => (
                  <div
                    className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    key={index}
                  >
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0"
                    />
                    <p className="text-[16px] text-gray-700 dark:text-gray-300">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white mb-6">
                Course Overview
              </h2>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>

            {/* Course Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white mb-6">
                Course Details
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-[16px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex flex-col 800px:flex-row 800px:items-center gap-4 mb-8">
                <Ratings rating={data?.ratings} />
                <h2 className="text-[24px] font-Poppins font-[600] text-gray-900 dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating • {data?.reviews?.length} Reviews
                </h2>
              </div>

              <div className="space-y-6">
                {(data.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                    >
                      <div className="flex gap-4">
                        <div className="w-[50px] h-[50px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-Poppins font-[600] text-[16px]">
                            {item.user.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col 800px:flex-row 800px:items-center gap-2 800px:gap-4 mb-3">
                            <h3 className="text-[18px] font-Poppins font-[600] text-gray-900 dark:text-white">
                              {item.user.name}
                            </h3>
                            <Ratings rating={item.rating} />
                            <span className="text-[14px] text-gray-500 dark:text-gray-400">
                              {format(item.createdAt)}
                            </span>
                          </div>
                          <p className="text-[16px] text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full 800px:w-[35%]">
            <div className="sticky top-[100px]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

                <div className="p-6">
                  {/* Pricing */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[32px] font-Poppins font-[700] text-blue-600 dark:text-blue-400">
                      {data?.price === 0 ? "Free" : `$${data.price}`}
                    </span>
                    {data.estimatedPrice > data.price && (
                      <>
                        <span className="text-[20px] text-gray-500 line-through">
                          ${data.estimatedPrice}
                        </span>
                        <span className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-full text-[14px] font-medium">
                          {discountPercentagePrice}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Purchase Button */}
                  <div className="mb-6">
                    {isPurchased ? (
                      <Link
                        href={`/course-access/${data._id}`}
                        className="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-Poppins font-[600] py-4 px-6 rounded-lg transition-colors text-[16px]"
                      >
                        Access Course
                      </Link>
                    ) : (
                      <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-Poppins font-[600] py-4 px-6 rounded-lg transition-colors text-[16px]"
                        onClick={handleOrder}
                      >
                        Purchase for ${data.price}
                      </button>
                    )}
                  </div>

                  {/* Course Features */}
                  <div className="space-y-3 text-[15px]">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <IoCheckmarkDoneOutline
                        className="text-green-600 dark:text-green-400"
                        size={18}
                      />
                      <span>Source code included</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <IoCheckmarkDoneOutline
                        className="text-green-600 dark:text-green-400"
                        size={18}
                      />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <IoCheckmarkDoneOutline
                        className="text-green-600 dark:text-green-400"
                        size={18}
                      />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <IoCheckmarkDoneOutline
                        className="text-green-600 dark:text-green-400"
                        size={18}
                      />
                      <span>Premium support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
