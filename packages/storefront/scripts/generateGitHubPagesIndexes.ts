import fs from 'fs';
import path from 'path';
import { paramCase } from 'change-case';
import { config as STOREFRONT_CONFIG } from '../storefront.config';

const getTransformedUrl = (segments: string[]): string => {
  return segments.map((x) => paramCase(x)).join('/');
};

const urls: string[] = Object.entries(STOREFRONT_CONFIG)
  .map(([category, pages]) => {
    return Object.entries(pages)
      .map(([page, tabs]) => {
        if (Array.isArray(tabs)) {
          // no tabs are configured, url results in e.g. 'components/introduction'
          return getTransformedUrl([category, page]);
        } else if (typeof tabs === 'object') {
          // tabs are configured
          return Object.keys(tabs)
            .map((tab, i) => {
              if (i === 0) {
                // url forwarding (by router), url results in e.g. 'components/button' and 'components/button/examples'
                return [getTransformedUrl([category, page]), getTransformedUrl([category, page, tab])];
              } else {
                // no url forwarding, url results in e.g. 'components/button/usage'
                return getTransformedUrl([category, page, tab]);
              }
            })
            .flat();
        }
      })
      .flat();
  })
  .flat();

for (const url of urls) {
  const directoryDist = path.resolve(__dirname, '../dist');
  const directoryGitHubPagesIndex = path.resolve(directoryDist, url);

  if (!url) {
    throw new Error(`URL not defined: '${url}'`);
  }

  if (fs.existsSync(directoryGitHubPagesIndex)) {
    throw new Error(`Directory already exists: '${directoryGitHubPagesIndex}'`);
  }

  fs.mkdirSync(directoryGitHubPagesIndex, { recursive: true });
  fs.copyFileSync(`${directoryDist}/index.html`, `${directoryGitHubPagesIndex}/index.html`);

  console.log(`Copied index.html to directory '${directoryGitHubPagesIndex}'`);
}
