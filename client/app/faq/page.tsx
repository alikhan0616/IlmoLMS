"use client";

import { useState } from "react";
import PageHead from "../components/Common/PageHead";
import Header from "../components/Header";
import FAQ from "../components/FAQ/FAQ";

const Page = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  return (
    <div className="">
      <PageHead
        title="FAQ - Ilmo"
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
      <FAQ />
    </div>
  );
};

export default Page;
