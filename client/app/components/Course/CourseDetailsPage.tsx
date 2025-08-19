import { useGetSingleUserCourseQuery } from "@/redux/features/course/courseApi";
import React, { useState } from "react";
import Loader from "../Common/Loader/Loader";
import PageHead from "../Common/PageHead";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
const CourseDetailsPage = ({ id }: any) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSingleUserCourseQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <PageHead
            title={data.course.name + " - Ilmo"}
            description={
              "Ilmo is an interactive E-Learning platform where all students can learn and grow together, developed by M. Ali Khan"
            }
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            route={route}
            setRoute={setRoute}
          />
          <CourseDetails data={data?.course} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
