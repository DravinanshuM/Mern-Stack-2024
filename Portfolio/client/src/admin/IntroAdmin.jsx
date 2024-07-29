import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// import API from client-side.
import { getInroDataFunction, updateIntroDataFunction } from "../API/Api.js";
import { setIntroData } from "../features/introSlice.js";

const IntroAdmin = () => {
  const [formData, setFormData] = useState({
    welcomeText: "",
    firstName: "",
    lastName: "",
    caption: "",
    designation: "",
    description: "",
    ProfileImage: "",
  });

  const { introData } = useSelector((state) => state.intro);
  // console.log("useSelector inside get data :: ", introData);
  const dispatch = useDispatch();

  // get the API data.
  const getAllInto = useCallback(async () => {
    try {
      const response = await getInroDataFunction();
      // console.log("API response:", response);
      if (response && response.data && response.data.status === 200) {
        // console.log("Intro data:", response.data);
        dispatch(setIntroData(response.data.introData));
        setFormData(response?.data?.introData);
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

  useEffect(() => {
    if (introData) {
      setFormData({
        welcomeText: introData[0].welcomeText || "",
        firstName: introData[0].firstName || "",
        lastName: introData[0].lastName || "",
        caption: introData[0].caption || "",
        designation: introData[0].designation || "",
        description: introData[0].description || "",
        ProfileImage: introData[0].ProfileImage || "",
      });
    }
  }, [introData]);

  // handleformsubmit
  const handleformsubmit = async (e) => {
    e.preventDefault();
    // console.log("formdata ::", formData);
    try {
      const response = await updateIntroDataFunction({
        ...formData,
        _id: introData[0]._id,
      });

      console.log(formData);

      if (response?.data?.status === 200) {
        let message = response?.data?.message;
        console.log("formdata ::", response);
        toast.success(message);
      } else {
        toast.error("Something went wrong during updating the intro component");
      }
    } catch (error) {
      console.log("Error during updating the home components ::", error);
    }
  };

  return (
    <div className="w-full max-w-screen-lg p-4 border-2 border-indigo-500 dark:border-white">
      <form
        className="px-4 py-4"
        onSubmit={handleformsubmit}
        enctype="multipart/form-data"
      >
        {/* Welcome Text */}
        <div className="mb-6 mx-2">
          <label
            htmlFor="welcomeText"
            className="block text-lg font-medium text-gray-800 dark:text-white mb-2"
          >
            Welcome Text
          </label>
          <input
            type="text"
            id="welcomeText"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter welcome text..."
            aria-label="Enter welcome text"
            value={formData.welcomeText}
            onChange={(e) =>
              setFormData({ ...formData, welcomeText: e.target.value })
            }
          />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2">
          {/* First Name */}
          <div className="mx-2">
            <label
              htmlFor="firstName"
              className="block text-lg font-medium text-gray-800 dark:text-white mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter first name"
              aria-label="Enter first name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          {/* Last Name */}
          <div className="mx-2">
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-800 dark:text-white mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter last name"
              aria-label="Enter last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          {/* Caption */}
          <div className="mx-2">
            <label
              htmlFor="caption"
              className="block text-lg font-medium text-gray-800 dark:text-white mb-2"
            >
              Caption
            </label>
            <input
              type="text"
              id="caption"
              name="caption"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter caption"
              aria-label="Enter caption"
              value={formData.caption}
              onChange={(e) =>
                setFormData({ ...formData, caption: e.target.value })
              }
            />
          </div>

          {/* Designation */}
          <div className="mx-2">
            <label
              htmlFor="designation"
              className="block text-lg font-medium text-gray-800 dark:text-white mb-2"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter designation"
              aria-label="Enter designation"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="col-span-2 mx-2">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-800 dark:text-white mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
              aria-label="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
          </div>

          {/* Profile Image */}
          <div className="col-span-2 mx-2">
            <label
              htmlFor="profileImage"
              className="block text-lg font-medium text-gray-800 dark:text-white mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept=".png, .jpeg, .jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              aria-label="Enter upload profile image"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="submit"
            className="px-4 py-2 text-lg text-white bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
          <button
            type="reset"
            className="px-4 py-2 text-lg text-white bg-slate-400 hover:bg-slate-600 dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:outline-none dark:focus:bg-orange-400 dark:focus:ring-2 dark:focus:ring-orange-500 border border-transparent dark:border-orange-500 rounded-md"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default IntroAdmin;
