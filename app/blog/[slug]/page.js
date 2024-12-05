import { getPostBySlug } from '@/lib/posts'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import rehypeRaw from 'rehype-raw'; 
import Layout from '@/components/Layout';
import Head from 'next/head';

export default async function BlogPostPage({ params }) {
  const { slug } = await params; // Await params before using it

  const post = await getPostBySlug(slug); // Ensure to await the function to get the post data

  return (
    <>
        <Head>
        <title>{post.title}</title>
        <meta name="description" content={`${post.content.slice(0, 150)}...`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={`${post.content.slice(0, 150)}...`} />
        {/* <meta property="og:image" content="/path/to/image.jpg" /> */}
        {/* <meta property="og:type" content="article" /> */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
        <Layout>
        <div className="py-12 px-6 bg-gray-800 dark:bg-gray-100">
            <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-semibold text-gray-300 mb-12">{post.title}</h1>
            <div className="prose max-w-none markdown">
                {/* Render the markdown content */}
                <ReactMarkdown 
                remarkPlugins={[remarkGfm]} // Use GitHub-flavored markdown
                rehypePlugins={[rehypeRaw]} // Allow raw HTML content in the markdown
                >
                {post.content} 
                </ReactMarkdown>
            </div>
            </div>
        </div>
        </Layout>
    </>
  );
}
