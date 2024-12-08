import { getPostBySlug } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import rehypeRaw from 'rehype-raw'; 
import Layout from '@/components/Layout';
import { getAllPosts } from '@/lib/posts'; // Adjust the import path as necessary

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  const title = 'Blog | ' + (post?.title || 'Default Title');
  const description = post?.content.slice(0, 150) || 'Default Description';
  const image = post?.image || '/default-image.jpg'; // Replace with a default image path if necessary

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200, // Recommended size for OG images
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  const { posts } = getAllPosts(1, 1000); // Fetch all posts for static generation

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <Layout>
      <div className="py-12 px-6 bg-gray-800 dark:bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-semibold text-gray-300 mb-12">{post.title}</h1>
          <div className="prose max-w-none markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} // Enable GitHub-flavored markdown
              rehypePlugins={[rehypeRaw]} // Allow raw HTML content
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Layout>
  );
}
