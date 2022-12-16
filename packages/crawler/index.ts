import * as puppeteer from 'puppeteer';
import { puppeteerConfig } from './constants';
import { crawlWebsites } from './src/crawl-websites';
import { removeOutdatedReports } from './src/helpers/fs-helper';

const startBrowser = async (): Promise<void> => {
  const browser = await puppeteer.launch(puppeteerConfig);
  console.log('Removing outdated reports..');
  // removing old reports
  removeOutdatedReports();
  console.log('Crawling websites..');
  // crawling all websites
  await crawlWebsites(browser).catch();
  console.log('Success - please check reports');
  await browser.close();
};

startBrowser().catch((err) => {
  throw new Error(`An error occurred during crawling: ${err}`);
});
