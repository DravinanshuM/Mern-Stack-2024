import React, { useCallback, useEffect, useState } from "react";
import { getExperienceFunction } from "../API/Api.js";
import { useDispatch, useSelector } from "react-redux";
import { setExperienceData } from "../features/experineceSlice.js";

const Experience = () => {
  const dispatch = useDispatch();
  const { experienceData } = useSelector((state) => state.experience);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // Fetch all experienceData.
  const getAllExperience = useCallback(async () => {
    try {
      const response = await getExperienceFunction();
      if (response?.data?.status === 200) {
        dispatch(setExperienceData(response.data.experienceData));
      } else {
        console.log("Unexpected response structure or status code.");
      }
    } catch (error) {
      console.error("Error during fetching data from server side:", error);
    }
  }, [dispatch]);

  // Fetch data on component mount.
  useEffect(() => {
    getAllExperience();
  }, [getAllExperience]);

  return (
    <div className="flex flex-col flex-wrap md:flex-row gap-10 md:mx-5 py-5">
      {experienceData && experienceData.length > 0 ? (
        <>
          <div className="flex flex-wrap md:flex-col flex-row gap-7 md:border-l-4 border-t-4 md:border-t-0 md:border-gray-500 rounded-md">
            {experienceData.map((experience, index) => (
              <div
                key={experience._id}
                className="cursor-pointer"
                onClick={() => setSelectedItemIndex(index)}
              >
                <h1
                  className={`md:text-xl px-5 py-2 text-md rounded-md ${
                    selectedItemIndex === index
                      ? "text-white dark:border-yellow-500 md:border-l-4 border-t-4 md:border-t-0 md:-ml-1 -mt-1 dark:bg-black/55 bg-indigo-500"
                      : "dark:text-white text-black"
                  }`}
                >
                  {experience.period}
                </h1>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/4">
            <img
              className="w-full h-auto object-contain rounded-lg"
              src={
                experienceData[selectedItemIndex]?.coverImage ||
                "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
              }
              alt="logo"
              title={
                experienceData[selectedItemIndex]?.company || "Company Name"
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630";
              }}
            />
          </div>
          <div className="flex flex-col gap-5 w-full md:w-1/3">
            <h1 className="text-orange-500 text-2xl">
              {experienceData[selectedItemIndex].title || "Title"}
            </h1>
            <div className="text-white text-lg">
              {experienceData[selectedItemIndex].company || "Unknown"}
            </div>
            <p className="text-white text-md">
              {experienceData[selectedItemIndex].description ||
                "No description available"}
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No data Available</p>
        </div>
      )}
    </div>
  );
};

export default Experience;
