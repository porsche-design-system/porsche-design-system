import { PuppeteerLaunchOptions, Viewport } from 'puppeteer';

export type CrawlerConfig = {
  customerWebsites: string[];
  reportFolderName: string;
  dateSplitter: string;
  reportsMaxAge: number;
  jsonSpace: number;
  viewport: Viewport;
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
  viewport: {
    width: 1920, // our xxl size
    height: 800, // some height
  },
};

export const puppeteerConfig: PuppeteerLaunchOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
  args: [`--window-size=${crawlerConfig.viewport.width},${crawlerConfig.viewport.height}`],
  defaultViewport: crawlerConfig.viewport,
};

export type WebsiteUrl = typeof crawlerConfig.customerWebsites[number];
