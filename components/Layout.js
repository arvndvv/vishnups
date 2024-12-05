import Navbar from './Navbar';
import Footer from './Footer';
import { getAllPosts } from '@/lib/posts';

export default function Layout({ children }) {
  const blogData = getAllPosts(); // Fetch the blog data server-side

  return (
    <div className="h-screen bg-gray-800 dark:bg-gray-100 flex flex-col justify-between">
      <Navbar blogData={blogData} />
      <main className="flex-grow overflow-auto">{children}</main>
      <Footer /> {/* Add the Footer */}
    </div>
  );
}
