"use client";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import PageHead from "../../components/Common/PageHead";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
const Page = () => {
  return (
    <div>
      <PageHead
        title="Ilmo - Admin"
        description="Ilmo is an interactive E-Learning platform where all students can learn and grow together"
        keywords="Online Learning, Muhammad Ali Khan, Ali Khan, Learning, LMS, Programming, Tech"
      />
      <div className="flex">
        <div className="1500px:w-[16px] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%] ">
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default Page;
