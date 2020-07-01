import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';

let browser: Browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 800
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process']
  });
});

afterAll(async () => {
  if (browser) await browser.close();
});

export const getBrowser = (): Browser => browser;
