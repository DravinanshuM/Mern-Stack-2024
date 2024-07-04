import React, { useCallback, useEffect } from "react";
import SectionTitle from "../components/SectionTitle.js";
import { getContactFunction } from "../API/Api.js";
import { useDispatch, useSelector } from "react-redux";
import { setContactData } from "../features/contectSlice.js";

const Contact = () => {
  const dispatch = useDispatch();
  const { contactData } = useSelector((state) => state.contact);
  console.log("ContactData ::: ", contactData);

  //getContact.
  const getContact = useCallback(async () => {
    try {
      const response = await getContactFunction();
      console.log("Get Contact :: ", response);
      if (response?.data?.status === 200) {
        dispatch(setContactData(response.data.contactData));
      }
      // dispatch(setContactData())
    } catch (error) {
      console.error("Error while fetching Contact data from server :: ", error);
    }
  }, [dispatch]);

  // useEffcet.
  useEffect(() => {
    getContact();
  }, [getContact]);

  return (
    <div className="w-full h-auto py-20 md:py-24 max-w-[1536px] mx-auto bg-indigo-300 dark:bg-gradient-to-r from-black/60 to-black/60 roboto-regular">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <h1 className="text-black dark:text-white text-lg md:text-2xl font-semibold md:font-bold">
          Contact Us
        </h1>
        <div className="md:w-20 w-12 border-b-4 dark:border-yellow-500 mt-2 md:mt-4 rounded-xl mb-4 md:mb-8"></div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center">
        <div className="w-[95%] flex flex-col md:flex-row justify-between bg-indigo-400 dark:bg-slate-500 rounded-lg p-4 md:p-8">
          {/* details */}
          <div className="w-full md:w-1/2 mb-5 md:mb-0 px-4">
            <SectionTitle title="Say Hello," />
            <div className="w-full md:w-auto">
              <h1 className="dark:text-white text-black md:text-lg">{"{"}</h1>
              {contactData && contactData.length > 0 ? (
                <div className="px-4 py-1">
                  <div className="text-lg font-semibold">
                    Name:{" "}
                    <span className="font-normal">{contactData[0].name}</span>
                  </div>
                  <div className="text-lg font-semibold">
                    Email:{" "}
                    <span className="font-normal">{contactData[0].email}</span>
                  </div>
                  <div className="text-lg font-semibold">
                    Designation:{" "}
                    <span className="font-normal">
                      {contactData[0].designation}
                    </span>
                  </div>
                  <div className="text-lg font-semibold">
                    Gender:{" "}
                    <span className="font-normal">{contactData[0].gender}</span>
                  </div>
                  <div className="text-lg font-semibold">
                    Mobile:{" "}
                    <span className="font-normal">{contactData[0].mobile}</span>
                  </div>
                  <div className="text-lg font-semibold">
                    Address:{" "}
                    <span className="font-normal">
                      {contactData[0].address}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-900 text-lg px-4 py-1">
                  No Data Available
                </div>
              )}

              <h1 className="dark:text-white text-black md:text-lg">{"}"}</h1>
            </div>
          </div>

          {/* forms */}
          <div className="w-full md:w-1/2 px-4 py-7">
            <form
              action="https://formspree.io/f/mrgnvqav"
              method="post"
              className="w-full"
            >
              <div className="mb-4">
                <label
                  className="block text-black dark:text-white mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
                  autoComplete="off"
                  placeholder="Enter The Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-black dark:text-white mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
                  autoComplete="off"
                  placeholder="Enter The Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-black dark:text-white mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
                  rows="4"
                  placeholder="Enter The Message"
                  autoComplete="off"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-indigo-500 dark:bg-yellow-500 text-white dark:text-black p-2 rounded-md hover:bg-indigo-600 dark:hover:bg-yellow-600 w-full md:w-auto"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
