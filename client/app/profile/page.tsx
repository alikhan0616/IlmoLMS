"use client";
import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Header from "../components/Header";
import PageHead from "../components/Common/PageHead";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

const Page = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="">
      <Protected>
        <PageHead
          title={`${user.name}'s Profile`}
          description="Ilmo is an interactive E-Learning platform where all students can learn and grow together"
          keywords="Online Learning, Muhammad Ali Khan, Ali Khan, Learning, LMS, Programming, Tech"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;
