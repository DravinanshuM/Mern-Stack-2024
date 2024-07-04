import React from "react";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-black/75 bg-indigo-300">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-lg text-gray-700 dark:text-white">
          Oops! Something went wrong.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;
