import type { CrawlerConfig } from './src/types';
export const crawlerConfig: CrawlerConfig = {
  reportFolderName: 'reports',
  dateSplitter: '_',
  jsonSpace: 4,
  reportsMaxAge: 1000 * 60 * 60 * 24 * 7, // one week
  viewport: {
    width: 1920, // our xxl size
    height: 800, // some height
  },
};
