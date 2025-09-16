import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { createHash } from 'crypto';
import type { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import Typesense from 'typesense/src/Typesense';
import { type TypesenseRecord, TypesenseResult } from '@/components/search/Search';
import { TYPESENSE_SEARCH_ONLY_KEY } from '@/lib/typesense/client';
import { type Route, type Routes, sitemap } from '@/sitemap';

export const TYPESENSE_INDEX_NAME = process.env.P_CURRENT_BRANCH?.replace('/', '_') || 'localhost';

const urlToId = (url: string): string => {
  return createHash('sha256').update(url).digest('hex');
};

const typesense = new Typesense.Client({
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http',
    },
  ],
  apiKey: TYPESENSE_SEARCH_ONLY_KEY,
  numRetries: 3,
  connectionTimeoutSeconds: 1000,
  logLevel: 'debug',
});

const schema: CollectionCreateSchema = {
  name: TYPESENSE_INDEX_NAME,
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'content', type: 'string' },
    { name: 'category', type: 'string' },
    { name: 'page', type: 'string' },
    { name: '.*', type: 'auto' },
    { name: 'url', type: 'string' },
  ],
};

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

const generateTypesenseRecords = (sitemap: Routes): TypesenseRecord[] => {
  const records: TypesenseRecord[] = [];

  for (const category of Object.values(sitemap)) {
    for (const page of Object.values(category.subPaths ?? {})) {
      // Page with tabs
      if (page.subPaths) {
        for (const tab of Object.values(page.subPaths)) {
          const { content, sections } = extractContentAndSections(tab);
          records.push({
            id: urlToId(tab.path),
            name: extractName(tab.name),
            content: content,
            category: extractName(category.name),
            page: extractName(page.name),
            tab: extractName(tab.name),
            url: tab.path,
          });
          for (const section of sections) {
            records.push({
              id: urlToId(`${tab.path}#${section.id}`),
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
          id: urlToId(page.path),
          name: extractName(page.name),
          content: content,
          category: extractName(category.name),
          page: extractName(page.name),
          url: page.path,
        });
        for (const section of sections) {
          records.push({
            id: urlToId(`${page.path}#${section.id}`),
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

  // fs.writeFileSync(path.resolve(__dirname, 'indexed-typesense.json'), JSON.stringify(records, null, 2), {
  //   encoding: 'utf8',
  // });

  return records;
};

const uploadAndOverrideTypesenseIndex = async () => {
  const records = generateTypesenseRecords(sitemap).filter((record) => record.url !== '/news/changelog');

  // fs.writeFileSync(path.resolve(__dirname, 'algoliaRecords.json'), JSON.stringify(records, null, 2), {
  //   encoding: 'utf8',
  // });

  try {
    await typesense.collections().create(schema);
  } catch (error) {
    console.error(error);
  }

  try {
    const results = await typesense.collections(TYPESENSE_INDEX_NAME).documents().import(records, { action: 'update' });
    const failedItems = results.filter((item) => !item.success);
    console.log(failedItems);
  } catch (error) {
    console.error(error);
  }
};

uploadAndOverrideTypesenseIndex();
