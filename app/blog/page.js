import Layout from '@/components/Layout';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

// Generate metadata for the page
export async function generateMetadata() {
  return {
    title: 'Blogs',
    description: 'Explore our latest blog posts and stay updated with insights, tips, and stories.',
  };
}

// Generate static params for pagination
export async function generateStaticParams() {
  const { totalPosts } = getAllPosts(1, 10); // Get the total number of posts
  const postsPerPage = 10;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Generate paths for each page
  const paths = [];
  for (let i = 1; i <= totalPages; i++) {
    paths.push({ page: i.toString() });
  }

  return paths;
}

// Blog Page component (with async data fetching inside)
export default async function BlogPage({ params }) {
  const page = parseInt(params.page || '1', 10); // Parse the page number from params
  const postsPerPage = 10;
  const { posts, totalPosts } = getAllPosts(page, postsPerPage);
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <Layout>
      <div className="max-w-4xl m-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-300 dark:text-gray-700 mb-12">
          Blogs
        </h1>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b-[0.5px] border-gray-700 dark:border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-200 dark:text-gray-700">{post.title}</h2>
              <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
              <div className="text-lg text-gray-400 dark:text-gray-600 mt-4">
                <ReactMarkdown className="desc">{post.excerpt}</ReactMarkdown>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-500 hover:text-blue-400 mt-4 inline-block"
              >
                Read More →
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="space-x-4">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}`}
                className="text-blue-500 hover:text-blue-400"
              >
                Previous
              </Link>
            )}

            <span className="text-gray-300 dark:text-gray-600">
              Page {page} of {totalPages}
            </span>

            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}`}
                className="text-blue-500 hover:text-blue-400"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
