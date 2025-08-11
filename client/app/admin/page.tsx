"use client";

import PageHead from "../components/Common/PageHead";
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/DashboardHero";
import AdminProtected from "../hooks/adminProtected";
const Page = () => {
  return (
    <div className="">
      <AdminProtected>
        <PageHead
          title="Ilmo - Admin"
          description="Ilmo is an interactive E-Learning platform where all students can learn and grow together"
          keywords="Online Learning, Muhammad Ali Khan, Ali Khan, Learning, LMS, Programming, Tech"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] ">
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
