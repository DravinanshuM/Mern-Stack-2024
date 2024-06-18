import React from 'react';
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneAlt, FaLinkedin, FaGithub, FaFacebook, FaHandPointRight, FaAddressCard } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { RiProjectorFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { saveAs } from 'file-saver';


const Footer = () => {

  const downloadResume = () => {
    // Assuming you have the PDF file URL
    const resumeUrl = 'https://example.com/path/to/resume.pdf';
    
    // Fetch the PDF file
    fetch(resumeUrl)
      .then(response => response.blob())
      .then(blob => {
        // Save the PDF file using FileSaver.js
        saveAs(blob, 'resume.pdf');
      })
      .catch(error => {
        console.error('Error fetching the PDF file:', error);
      });
};

  return (
    <div className='w-full h-auto bg-indigo-200 dark:bg-gray-800'>
      <div className='container mx-auto px-8 py-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h2 className='text-2xl font-semibold text-black dark:text-white mb-5'>DM Portfolio</h2>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <MdMarkEmailUnread className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55' size={20}/>
                <NavLink to="mailto:dravinanshu98@gmail.com" className='text-lg text-black dark:text-white hover:text-black/70 dark:hover:text-white/55'>
                  dravinanshu98@gmail.com
                </NavLink>
              </div>
              <div className='flex items-center gap-2'>
                <FaPhoneAlt className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55' size={20}/>
                <NavLink to="tel:+919651244924" className='text-lg text-black dark:text-white cursor-pointer hover:text-black/70 dark:hover:text-white/55'>
                  (+91) 9651244924
                </NavLink>
              </div>
              <div className='flex items-center gap-4 pt-2'>
                <NavLink to="https://www.facebook.com/dravinanshu.mishra" target="_blank">
                  <FaFacebook className='text-black dark:text-white hover:text-black/60 dark:hover:text-white/60' size={25}/>
                </NavLink>
                <NavLink to="https://www.linkedin.com/in/dravinanshu-mishra-5005712b9" target="_blank">
                  <FaLinkedin className='text-black dark:text-white hover:text-black/60 dark:hover:text-white/60' size={25}/>
                </NavLink>
                <NavLink to="https://github.com/DravinanshuM" target="_blank">
                  <FaGithub className='text-black dark:text-white hover:text-black/60 dark:hover:text-white/60' size={25}/>
                </NavLink>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-semibold text-black dark:text-white mb-5'>About Us</h2>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <GrUserExpert className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55' size={20}/>
                <span className='text-lg text-black dark:text-white'>
                  <NavLink id='introduction' to="/about" className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55'>
                    Introduction
                  </NavLink>
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <FaHandPointRight className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55' size={20}/>
                <span className='text-lg text-black dark:text-white'>
                  <NavLink id='experiences' to="/about" className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55'>
                    Experiences
                  </NavLink>
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <RiProjectorFill className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55' size={20}/>
                <span className='text-lg text-black dark:text-white'>
                  <NavLink id='projects' to="/about" className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55'>
                    Projects
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-semibold text-black dark:text-white mb-5'>Dravinanshu Mishra</h2>
            <div className='space-y-4'>
              <div className='flex items-center gap-2' onClick={downloadResume} style={{cursor: 'pointer'}}>
                <FaAddressCard className='text-black dark:text-white hover:text-black/70 dark:hover:text-white/55' size={20}/>
                <span className='text-lg text-black dark:text-white hover:text-black/70 dark:hover:text-white/55'>
                  Download CV
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center text-black dark:text-white py-5 text-md font-medium'>
          &copy; 2024 Crafted with care by Dravinanshu Mishra
        </div>
      </div>
    </div>
  );
}

export default Footer;
