#!/usr/bin/env node

/**
 * Generate all scannable URLs from the storefront sitemap.
 * Output is JSON array suitable for GitHub Accessibility Scanner.
 * Usage: node scripts/generateScanUrls.js <baseUrl>
 * Example: node scripts/generateScanUrls.js http://localhost:8080
 */

function extractUrls(routes, baseUrl = '') {
  const urls = [];

  for (const [, route] of Object.entries(routes)) {
    const fullPath = route.path;
    urls.push(fullPath);

    // Add sub-paths (tabs)
    if (route.subPaths) {
      for (const [, subRoute] of Object.entries(route.subPaths)) {
        urls.push(fullPath + subRoute.path);
      }
    }
  }

  return urls;
}

// Import sitemap - using require with dynamic import workaround
(async () => {
  try {
    const sitemapModule = await import('../dist/sitemap.mjs');
    const { sitemap } = sitemapModule;

    const baseUrl = process.argv[2] || 'http://localhost:8080';
    const paths = extractUrls(sitemap);
    const urls = paths.map((path) => `${baseUrl}${path}`);

    // Output as JSON array (suitable for GitHub Actions)
    console.log(JSON.stringify(urls));
  } catch (error) {
    console.error('Error generating scan URLs:', error.message);
    process.exit(1);
  }
})();
