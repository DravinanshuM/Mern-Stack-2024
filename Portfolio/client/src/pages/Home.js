import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import pic from "../assets/myCap.png"; // Fallback image

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
        // console.log("Intro data:", response.data);
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
    <div className="max-w-[1536px] mx-auto">
      {/* Home Hero section. */}
      <div className="w-full h-auto py-2 md:py-24 bg-indigo-300 dark:bg-gradient-to-r from-black/60 to-black/60 roboto-black-italic">
        {introData && introData.length > 0 && (
          <>
            <div className="flex flex-wrap flex-col-reverse md:flex-row md:items-center lg:flex lg:items-center lg:justify-between lg:px-20">
              <div className="md:max-w-3xl lg:mx-auto p-8 shadow-lg rounded-lg cursor-pointer md:hover:scale-110 md:transition lg:ease-in-out md:hover:shadow-xl">
                <p className="text-xl text-gray-700 dark:text-white mb-2">
                  {introData[0].welcomeText || ""}
                </p>
                <p className="text-3xl text-gray-700 dark:text-white mb-3 mx-16">
                  {introData[0].firstName || ""} {introData[0].lastName || ""}
                </p>
                <p className="font-bold text-2xl mx-24 capitalize text-gray-800 dark:text-white mb-2">
                  {introData[0].caption || ""}
                </p>
                <q className="font-extrabold text-xl mx-[120px] uppercase block text-blue-700 dark:text-orange-500 mb-4">
                  {introData[0].designation || ""}
                </q>
                <span className="font-medium text-base text-gray-600 dark:text-gray-400">
                  {introData[0].description || ""}
                </span>
              </div>
              <img
                className="md:w-96 lg:max-w-sm h-auto object-cover rounded-full p-2 rotate-2 md:hover:scale-110 transition ease-in-out"
                src={introData[0].profileImage || pic}
                alt="Admin_Profile_Pic"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = pic;
                }}
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <NavLink
                to="/about"
                className="border px-4 py-2 dark:text-white rounded-lg hover:bg-indigo-500 dark:hover:bg-slate-500"
              >
                Get Started
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
