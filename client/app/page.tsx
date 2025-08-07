"use client";
import { useState } from "react";
import Header from "../app/components/Header";
import Hero from "../app/components/Route/Hero";
import PageHead from "./components/Common/PageHead";

const Page = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div className="">
      <PageHead
        title="Ilmo - LMS"
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
      <Hero />
    </div>
  );
};

export default Page;
