import React from "react";

const contactAdmin = () => {
  return (
    <>
      <div className="w-full max-w-screen-lg p-4 border-2 border-indigo-500 dark:border-white">
        <form className="px-4 py-4">
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
                type="text"
                id="profileImage"
                name="profileImage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter profile image URL"
                aria-label="Enter profile image URL"
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
    </>
  );
};

export default contactAdmin;
