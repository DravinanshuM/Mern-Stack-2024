import React, { useState } from 'react';
import { Experiences } from '../resources/Experiences.js';

const Experience = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return (
    <div className='flex flex-col flex-wrap md:flex-row gap-10 md:mx-5 py-5'>
      <div className='flex flex-wrap md:flex-col flex-row gap-7 md:border-l-4 border-t-4 md:border-t-0 md:border-gray-500 rounded-md'>
        {Experiences.map((experience, index) => (
          <div
            key={experience._id}
            className='cursor-pointer'
            onClick={() => setSelectedItemIndex(index)}
          >
            <h1
              className={`md:text-xl px-5 py-2 text-md rounded-md ${
                selectedItemIndex === index
                  ? 'text-white dark:border-yellow-500 md:border-l-4 border-t-4 md:border-t-0 md:-ml-1 -mt-1 dark:bg-black/55 bg-indigo-500'
                  : 'dark:text-white text-black'
              }`}
            >
              {experience.period}
            </h1>
          </div>
        ))}
      </div>
      <div className='w-full md:w-1/3'>
        <img
          className='w-full h-auto object-contain rounded-lg'
          src='https://lh3.googleusercontent.com/brMUWv-6OauWDOupAE4SO-HhAh7vTWu0uRGHXTsTjONifDekiLcm7xrql2VX47ignbdnhbd4JHlIuQyXCxmqY-u_OA=w640-h400-e365-rj-sc0x00ffffff'
          alt="logo"
          title={`${Experiences[selectedItemIndex].company}`}
        />
      </div>
      <div className='flex flex-col gap-5 w-full md:w-1/3'>
        <h1 className='text-orange-500 text-2xl'>{Experiences[selectedItemIndex].title}</h1>
        <div className='text-white text-lg'>{Experiences[selectedItemIndex].company}</div>
        <p className='text-white text-md'>{Experiences[selectedItemIndex].description}</p>
      </div>
    </div>
  );
};

export default Experience;
