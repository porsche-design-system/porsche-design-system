#!/usr/bin/env tsx

/**
 * Generate all scannable URLs from the storefront sitemap.
 * Output is JSON array suitable for GitHub Accessibility Scanner.
 * Usage: tsx scripts/generateScanUrls.ts <baseUrl>
 * Example: tsx scripts/generateScanUrls.ts http://localhost:8080
 */

import { sitemap } from '../src/sitemap';

function extractUrls(routes: any, baseUrl: string = ''): string[] {
  const urls: string[] = [];

  for (const [, route] of Object.entries(routes)) {
    const fullPath = (route as any).path;
    urls.push(fullPath);

    // Add sub-paths (tabs)
    if ((route as any).subPaths) {
      for (const [, subRoute] of Object.entries((route as any).subPaths)) {
        // The subRoute path is already a full path (e.g. '/components/button/configurator')
        urls.push((subRoute as any).path);
      }
    }
  }

  return urls;
}

try {
  const baseUrl = process.argv[2] || 'http://localhost:8080';
  const paths = extractUrls(sitemap);
  const urls = paths.map((path) => `${baseUrl}${path}`);

  // Output as a newline-delimited string, not a JSON array
  console.log(urls.join('\n'));
} catch (error) {
  console.error('Error generating scan URLs:', (error as Error).message);
  process.exit(1);
}
