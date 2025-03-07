import * as fs from 'node:fs';
import * as path from 'node:path';
import * as cheerio from 'cheerio';
import type { Route, Routes } from '../src/sitemap';

const resolveImports = (route: Route): Record<string, string> => {
  const filePath = path.join('dist', route.path, 'index.html');

  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(htmlContent);
    const sections: Record<string, string> = {};

    // Find all p-heading elements with an id
    $('#main-content p-heading[id]').each((_, element) => {
      const $heading = $(element);
      const sectionId = $heading.attr('id') as string;

      // Get all content until the next p-heading
      let sectionText = '';
      let nextElement = $heading.next();

      while (nextElement.length && !(nextElement.is('p-heading') && nextElement.attr('id'))) {
        sectionText += ` ${nextElement?.prop('innerText')?.trim()}`;
        nextElement = nextElement.next();
      }

      sections[sectionId] = sectionText.trim();
    });

    return sections;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return {};
  }
};

const generateIndex = (sitemap: Routes): Routes => {
  let storefrontContent: Routes = {};

  for (const [categoryName, category] of Object.entries(sitemap)) {
    for (const [pageName, page] of Object.entries(category.subPaths ?? {})) {
      if (page.subPaths) {
        for (const [tabName, tab] of Object.entries(page.subPaths)) {
          storefrontContent = {
            ...storefrontContent,
            [categoryName]: {
              ...storefrontContent[categoryName],
              [pageName]: {
                // @ts-ignore
                ...storefrontContent[categoryName]?.[pageName],
                [tabName]: resolveImports(tab),
              },
            },
          };
        }
      } else {
        storefrontContent = {
          ...storefrontContent,
          [categoryName]: {
            ...storefrontContent[categoryName],
            [pageName]: resolveImports(page),
          },
        };
      }
    }
  }

  // Uncomment this for easier debugging
  fs.writeFileSync(path.resolve(__dirname, 'indexed.json'), JSON.stringify(storefrontContent, null, 2), {
    encoding: 'utf8',
  });

  return storefrontContent;
};

const loadSitemap = async () => {
  const { sitemap } = await import('@/sitemap');
  return sitemap;
};

const updateAlgoliaIndex = async () => {
  try {
    const sitemap = await loadSitemap();
    const index = generateIndex(sitemap);
    console.log(index);
  } catch (error) {
    console.error('Error loading sitemap:', error);
  }
};

updateAlgoliaIndex();
