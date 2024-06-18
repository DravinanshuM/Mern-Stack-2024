// Spinner.js
import React from 'react';

const Spinner = ({ text }) => {
  return (
    <div className='flex items-center justify-center h-screen pt-20 dark:bg-black/70 bg-indigo-300'>
      <div className='border-t-8 border-b-8 dark:border-orange-400 border-indigo-500 w-12 h-12 animate-spin mr-3'></div>
      <h1 className='text-xl dark:text-orange-400 text-indigo-600'>{text}</h1>
    </div>
  );
};

export default Spinner;
