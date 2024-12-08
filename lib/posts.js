import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'public/posts');

// Utility function to remove <img> tags from content
function removeImages(content) {
  return content.replace(/<img[^>]*>/g, ''); // Removes all <img> tags
}

export function getAllPosts(page = 1, postsPerPage = 10) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const contentWithoutImages = removeImages(content);
    const excerpt = contentWithoutImages.slice(0, 150) + (contentWithoutImages.length > 150 ? '...' : '');

    return {
      slug,
      excerpt,
      ...data,
    };
  });

  // Pagination logic
  const totalPosts = allPosts.length;
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  return {
    posts: paginatedPosts,
    totalPosts,
  };
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  };
}
