import * as puppeteer from 'puppeteer';
import { puppeteerConfig } from './constants';
import { removeOutdatedReports } from './src/helper';
import { crawlWebsites } from './src/crawl-websites';

const startBrowser = async (): Promise<void> => {
  const browser = await puppeteer.launch(puppeteerConfig);
  removeOutdatedReports();
  await crawlWebsites(browser);

  console.log('Success - please check reports');
  await browser.close();
};

startBrowser().catch((err) => {
  throw new Error(`Could not create a browser instance: ${err}`);
});
