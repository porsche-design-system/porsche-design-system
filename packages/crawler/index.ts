import * as puppeteer from 'puppeteer';
import { crawlerConfig as config } from './constants';
import { removeOldReports } from './src/helper';
import { crawlWebsites } from './src/crawl-websites';

const startBrowser = async (): Promise<void> => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: [`--window-size=${config.width},${config.height}`],
    });
    removeOldReports();
    await crawlWebsites(browser);

    console.log('Success - please check reports');
    await browser.close();
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
};

startBrowser();
