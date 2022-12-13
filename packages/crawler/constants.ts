export type CrawlerConfig = {
  customerWebsites: string[];
  reportFolderName: string;
  dateSplitter: string;
  reportsMaxAge: number;
  width: number;
  height: number;
  jsonSpace: number;
};
export const crawlerConfig: CrawlerConfig = {
  customerWebsites: [
    'https://www.porsche.com/germany',
    'https://finder.porsche.com/de/de-DE',
    'https://login.porsche.com/login/de/de_DE',
    'https://shop.porsche.com/de/de-DE',
    'https://www.porsche.com/swiss/de',
  ],
  reportFolderName: 'reports',
  dateSplitter: '_',
  jsonSpace: 4,
  // TODO: how long should the old reports stay?
  reportsMaxAge: 1000 * 60 * 60 * 24 * 7, // one week
  // TODO: compare with our desktop breakpoint, maybe fetch viewport from Puppeteer
  width: 1366,
  height: 768,
};

export type WebsiteUrl = typeof crawlerConfig.customerWebsites[number];
