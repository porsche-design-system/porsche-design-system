import type { CrawlerConfig } from './src/types';
export const crawlerConfig: CrawlerConfig = {
  reportFolderName: 'reports',
  dateSplitter: '_',
  jsonSpace: 4,
  viewport: {
    width: 1920, // our xxl size
    height: 800, // some height
  },
};
