"use client";

import { useState } from "react";
import PageHead from "../components/Common/PageHead";
import Header from "../components/Header";
import Policy from "./Policy";

const Page = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  return (
    <div className="">
      <PageHead
        title="Policy - Ilmo"
        description="Ilmo is an interactive E-Learning platform where all students can learn and grow together, developed by M. Ali Khan"
        keywords="Online Learning, Muhammad Ali Khan, Ali Khan, Learning, LMS, Programming, Tech"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Policy />
    </div>
  );
};

export default Page;
