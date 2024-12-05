/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://vishnups.com', // Replace with your website URL
    generateRobotsTxt: true, // (optional) Generate `robots.txt`, defaults to `false`
    sitemapSize: 5000, // (optional) Limit for the number of URLs in a single sitemap
    generateIndexSitemap: true, // (optional) Generate index sitemap for multi-sitemap
  };
  
  module.exports = config;
  