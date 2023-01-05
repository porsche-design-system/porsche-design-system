import * as puppeteer from 'puppeteer';
import { puppeteerConfig } from '../constants';
import { crawlWebsites } from './crawl-websites';
import { removeOutdatedReports } from './helpers/fs-helper';

const startBrowser = async (): Promise<void> => {
  const customerWebsites: string[] = [
    'https://www.porsche.com/germany',
    'https://finder.porsche.com/de/de-DE',
    'https://login.porsche.com/login/de/de_DE',
    'https://shop.porsche.com/de/de-DE',
    'https://www.porsche.com/swiss/de',
  ];
  const browser = await puppeteer.launch(puppeteerConfig);
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
