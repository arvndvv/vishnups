import Layout from '@/components/Layout';
import Link from 'next/link';
import projects from '@/public/projects.json'; // Import the JSON file


// Generate metadata for the page
export async function generateMetadata() {
    return {
      title: 'Projects', // Set the page title to "Blogs"
      description: `Explore my projects such as: ${projects.map(p=>p.title).join(', ')}`, // Optional description
    };
  }
export default async function ProjectsPage() {

  return (
    <Layout>
      <div className=" max-w-4xl m-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-300 dark:text-gray-700 mb-12">
          Projects
        </h1>
        <ul className="space-y-8">
          {projects.map((project, index) => (
            <li key={index} className="border-b-[0.5px] border-gray-700 dark:border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-200 dark:text-gray-700">{project.title}</h2>
              <p className="text-lg text-gray-400 dark:text-gray-600 mt-2">{project.description}</p>
              <Link
                href={project.link}
                target="_blank"
                className="text-blue-500 hover:text-blue-400 mt-4 inline-block"
              >
                Visit Project →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
