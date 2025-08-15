"use client";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import PageHead from "../../components/Common/PageHead";
import EditHero from "../../components/Admin/Customization/EditHero";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import AdminProtected from "../../hooks/adminProtected";
const Page = () => {
  return (
    <div>
      <AdminProtected>
        <PageHead
          title="Ilmo - Admin"
          description="Ilmo is an interactive E-Learning platform where all students can learn and grow together"
          keywords="Online Learning, Muhammad Ali Khan, Ali Khan, Learning, LMS, Programming, Tech"
        />
        <div className="flex">
          <div className="1500px:w-[16px] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[80%] ">
            <DashboardHeader />
            {/* <CreateCourse /> */}
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
