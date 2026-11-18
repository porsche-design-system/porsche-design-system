import * as fs from 'node:fs';
import * as path from 'node:path';
import { algoliasearch } from 'algoliasearch';
import * as cheerio from 'cheerio';
import type { AlgoliaRecord } from '@/components/search/Search';
import { type Category, getPath, sitemap } from '../src/sitemap';
import { replaceAlgoliaIndex } from './replaceAlgoliaIndex';

const extractContentAndSections = (
  routePath: string
): { content: string; sections: { name: string; id: string; content: string }[] } => {
  const filePath = path.join('dist', routePath, 'index.html');

  let content = '';
  const sections: { name: string; id: string; content: string }[] = [];

  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(htmlContent);

    // Extract content from #main-content
    $('#main-content')
      .children()
      .each((_, el) => {
        const innerText = $(el).prop('innerText')?.trim();
        if (innerText) {
          // Remove excess whitespace and newlines
          content += `${innerText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()} `;
        }
      });

    // Extract all sections
    $('#main-content p-heading[id]').each((_, el) => {
      const sectionId = $(el).prop('id');
      let sectionName = $(el).prop('innerText')?.trim();
      sectionName = sectionName
        ?.replace(/#$/, '') // Remove trailing #
        .replace(/\s+/g, ' ') // Replace multiple spaces/newlines with a single space
        .replace(/^\s+|\s+$/g, ''); // Remove leading/trailing spaces

      // Loop over each element until next section heading
      const sectionContent = $(el)
        .nextUntil('p-heading[id]')
        .toArray()
        .map((sibling) => {
          const innerText = $(sibling).prop('innerText')?.trim();
          return innerText?.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
        })
        .join(' ');

      if (sectionId && sectionName) {
        sections.push({ name: sectionName, id: sectionId, content: sectionContent });
      }
    });
  } catch (error) {
    throw new Error(`Error reading file at ${filePath}`, { cause: error });
  }

  return { content, sections };
};

const generateAlgoliaRecords = (categories: Record<string, Category>): AlgoliaRecord[] => {
  const records: AlgoliaRecord[] = [];

  for (const [categoryKey, category] of Object.entries(categories)) {
    for (const [pageKey, page] of Object.entries(category.pages)) {
      // Page with tabs
      if (page.tabs) {
        for (const [tabKey, tab] of Object.entries(page.tabs)) {
          const tabPath = getPath(categoryKey, pageKey, tabKey);
          const { content, sections } = extractContentAndSections(tabPath);
          records.push({
            objectID: tabPath,
            name: tab.name,
            content: content,
            category: category.name,
            page: page.name,
            tab: tab.name,
            url: tabPath,
          });
          for (const section of sections) {
            records.push({
              objectID: `${tabPath}#${section.id}`,
              name: section.name,
              content: section.content,
              category: category.name,
              page: page.name,
              tab: tab.name,
              section: section.name,
              url: `${tabPath}#${section.id}`,
            });
          }
        }
      }
      // Page without tabs
      else {
        const pagePath = getPath(categoryKey, pageKey);
        const { content, sections } = extractContentAndSections(pagePath);
        records.push({
          objectID: pagePath,
          name: page.name,
          content: content,
          category: category.name,
          page: page.name,
          url: pagePath,
        });
        for (const section of sections) {
          records.push({
            objectID: `${pagePath}#${section.id}`,
            name: section.name,
            content: section.content,
            category: category.name,
            page: page.name,
            section: section.name,
            url: `${pagePath}#${section.id}`,
          });
        }
      }
    }
  }

  // Uncomment this for easier debugging
  // fs.writeFileSync(path.resolve(__dirname, 'indexed.json'), JSON.stringify(records, null, 2), {
  //   encoding: 'utf8',
  // });

  return records;
};

const searchableAttributes: (keyof Omit<AlgoliaRecord, 'url'>)[] = [
  'name',
  'category',
  'page',
  'tab',
  'section',
  'content',
];

/**
 * 'category' gives nice overview over different categories together with distinct: 5 and hitsPerPage: 5
 * 'page' gives nice overview over different components but the hits for components are too big set distinct: true and
 *  hitsPerPage: 20 there
 **/
const attributeForDistinct: keyof AlgoliaRecord = 'page';

const customRanking = ['desc(category)', 'desc(page)', 'desc(name)', 'desc(tab)', 'desc(section)', 'desc(content)'];
export const ALGOLIA_INDEX_NAME = process.env.P_CURRENT_BRANCH?.replace('/', '_') || 'localhost';
const uploadAndOverrideRecords = async (records: AlgoliaRecord[]) => {
  const { ALGOLIA_APP_ID, ALGOLIA_API_KEY } = process.env;
  if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY) throw new Error('Algolia credentials are required');
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  await replaceAlgoliaIndex(client, ALGOLIA_INDEX_NAME, records, {
    searchableAttributes,
    distinct: true,
    attributeForDistinct,
    hitsPerPage: 20,
    customRanking,
  });
  process.stdout.write(`Algolia - Successfully updated index: ${ALGOLIA_INDEX_NAME}\n`);
};

const updateAlgoliaIndex = async () => {
  // Filter changelog since it's too big, the sections of the changelog page will still be included in the index
  const records = generateAlgoliaRecords(sitemap).filter((record) => record.objectID !== '/news/changelog');

  //Uncomment this for easier debugging
  // fs.writeFileSync(path.resolve(__dirname, 'algoliaRecords.json'), JSON.stringify(records, null, 2), {
  //   encoding: 'utf8',
  // });

  await uploadAndOverrideRecords(records);
};

updateAlgoliaIndex().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
