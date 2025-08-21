import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import defaultAvatar from "../../../public/assets/avatar.jpg";
import toast from "react-hot-toast";
import {
  useAddAnswertoQuestionMutation,
  useAddNewQuestionMutation,
} from "@/redux/features/course/courseApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
type Props = {
  data: any;
  id: string;
  setActiveVideo: (activeVideo: number) => void;
  activeVideo: number;
  user: any;
  refetch: any;
};
const CourseContentMedia = ({
  data,
  id,
  setActiveVideo,
  activeVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [questionId, setQuestionId] = useState("");

  const [
    addNewQuestion,
    {
      isSuccess: questionSuccess,
      isLoading: questionLoading,
      error: questionError,
    },
  ] = useAddNewQuestionMutation();

  const [
    addAddAnswertoQuestion,
    { isSuccess: answerSuccess, error: answerError, isLoading: answerLoading },
  ] = useAddAnswertoQuestionMutation();

  const alreadyReviewd = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const handleQuestionSubmit = () => {
    if (question.length < 11) {
      toast.error("Question should be atleast 10 characters long!");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (questionSuccess) {
      toast.success("Question added successfully!");
      setQuestion("");
      refetch();
    }

    if (questionError) {
      if ("data" in questionError) {
        const errorData = questionError.data as {
          success?: boolean;
          message?: string;
        };
        toast.error(errorData?.message || "Adding comment failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [questionSuccess, questionError, refetch]);

  useEffect(() => {
    if (answerSuccess) {
      toast.success("Answer added successfully!");
      setAnswers({});
      setQuestionId("");
      refetch();
    }

    if (answerError) {
      if ("data" in answerError) {
        const errorData = answerError.data as {
          success?: boolean;
          message?: string;
        };
        toast.error(errorData?.message || "Adding answer failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [answerSuccess, answerError, refetch]);

  const handleReviewSubmit = () => {};

  const handleAnswerSubmit = (currentQuestionId: string) => {
    const currentAnswer = answers[currentQuestionId];
    if (!currentAnswer || !currentAnswer.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    addAddAnswertoQuestion({
      answer: currentAnswer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: currentQuestionId,
    });
  };

  // Update the answer for a specific question
  const updateAnswer = (questionId: string, answerText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerText,
    }));
  };

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
      <div className="w-full p-4 flex items-center justify-between bg-blue-200 dark:bg-slate-800   backdrop-blur shadow-[bg-slate-700] rounded">
        {["Overview", "Resources", "Q&A", "Reviews"].map(
          (text: string, index: number) => (
            <h5
              key={index}
              className={`800px:text-[20px] text-black dark:text-white cursor-pointer ${
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
              src={user.avatar ? user.avatar?.url : defaultAvatar}
              width={50}
              height={50}
              alt="user-icon"
              className="w-[50px] h-[50px] rounded-full object-contain"
            />
            <textarea
              name=""
              id=""
              value={question}
              cols={40}
              rows={5}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Write your question..."
              className="outline-none trasnparent ml-3 border border-slate-600 dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionLoading ? "cursor-no-drop" : "cursor-pointer"
              }`}
              onClick={questionLoading ? () => {} : handleQuestionSubmit}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-slate-700 dark:bg-[#ffffff3b]"></div>
          <br />
          <div className="">
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answers={answers}
              updateAnswer={updateAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerLoading={answerLoading}
            />
          </div>
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

const CommentReply = ({
  data,
  activeVideo,
  user,
  answers,
  updateAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((question: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            question={question}
            index={index}
            answers={answers}
            updateAnswer={updateAnswer}
            setQuestionId={setQuestionId}
            answerLoading={answerLoading}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  setQuestionId,
  answers,
  question,
  updateAnswer,
  handleAnswerSubmit,
  answerLoading,
  user,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  const currentAnswer = answers[question._id] || "";

  const handleSubmit = () => {
    handleAnswerSubmit(question._id);
  };

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div className="">
            <Image
              alt="user-img"
              src={question?.user?.avatar?.url || defaultAvatar}
              width={50}
              height={50}
              className="h-[50px] w-[50px] object-contain rounded-full"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{question?.user?.name}</h5>
            <p>{question?.question}</p>
            <small className="text-slate-700 dark:text-[#ffffff83]">
              {format(question.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-slate-700 dark:text-[#ffffff86] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(question._id);
            }}
          >
            {!replyActive
              ? question.questionReplies?.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage size={20} className="cursor-pointer items-center" />
          <span className="pl-1 mt-[-px] cursor-pointer text-slate-700 dark:text-[#ffffff83] ">
            {question.questionReplies?.length}
          </span>
        </div>
        {replyActive && (
          <>
            {question.questionReplies.map((reply: any, index: number) => (
              <div className="w-full flex 800px:ml-16 my-5" key={index}>
                <div className="">
                  <Image
                    alt="user-img"
                    src={reply?.user?.avatar?.url || defaultAvatar}
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px] object-contain rounded-full"
                  />
                </div>
                <div className="pl-2">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{reply.user.name}</h5>
                    {reply.user.role === "admin" && (
                      <VscVerifiedFilled className="ml-2 text-[#50c750] text-[20px]" />
                    )}
                  </div>
                  <p>{reply.answer}</p>
                  <span className="text-slate-700 dark:text-[#ffffff83]">
                    {format(reply.createdAt)} •
                  </span>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative 800px:ml-16 mt-4">
                <Image
                  src={user?.avatar?.url || defaultAvatar}
                  width={40}
                  height={40}
                  alt="user-avatar"
                  className="w-[40px] h-[40px] rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter answer..."
                    value={currentAnswer}
                    onChange={(e) => updateAnswer(question._id, e.target.value)}
                    className="w-full outline-none bg-transparent border-b border-slate-700 dark:border-[#fff] p-[5px] text-black dark:text-white"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && currentAnswer.trim()) {
                        handleSubmit();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={`mt-2 px-4 py-1 bg-blue-500 text-white rounded transition-all ${
                      answerLoading || !currentAnswer.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-600 cursor-pointer"
                    }`}
                    onClick={handleSubmit}
                    disabled={!currentAnswer.trim() || answerLoading}
                  >
                    {answerLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
