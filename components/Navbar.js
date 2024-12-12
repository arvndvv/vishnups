'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Fuse from 'fuse.js';

export default function Navbar({ blogData }) {
  console.log('blogData',blogData);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogData.posts); // Default to all blogs
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();

  const fuse = new Fuse(blogData.posts, {
    keys: ['title','excerpt'],
    includeScore: true,
  });

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      const limitedResults = blogData.posts.slice(0, 10); // Limit to 10 results
      setFilteredBlogs(limitedResults);
    } else {
      const results = fuse.search(query);
      const limitedResults = results.slice(0, 10); // Limit to 10 results
      setFilteredBlogs(limitedResults.map((result) => result.item));
    }
  };
  

  const isActive = (path) => pathname === path;

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSearchQuery('');
    setFilteredBlogs(blogData.posts); // Reset to all blogs when dialog closes
  };

  return (
    <header className="bg-bg dark:bg-gray-100 text-white dark:text-gray-700 py-4">
      <div className="max-w-7xl mx-auto flex gap-5 flex-col sm:flex-row justify-between items-center px-8">
        <Link href="/" className="text-xl font-bold">
          Vishnu P S
        </Link>
        <div className="flex flex-col-reverse sm:flex-row items-center gap-5">
          <button
            onClick={openDialog}
            className="py-1 px-4 rounded-md bg-gray-700 dark:bg-gray-50 dark:text-gray-700 dark:border-gray-200 dark:border-2 text-white"
          >
            Search Blog <span>🔍</span>
          </button>
          <nav className="flex space-x-5">
            <Link
              href="/"
              className={`cursor-pointer hover:text-gray-200 dark:hover:text-gray-500 transition-colors text-sm ${
                isActive('/') ? 'font-bold' : 'font-regular text-gray-400'
              }`}
            >
              ABOUT
            </Link>
            <Link
              href="/blog"
              className={`cursor-pointer hover:text-gray-200 dark:hover:text-gray-500 transition-colors text-sm ${
                isActive('/blog') ? 'font-bold' : 'font-regular text-gray-400'
              }`}
            >
              BLOG
            </Link>
            <Link
              href="/projects"
              className={`cursor-pointer hover:text-gray-200 dark:hover:text-gray-500 transition-colors text-sm ${
                isActive('/projects') ? 'font-bold' : 'font-regular text-gray-400'
              }`}
            >
              PROJECTS
            </Link>
          </nav>
        </div>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    {/* Swap themes: light theme for dark mode, dark theme for normal */}
    <div className="bg-gray-700 dark:bg-gray-100 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative">
    <button
  onClick={closeDialog}
  className="absolute top-4 right-4 
             text-gray-300 hover:text-gray-100 
             dark:text-gray-500 dark:hover:text-gray-700"
  aria-label="Close"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>

      <h2 className="text-lg font-semibold mb-4 text-white dark:text-gray-700">
        Search Blogs 
      </h2>
      <input
        type="text"
        placeholder="Search blog..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full py-2 px-4 mb-4 rounded-md border border-gray-600 bg-gray-800 text-white dark:bg-gray-50 dark:text-gray-700 dark:border-gray-300"
      />
      <div className="overflow-y-auto">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} onClick={closeDialog}>
              <div className="px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-200 cursor-pointer rounded-md">
                {blog.title}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-300 dark:text-gray-500">No results found</p>
        )}
      </div>
    </div>
  </div>
)}



    </header>
  );
}
