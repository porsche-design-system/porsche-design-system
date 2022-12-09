export type CrawlerConfig = {
  customerWebsiteMap: Record<string, string>;
  reportFolderName: string;
  dateSplitter: string;
  reportsMaxAge: number;
  width: number;
  height: number;
};

export const crawlerConfig: CrawlerConfig = {
  customerWebsiteMap: {
    'porsche.com': 'https://www.porsche.com/germany',
    'finder.porsche.com': 'https://finder.porsche.com/de/de-DE',
    'login.porsche.com': 'https://login.porsche.com/login/de/de_DE',
    'shop.porsche.com': 'https://shop.porsche.com/de/de-DE',
    'porsche.com.swiss': 'https://www.porsche.com/swiss/de/',
  },
  reportFolderName: 'reports',
  dateSplitter: '_',
  // TODO: how long should the old reports stay?
  reportsMaxAge: 1000 * 60 * 60 * 24 * 7,
  // TODO: do we want to crawl different viewports?
  width: 1366,
  height: 768,
};
