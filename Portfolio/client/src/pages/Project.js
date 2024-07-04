import React, { useCallback, useEffect, useState } from "react";
// import { projectData } from "../resources/projectData.js";
import { NavLink } from "react-router-dom";
import { getProjectFunction } from "../API/Api.js";
import { useDispatch, useSelector } from "react-redux";
import { setProjectData } from "../features/projectSlice.js";

const Project = () => {
  const dispatch = useDispatch();
  const { projectData } = useSelector((state) => state.project);
  // console.log(projectData);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // getAllProject.
  const getAllProject = useCallback(async () => {
    try {
      const response = await getProjectFunction();
      // console.log("get projcet all data ::", response);
      if (response?.data?.status === 200) {
        dispatch(setProjectData(response.data.projectData));
      }
    } catch (error) {
      console.log("Error fetching during the fetching project data", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllProject();
  }, [getAllProject]);

  return (
    <div className="flex flex-col flex-wrap md:flex-row gap-10 md:mx-5 py-5">
      {projectData && projectData.length > 0 ? (
        <>
          <div className="flex flex-wrap md:flex-col flex-row gap-7 md:border-l-4 border-t-4 md:border-t-0 md:border-gray-500 rounded-md">
            {projectData.map((experience, index) => (
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
                projectData[selectedItemIndex]?.coverImage ||
                "https://static4.depositphotos.com/1013501/430/i/450/depositphotos_4308060-stock-photo-project.jpg"
              }
              alt="logo"
              title={projectData[selectedItemIndex]?.company || "Company Name"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://static4.depositphotos.com/1013501/430/i/450/depositphotos_4308060-stock-photo-project.jpg";
              }}
            />
          </div>
          <div className="flex flex-col gap-5 w-full md:w-1/3">
            <h1 className="text-orange-500 text-2xl">
              {projectData[selectedItemIndex].title || "Title"}
            </h1>
            <div className="text-white text-lg">
              {projectData[selectedItemIndex].company || "Unknown"}
            </div>
            <p className="text-white text-md">
              {projectData[selectedItemIndex].description ||
                "No description available"}
            </p>
            <NavLink
              to={projectData[selectedItemIndex].project_url}
              className="dark:text-white text-md hover:underline text-md dark:hover:text-white/25 hover:text-indigo-900"
              target="_blank"
            >
              {projectData[selectedItemIndex].project_url}
            </NavLink>
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

export default Project;
