import React, { useState } from 'react';
import { Projects } from '../resources/Projects.js';
import { NavLink } from 'react-router-dom';

const Project = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <div className='flex flex-col flex-wrap md:flex-row gap-10 md:mx-5 py-5'>
      <div className='flex flex-wrap md:flex-col flex-row gap-7 md:border-l-4 border-t-4 md:border-t-0 md:border-gray-500 rounded-md'>
        {Projects.map((project, index) => (
          <div key={project._id} className='cursor-pointer' onClick={() => setSelectedItemIndex(index)}>
            <h1
              className={`md:text-xl px-5 py-2 text-md rounded-md ${
                selectedItemIndex === index
                  ? 'text-white dark:border-yellow-500 md:border-l-4 border-t-4 md:border-t-0 md:-ml-1 -mt-1 dark:bg-black/55 bg-indigo-500'
                  : 'dark:text-white text-black'
              }`}
            >
              {project.title}
            </h1>
          </div>
        ))}
      </div>
      <div className='w-full md:w-1/3'>
        <img
          src={Projects[selectedItemIndex].image}
          className='w-full h-auto object-contain rounded-lg'
          alt={Projects[selectedItemIndex].title}
          title={Projects[selectedItemIndex].title}
        />
      </div>
      <div className='flex flex-col gap-5 w-full md:w-1/3'>
        <h1 className='text-orange-500 text-2xl'>{Projects[selectedItemIndex].title}</h1>
        <p className='text-white text-md'>{Projects[selectedItemIndex].description}</p>
        <NavLink 
          to={Projects[selectedItemIndex].link} 
          className='dark:text-white text-md hover:underline text-md dark:hover:text-white/25 hover:text-indigo-900'
          target="_blank"
        >
          {Projects[selectedItemIndex].link}
        </NavLink>
      </div>
    </div>
  );
}

export default Project;
