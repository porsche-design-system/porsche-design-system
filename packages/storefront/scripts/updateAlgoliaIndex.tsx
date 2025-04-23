import * as fs from 'node:fs';
import * as path from 'node:path';
import type { AlgoliaRecord } from '@/components/search/Search';
import { algoliasearch } from 'algoliasearch';
import * as cheerio from 'cheerio';
import { type Route, type Routes, sitemap } from '../src/sitemap';

const extractContentAndSections = (
  route: Route
): { content: string; sections: { name: string; id: string; content: string }[] } => {
  const filePath = path.join('dist', route.path, 'index.html');

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
    console.error(`Error reading file at ${filePath}:`, error);
  }

  return { content, sections };
};

const extractName = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  }
  if (Array.isArray(node)) {
    return node.map(extractName).join(''); // Join array items into a single string
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return extractName((node.props as any).children); // Recursively process the children
  }
  return '';
};

const generateAlgoliaRecords = (sitemap: Routes): AlgoliaRecord[] => {
  const records: AlgoliaRecord[] = [];

  for (const category of Object.values(sitemap)) {
    for (const page of Object.values(category.subPaths ?? {})) {
      // Page with tabs
      if (page.subPaths) {
        for (const tab of Object.values(page.subPaths)) {
          const { content, sections } = extractContentAndSections(tab);
          records.push({
            objectID: tab.path,
            name: extractName(tab.name),
            content: content,
            category: extractName(category.name),
            page: extractName(page.name),
            tab: extractName(tab.name),
            url: tab.path,
          });
          for (const section of sections) {
            records.push({
              objectID: `${tab.path}#${section.id}`,
              name: section.name,
              content: section.content,
              category: extractName(category.name),
              page: extractName(page.name),
              tab: extractName(tab.name),
              section: section.name,
              url: `${tab.path}#${section.id}`,
            });
          }
        }
      }
      // Page without tabs
      else {
        const { content, sections } = extractContentAndSections(page);
        records.push({
          objectID: page.path,
          name: extractName(page.name),
          content: content,
          category: extractName(category.name),
          page: extractName(page.name),
          url: page.path,
        });
        for (const section of sections) {
          records.push({
            objectID: `${page.path}#${section.id}`,
            name: section.name,
            content: section.content,
            category: extractName(category.name),
            page: extractName(page.name),
            section: section.name,
            url: `${page.path}#${section.id}`,
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
const uploadAndOverrideRecords = (records: AlgoliaRecord[]) => {
  const client = algoliasearch(process.env.ALGOLIA_APP_ID as string, process.env.ALGOLIA_API_KEY as string);
  // const index = client.index.initIndex(ALGOLIA_INDEX_NAME);
  client
    .setSettings({
      indexName: ALGOLIA_INDEX_NAME,
      indexSettings: {
        searchableAttributes,
        distinct: true,
        attributeForDistinct,
        hitsPerPage: 20,
        customRanking,
      },
    })
    .then(() => {
      console.log('Algolia - Successfully set settings.');
    })
    .catch((error) => {
      console.log('Algolia - Saving settings failed:', error);
    });
  client
    .saveObjects({ indexName: ALGOLIA_INDEX_NAME, objects: records })
    .then(() => {
      console.log('Algolia - Successfully updated index:', ALGOLIA_INDEX_NAME);
    })
    .catch((error) => {
      console.log('Algolia - Saving objects failed:', error);
    });
};

const updateAlgoliaIndex = () => {
  const records = generateAlgoliaRecords(sitemap);

  //Uncomment this for easier debugging
  // fs.writeFileSync(path.resolve(__dirname, 'algoliaRecords.json'), JSON.stringify(_records, null, 2), {
  //   encoding: 'utf8',
  // });

  uploadAndOverrideRecords(records);
};

updateAlgoliaIndex();
