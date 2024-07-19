import React from "react";
// import "./style.css";
import AdminHeader from "./AdminHeader";
import { Tabs } from "antd";
import IntroAdmin from "./IntroAdmin.jsx";
import AboutAdmin from "./AboutAdmin.jsx";
import ExperiencesAdmin from "./ExpeeiencesAdmin.jsx";
import ProjectAdmin from "./ProjectsAdmin.jsx";
import ContactAdmin from "./contactAdmin.jsx";

const index = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "101",
      label: (
        <div className="font-semibold text-xl dark:text-white dark:hover:text-indigo-500">
          Intro
        </div>
      ),
      children: <IntroAdmin />,
    },
    {
      key: "201",
      label: (
        <div className="font-semibold text-xl dark:text-white dark:hover:text-indigo-500">
          About
        </div>
      ),
      children: <AboutAdmin />,
    },
    {
      key: "301",
      label: (
        <div className="font-semibold text-xl dark:text-white dark:hover:text-indigo-500">
          Experiences
        </div>
      ),
      children: <ExperiencesAdmin />,
    },
    {
      key: "401",
      label: (
        <div className="font-semibold text-xl dark:text-white dark:hover:text-indigo-500">
          Projects
        </div>
      ),
      children: <ProjectAdmin />,
    },
    {
      key: "501",
      label: (
        <div className="font-semibold text-xl dark:text-white dark:hover:text-indigo-500">
          Contact Us
        </div>
      ),
      children: <ContactAdmin />,
    },
  ];
  return (
    <>
      {/* Header */}
      <div className="fixed w-full z-50">
        <AdminHeader />
      </div>
      <div className="max-w-full px-7 py-5 bg-indigo-200 dark:bg-black/75 pt-24">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default index;
