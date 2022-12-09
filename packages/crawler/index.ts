import * as puppeteer from 'puppeteer';
import { crawlerConfig as config } from './crawler-config';
import { removeOldReports } from './helper';
import { crawlWebsites } from './crawl-websites';

const startBrowser = async (): Promise<void> => {
  try {
    const browser = await puppeteer.launch({
      // TODO: make headless before PR
      headless: false, // The browser is visible
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
