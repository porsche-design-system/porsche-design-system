import { Browser, launch } from 'puppeteer';
import { SpecReporter } from 'jasmine-spec-reporter';
import CustomReporter = jasmine.CustomReporter;

let browser: Browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter((new SpecReporter() as unknown) as CustomReporter);

beforeAll(async () => {
  browser = await launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 800,
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process'],
  });
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

export const options = {
  baseURL: 'http://localhost:8080',
};

export const getBrowser = (): Browser => browser;
