import * as puppeteer from 'puppeteer';
import * as puppeteerConfig from '@porsche-design-system/shared/testing/jest-puppeteer.config';
import { crawlWebsites } from './crawl-websites';
import { removeOutdatedReports } from './helpers/fs-helper';
import { crawlerConfig } from '../constants';

const startBrowser = async (): Promise<void> => {
  const customerWebsites: string[] = [
    'https://www.porsche.com/germany',
    'https://finder.porsche.com/de/de-DE',
    'https://login.porsche.com/login/de/de_DE',
    'https://shop.porsche.com/de/de-DE',
    'https://www.porsche.com/swiss/de',
  ];

  const browser = await puppeteer.launch({
    ...puppeteerConfig,
    ...{
      // since some websites have different components depending on the window size & viewport,
      // we have to set the window size and viewport here in addition to shared config
      args: [`--window-size=${crawlerConfig.viewport.width},${crawlerConfig.viewport.height}`],
      defaultViewport: {
        width: crawlerConfig.viewport.width,
        height: crawlerConfig.viewport.height,
      },
    },
  });
  console.log('Removing outdated reports..');
  // removing old reports
  removeOutdatedReports(customerWebsites);
  console.log('Crawling websites..');
  // crawling all websites
  await crawlWebsites(browser, customerWebsites);
  console.log('Success - please check reports');
  await browser.close();
};

startBrowser().catch((err) => {
  throw new Error(`An error occurred during crawling: ${err}`);
});
