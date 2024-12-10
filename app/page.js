import ReactMarkdown from 'react-markdown';
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

export async function generateMetadata() {
  const profileFilePath = path.join(process.cwd(), 'public', 'data.json');
  const profileData = JSON.parse(fs.readFileSync(profileFilePath, 'utf-8'));
  const markdownFilePath = path.join(process.cwd(), 'public', 'content.md');
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');
  const description = markdownContent.substring(0, 160).replace(/\n/g, ' ');

  return {
    title: profileData.name,
    description,
  };
}

export default async function LandingPage() {
  const profileFilePath = path.join(process.cwd(), 'public', 'data.json');
  const profileData = JSON.parse(fs.readFileSync(profileFilePath, 'utf-8'));
  const markdownFilePath = path.join(process.cwd(), 'public', 'content.md');
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');

  return (
    <Layout>
      <div className="max-w-7xl m-auto w-full px-8 py-12 text-center flex flex-col sm:flex-row items-start gap-4">
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

        <div className="w-full sm:w-2/3 text-left px-6">
          <ReactMarkdown
            className="markdown"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark} // Choose your desired style
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}
