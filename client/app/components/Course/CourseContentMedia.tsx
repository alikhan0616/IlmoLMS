import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import defaultAvatar from "../../../public/assets/avatar.jpg";
type Props = {
  data: any;
  id: string;
  setActiveVideo: (activeVideo: number) => void;
  activeVideo: number;
  user: any;
};
const CourseContentMedia = ({
  data,
  id,
  setActiveVideo,
  activeVideo,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [questions, setQuestions] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const alreadyReviewd = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const handleCommentSubmit = () => {};
  const handleReviewSubmit = () => {};
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8] "
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === data.length - 1 && "!cursor-no-drop opacity-[.8] "
          }`}
          onClick={() =>
            setActiveVideo(
              data && activeVideo === data.length - 1
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <AiOutlineArrowRight className="mr-2" />
          Next Lesson
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">{data[activeVideo].title}</h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-800  backdrop-blur shadow-[bg-slate-700] rounded">
        {["Overview", "Resources", "Q&A", "Reviews"].map(
          (text: string, index: number) => (
            <h5
              key={index}
              className={`800px:text-[20px] text-white cursor-pointer ${
                activeBar === index && "!text-red-500"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          )
        )}
      </div>
      <br />

      {/* OverView */}
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}

      {/* Resources */}
      {activeBar === 1 && (
        <div className="">
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mt-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item.title && item.title + " :"}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] underline 800px:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Q & A */}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : defaultAvatar}
              width={50}
              height={50}
              alt="user-icon"
              className="w-[50px] h-[50px] rounded-full object-contain"
            />
            <textarea
              name=""
              id=""
              value={questions}
              cols={40}
              rows={5}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="Write your question..."
              className="outline-none trasnparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5`}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div className="">No Questionss</div>
        </>
      )}

      {/* Reviews */}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!alreadyReviewd && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar.url : defaultAvatar}
                    width={50}
                    height={50}
                    alt="user-icon"
                    className="w-[50px] h-[50px] rounded-full object-contain"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500]">
                      Give Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="w-full flex ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="This was good..."
                      cols={40}
                      rows={5}
                      className="outline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2`}
                    onClick={handleReviewSubmit}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
