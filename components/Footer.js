'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    const [theme, setTheme] = useState('dark');

    // Load the theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    // Toggle between themes and persist in localStorage
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <footer className=" bg-bg dark:bg-gray-100 text-gray-400 dark:text-gray-800 py-6 flex flex-col items-center sm:block gap-5">
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-3 px-8">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <p className="text-sm">&copy; 2024 </p>
                    <button
                        className="flex items-center gap-1 text-gray-400 dark:text-gray-800 hover:text-slate-300 dark:hover:text-slate-600"
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                        <span className="text-sm">
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    <a href="mailto:your.email@example.com" className="hover:text-slate-300 dark:hover:text-slate-600">
                        <FaEnvelope size={18} />
                    </a>
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-300 dark:hover:text-slate-600"
                    >
                        <FaGithub size={18} />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-300 dark:hover:text-slate-600"
                    >
                        <FaLinkedin size={18} />
                    </a>
                </div>
            </div>

        </footer>
    );
}
