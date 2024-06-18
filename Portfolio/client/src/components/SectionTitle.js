import React from 'react';

const SectionTitle = ({title}) => {
  return (
    <div className='flex items-center gap-10 justify-start flex-row py-10'>
        <h1 className='text-2xl dark:text-white text-black font-semibold'>{title}</h1>
        <p className='w-40 h-[4px] bg-white dark:bg-yellow-400  rounded-lg mt-2'></p>
    </div>
  )
}

export default SectionTitle