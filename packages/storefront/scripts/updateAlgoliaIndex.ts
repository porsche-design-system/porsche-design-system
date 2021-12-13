import { config } from '../storefront.config';
import { StorefrontConfigPage, StorefrontConfigTabPage } from '../src/models';
import * as path from 'path';
import * as fs from 'fs';

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
        .replace(/<!--(?:.|\s)*?-->/g, ''); // remove comments
      //.replace(/<([\w-]+).*?>(?:.|\s)*?<\/\1>/g, ''); // remove all <tags> and their content
    })
    .join('\n');
};

const generateIndex = (): StorefrontContent => {
  let storefrontContent: StorefrontContent = {};
  for (const category in config) {
    console.log('-> category', category);
    for (const page in config[category]) {
      console.log('-> page', page);
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
          console.log('-> tab', tab);
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
  fs.writeFileSync(path.resolve(__dirname, 'indexed.json'), JSON.stringify(storefrontContent, null, 2), {
    encoding: 'utf-8',
  });

  return storefrontContent;
};

const updateAlgoliaIndex = (): void => {
  const index = generateIndex();
};

updateAlgoliaIndex();
