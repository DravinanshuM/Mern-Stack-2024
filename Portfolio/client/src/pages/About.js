import React, { useCallback, useEffect } from "react";
import banner from "../assets/new.png";
import SectionTitle from "../components/SectionTitle.js";
import { Experience, Project } from "./index.js";
import { getAboutFunction } from "../API/Api.js";
import { useDispatch, useSelector } from "react-redux";
import { setAboutData } from "../features/aboutSlice.js";

const About = () => {
  const dispatch = useDispatch();
  const { aboutData } = useSelector((state) => state.about);

  // Fetch all About data.
  const getAllAbout = useCallback(async () => {
    try {
      const response = await getAboutFunction();
      if (response?.data?.status === 200) {
        dispatch(setAboutData(response.data.aboutData));
      } else {
        console.error("Invalid response or status code:", response);
      }
    } catch (error) {
      console.error("Error fetching intro data:", error);
      // Handle error, show a message to the user
    }
  }, [dispatch]);

  // Fetch data on component mount.
  useEffect(() => {
    getAllAbout();
  }, [getAllAbout]);

  return (
    <div className="w-full h-auto py-6 pt-20 md:py-24 bg-indigo-300 dark:bg-gradient-to-r from-black/60 to-black/60">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <h1 className="text-black dark:text-white text-lg md:text-2xl font-semibold md:font-bold">
          About Us
        </h1>
        <div className="md:w-20 w-12 border-b-4 dark:border-yellow-500 mt-2 md:mt-4 rounded-xl mb-4 md:mb-8"></div>
      </div>
      {aboutData && aboutData.length > 0 && (
        <>
          {/* Introduction Section */}
          <div className="w-full flex flex-wrap justify-center md:justify-around px-4 md:px-7 text-center md:text-start">
            <div className="w-full md:w-1/2 mb-6 md:mb-0 order-2 md:order-1 border-2 border-slate-200 p-7 rounded-xl">
              <h2 className="text-xl font-semibold mb-2 text-black dark:text-white uppercase">
                Introduction
              </h2>
              <div className="border-b-4 dark:border-yellow-500 mx-auto md:mx-0 mt-2 md:mt-4 mb-4 md:mb-8 w-20 md:w-60 rounded-xl"></div>
              <div className="text-justify md:text-md text-gray-700 dark:text-white leading-7 text-base px-4 md:px-0">
                <p>{aboutData[0].description || "description"}</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                className="w-80 bg-transparent rounded-3xl mb-12"
                src={aboutData[0].profile || banner}
                alt="Banner_Image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = banner;
                }}
              />
            </div>
          </div>
          {/* Recently working */}
          <div className="flex items-center justify-center md:mt-7 mt-0">
            <div className="w-[85%] mt-7">
              <h1 className="md:mx-5 md:text-xl text-lg font-semibold dark:text-white text-gray-900 mb-4">
                Here are a few technologies I've been working with recently:
              </h1>
              <div className="md:mx-5 flex flex-wrap md:gap-7 gap-4">
                {aboutData[0].skills.map((skill, index) => (
                  <div
                    key={index}
                    className="border-2 dark:border-slate-400 p-2 dark:text-white rounded-lg"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Experience Section */}
      <section
        id="experiences"
        className="flex items-center justify-center md:mt-10 mt-0"
      >
        <div className="w-[85%]">
          <div className="md:mx-5">
            <SectionTitle title="Experiences" />
          </div>
          <div>
            <Experience />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="flex items-center justify-center md:mt-10 mt-0"
      >
        <div className="w-[85%]">
          <div className="md:mx-5">
            <SectionTitle title="Projects" />
          </div>
          <div>
            <Project />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
