import { config } from '../storefront.config';
import { StorefrontConfigPage, StorefrontConfigTabPage } from '../src/models';
import * as path from 'path';
import * as fs from 'fs';

import algoliasearch from 'algoliasearch';

import { paramCase } from 'change-case';

export type StorefrontContentTabPage = { [tab: string]: string };

export type StorefrontContentPages = {
  [page: string]: StorefrontContentTabPage | string;
};

export type StorefrontContent = {
  [category: string]: StorefrontContentPages;
};

const resolveImports = (imports: StorefrontConfigPage): string => {
  return imports
    .map((page) => {
      const importLine = page.toString();
      const [_, importPath] = importLine.match(/require\([`']@\/(.*?)[`']/) || [];

      return fs
        .readFileSync(path.resolve(__dirname, '../src', importPath), 'utf-8')
        .replace(/```(?:.|\s)*?```/g, '') // remove code blocks
        .replace(/(?<!`)<(script|style)(?:.|\s)*?<\/\1>(?!`)/g, '') // remove script and style tags
        .replace(/<!--(?:.|\s)*?-->/g, '') // remove comments
        .replace(/(?<!`)<([\w-]+).*?>.*?<\/\1>(?!`)/g, ''); // remove vue code
      //.replace(/<([\w-]+).*?>(?:.|\s)*?<\/\1>/g, ''); // remove all <tags> and their content
    })
    .join('\n');
};

const generateIndex = (): StorefrontContent => {
  let storefrontContent: StorefrontContent = {};
  for (const category in config) {
    // console.log('-> category', category);
    for (const page in config[category]) {
      // console.log('-> page', page);
      if (Array.isArray(config[category][page])) {
        storefrontContent = {
          ...storefrontContent,
          [category]: {
            ...storefrontContent[category],
            [page]: resolveImports(config[category][page] as StorefrontConfigPage),
          },
        };
      } else {
        for (const tab in config[category][page]) {
          if (tab !== 'Props') {
            // console.log('-> tab', tab);
            storefrontContent = {
              ...storefrontContent,
              [category]: {
                ...storefrontContent[category],
                [page]: {
                  ...(storefrontContent[category]?.[page] as StorefrontContentTabPage),
                  [tab]: resolveImports((config[category][page] as StorefrontConfigTabPage)[tab]),
                },
              },
            };
          }
        }
      }
    }
  }

  // Uncomment this for easier debugging
  // fs.writeFileSync(path.resolve(__dirname, 'indexed.json'), JSON.stringify(storefrontContent, null, 2), {
  //   encoding: 'utf-8',
  // });

  return storefrontContent;
};

type AlgoliaRecord = {
  objectID: string;
  name: string;
  content: string;
  category: string;
  page: string;
  tab?: string;
  url: string;
};
const transformToAlgoliaRecords = (index: StorefrontContent): AlgoliaRecord[] => {
  let records: AlgoliaRecord[] = [];
  for (const category in index) {
    // console.log('-> category', category);
    for (const page in index[category]) {
      // console.log('-> page', page);
      if (index[category][page] instanceof Object) {
        for (const tab in index[category][page] as StorefrontContentTabPage) {
          // console.log('-> tab', tab);
          records = records.concat(
            toAlgoliaRecords([category, page, tab], (index[category][page] as StorefrontContentTabPage)[tab])
          );
        }
      } else {
        // the content string
        records = records.concat(toAlgoliaRecords([category, page], index[category][page] as string));
      }
    }
  }
  return records;
};

const toAlgoliaRecords = (keys: string[], content: string): AlgoliaRecord[] => {
  const parts: string[] = content.split(/\s+## .*?/);

  return parts.map<AlgoliaRecord>((part, index) => {
    const positionOfFirstNewLine: number = part.indexOf('\n');
    const hasContent = positionOfFirstNewLine > 0;
    const heading = (hasContent ? part.substring(0, positionOfFirstNewLine) : part).replace(/#+\s/, '');
    const content = hasContent ? part.substring(positionOfFirstNewLine + 1).replace(/^[#\s]+/, '') : '';

    return {
      objectID: paramCase([...keys, index].join('-')),
      name: heading,
      content: content,
      category: keys[0],
      page: keys[1],
      tab: keys[2],
      url: '/' + keys.map((key) => paramCase(key)).join('/') + (index > 0 ? '#' + paramCase(heading) : ''),
    };
  });
};

const searchableAttributes: (keyof Omit<AlgoliaRecord, 'url'>)[] = ['name', 'category', 'page', 'tab', 'content'];

// category gives nice overview over different categories together with distinct:5 and hitsPerPage: 5
// page gives nice overview over different components, but the hits for components are too big
// set distinct: true and hitsPerPage:20 there
const attributeForDistinct: keyof AlgoliaRecord = 'page';

const customRanking = ['desc(category)', 'desc(page)', 'desc(name)', 'desc(tab)', 'desc(content)'];
export const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME.replace('/', '_') ?? 'localhost';
const uploadAndOverrideRecords = (records: AlgoliaRecord[]) => {
  const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  index
    .setSettings({
      searchableAttributes,
      distinct: true,
      attributeForDistinct,
      hitsPerPage: 20,
      customRanking,
    })
    .then(() => {
      console.log('-> successfully set algolia settings');
    })
    .catch((error) => {
      console.log('-> algolia saving settings failed:', error);
    });
  index
    .saveObjects(records, { autoGenerateObjectIDIfNotExist: false })
    .then(() => {
      console.log('-> successfully updated index:', ALGOLIA_INDEX_NAME);
    })
    .catch((error) => {
      console.log('-> algolia saving objects failed:', error);
    });
};

const updateAlgoliaIndex = (): void => {
  const index = generateIndex();
  const records = transformToAlgoliaRecords(index);

  fs.writeFileSync(path.resolve(__dirname, 'algoliaRecords.json'), JSON.stringify(records, null, 2), {
    encoding: 'utf-8',
  });
  uploadAndOverrideRecords(records);
};

updateAlgoliaIndex();
