import ReactMarkdown from 'react-markdown'; // For rendering markdown
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import rehypeRaw from 'rehype-raw'; // For allowing raw HTML rendering in markdown
import remarkGfm from 'remark-gfm'; // For GitHub-flavored markdown (e.g., tables, task lists)

// Generate metadata for the page
export async function generateMetadata() {
  // Fetch profile data from the public directory (JSON file)
  const profileFilePath = path.join(process.cwd(), 'public', 'data.json');
  const profileData = JSON.parse(fs.readFileSync(profileFilePath, 'utf-8'));

  // Fetch markdown content from the public directory
  const markdownFilePath = path.join(process.cwd(), 'public', 'content.md');
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');

  // Extract the first 160 characters from markdown as the description
  const description = markdownContent.substring(0, 160).replace(/\n/g, ' '); // Remove newlines for cleaner meta description

  return {
    title: profileData.name, // Use username from JSON file
    description, // Use extracted description from markdown
  };
}

export default async function LandingPage() {
  // Fetch profile data from the public directory (JSON file)
  const profileFilePath = path.join(process.cwd(), 'public', 'data.json');
  const profileData = JSON.parse(fs.readFileSync(profileFilePath, 'utf-8'));

  // Fetch markdown content from the public directory
  const markdownFilePath = path.join(process.cwd(), 'public', 'content.md');
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');

  return (
    <Layout>
      <div className="max-w-4xl m-auto w-full px-8 py-12 text-center flex flex-col sm:flex-row items-start gap-4">
        {/* Left Side */}
        <div className="w-full sm:w-1/3 flex flex-col items-center">
          <img
            src={profileData.image}
            alt="Profile Image"
            className="w-32 h-32 sm:w-64 sm:h-64 rounded-full mb-4"
          />
          <h1 className="text-3xl font-semibold text-gray-300 dark:text-gray-700 mb-2">
            {profileData.name}
          </h1>
          {profileData.tags.map((tag, i) => (
            <p key={i} className="text-lg text-gray-300 dark:text-gray-700">
              {tag}
            </p>
          ))}
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-2/3 text-left px-6">
          <ReactMarkdown
            className="markdown"
            remarkPlugins={[remarkGfm]} // Adds GitHub-flavored markdown features like tables, task lists, etc.
            rehypePlugins={[rehypeRaw]} // Allows raw HTML rendering if needed
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}
