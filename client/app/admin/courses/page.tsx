"use client";

import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import PageHead from "@/app/components/Common/PageHead";
import AdminProtected from "@/app/hooks/adminProtected";
import AllCourses from "../../components/Admin/Course/AllCourses";
const page = () => {
  return (
    <div>
      <AdminProtected>
        <PageHead
          title="Ilmo - Admin"
          description="Ilmo is an interactive E-Learning platform where all students can learn and grow together"
          keywords="Online Learning, Muhammad Ali Khan, Ali Khan, Learning, LMS, Programming, Tech"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16px] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] ">
            <DashboardHeader />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
