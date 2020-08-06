import { Browser, launch } from 'puppeteer';
import { SpecReporter } from 'jasmine-spec-reporter';

let browser: Browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter());

beforeAll(async () => {
  browser = await launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 800
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process',
      '--disable-web-security'
    ]
  });
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

export const getBrowser = (): Browser => browser;
