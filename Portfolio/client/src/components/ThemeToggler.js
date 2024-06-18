import React, { useEffect, useState } from 'react';
import { LuSunMoon } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";

const ThemeToggler = () => {
    // Initialize darkMode based on localStorage value
    const [darkMode, setDarkMode] = useState(() => {
        const theme = localStorage.getItem("theme");
        return theme === "dark";
    });
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
        setThemeLoaded(true);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    if (!themeLoaded) {
        return null; // Or a loading spinner, or a default div that matches your preferred default theme
    }

    return (
        <div className='w-14 h-10 md:w-16 md:h-10 flex items-center bg-gray-300 dark:bg-gray-800 cursor-pointer rounded-full p-1 mb-4 my-2 md:my-0 md:mb-0' onClick={() => setDarkMode(!darkMode)}>
            <div className='flex items-center justify-center w-1/2 h-full'>
                <LuSunMoon className={`text-indigo-800 ${darkMode ? 'opacity-0' : 'opacity-100'}`} size={24} />
            </div>
            <div className={`relative w-6 h-6 rounded-full transform transition-transform duration-300 ${darkMode ? '-translate-x-full bg-gray-900' : 'bg-indigo-800'}`}>
                <IoMoon className={`text-white ${darkMode ? 'opacity-100' : 'opacity-0'}`} size={24} />
            </div>
        </div>
    );
};

export default ThemeToggler;
