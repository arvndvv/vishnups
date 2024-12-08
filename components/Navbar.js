'use client'; // Add this line at the top of the file to mark it as a client component

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname for route detection
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy search

export default function Navbar({blogData}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const pathname = usePathname(); // Get the current route

  // Set up Fuse.js for fuzzy search
  const fuse = new Fuse(blogData.posts, {
    keys: ['title'],
    includeScore: true,
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Perform the search
    const results = fuse.search(e.target.value);
    setFilteredBlogs(results.map(result => result.item));
  };

  const isActive = (path) => {
    
    return pathname === path
};

  return (
    <header className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-700  py-4">
      <div className="max-w-7xl mx-auto flex  gap-5 flex-col sm:flex-row justify-between items-center px-8">
        <Link href="/" className='text-xl font-bold'>Vishnu P S</Link>
        {/* Search Bar */}
        <div className='flex flex-col-reverse sm:flex-row items-center gap-5'>
            <div className="relative">
            <input
                type="text"
                placeholder="Search blog..."
                value={searchQuery}
                onChange={handleSearch}
                className="py-1 px-4 rounded-md bg-gray-700 dark:bg-gray-50 dark:text-gray-700 dark:border-gray-200 dark:border-2 text-white"
            />
            {searchQuery && filteredBlogs.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-700 dark:bg-gray-50 dark:text-gray-700 dark:border-gray-200 dark:border-2 text-white mt-2 rounded-md max-h-60 overflow-y-auto">
                {filteredBlogs.map((blog) => (
                    <Link key={blog.slug} href={`/blog/${blog.slug}`}>
                    <div className="px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-200">{blog.title}</div>
                    </Link>
                ))}
                </div>
            )}
            </div>
            <nav className="flex space-x-5">
            <Link href="/" className={`cursor-pointer hover:text-gray-200 dark:hover:text-gray-500 transition-colors text-sm ${isActive('/') ? 'font-bold' : 'font-regular text-gray-400'}`}>
                ABOUT
            </Link>
            <Link href="/blog" className={`cursor-pointer hover:text-gray-200 dark:hover:text-gray-500 transition-colors text-sm ${isActive('/blog') ? 'font-bold' : 'font-regular text-gray-400'}`}>
                BLOG
            </Link>
            <Link href="/projects" className={`cursor-pointer hover:text-gray-200 dark:hover:text-gray-500 transition-colors text-sm ${isActive('/projects') ? 'font-bold' : 'font-regular text-gray-400'}`}>
                PROJECTS
            </Link>
            </nav>
        </div>
      </div>
    </header>
  );
}
