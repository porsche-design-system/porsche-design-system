import { Browser, launch } from 'puppeteer';
import { SpecReporter } from 'jasmine-spec-reporter';

let browser: Browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

jasmine.getEnv().clearReporters();
// TODO: remove @ts-ignore and eslint-disable-next-line when https://github.com/bcaudan/jasmine-spec-reporter/issues/588 is fixed
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
jasmine.getEnv().addReporter(new SpecReporter());

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
