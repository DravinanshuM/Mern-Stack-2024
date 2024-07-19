import React from "react";
import ThemeToggler from "../components/ThemeToggler.js";

const AdminHeader = () => {
  return (
    <header className="w-full dark:bg-black bg-indigo-300 dark:text-white">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-mono font-extrabold text-xl">Admin Panels</h1>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block font-semibold text-lg hover:text-indigo-700 dark:hover:text-red-500">
            Theme Switcher
          </div>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
