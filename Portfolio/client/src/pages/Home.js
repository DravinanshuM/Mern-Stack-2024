import React, { useCallback, useEffect } from "react";
import pic from "../assets/myCap.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import API from client-side.
import { getInroDataFunction } from "../API/Api.js";
import { setIntroData } from "../features/introSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const { introData } = useSelector((state) => state.intro);
  console.log("show Data :: ", introData);

  // get the API data.
  const getAllInto = useCallback(async () => {
    try {
      const response = await getInroDataFunction();
      // console.log("API response:", response);

      if (response && response.data && response.data.status === 200) {
        // console.log("Intro data:", response.data.introData);
        dispatch(setIntroData(response.data.introData));
      } else {
        console.error("Invalid response or status code:", response);
      }
    } catch (error) {
      console.error("Error fetching intro data:", error);
      // Handle error show a message to the user
    }
  }, [dispatch]);

  useEffect(() => {
    getAllInto();
  }, [getAllInto]);

  return (
    <div className="max-w-[1536px]">
      {/* Home Hero section. */}
      <div className="w-full h-auto py-2 md:py-24 bg-indigo-300 dark:bg-gradient-to-r from-black/60 to-black/60 roboto-black-italic">
        <div className="flex flex-warp flex-col-reverse md:flex-row md:items-center lg:flex lg:items-center lg:justify-between lg:px-20">
          <div className="md:max-w-3xl lg:mx-auto p-8 shadow-lg rounded-lg cursor-pointer md:hover:scale-110 md:transition lg:ease-in-out md:hover:shadow-xl">
            <p className="text-xl text-gray-700 dark:text-white  mb-4">
              Hello, I am Dravinanshu Mishra
            </p>
            <p className="font-bold text-3xl capitalize text-gray-800 dark:text-white mb-2">
              Professional Web Application Developer
            </p>
            <q className="font-extrabold text-4xl uppercase block text-blue-700 dark:text-orange-500 mb-4">
              MERN STACK Developer
            </q>
            <span className="font-medium text-base text-gray-600 dark:text-gray-400">
              Skilled in HTML, CSS, Tailwindcss, Material UI, Bootstrap,
              JavaScript, jQuery, PHP, MySQL, MySQLI, C, Data Structures &
              Algorithms, React.js, Node.js, Express.js, MongoDB, and REST APIs.
            </span>
          </div>
          <img
            className="md:w-96 lg:max-w-sm h-auto object-cover rounded-full p-2 rotate-2 md:hover:scale-110 transition ease-in-out"
            src={pic}
            alt="Admin_Profile_Pic"
          />
        </div>
        <div className="flex items-center justify-center">
          <NavLink
            to="/about"
            className="border px-4 py-2 dark:text-white rounded-lg hover:bg-indigo-500 dark:hover:bg-slate-500"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
