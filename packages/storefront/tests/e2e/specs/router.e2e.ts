import { baseURL } from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getCurrentUrl = (): Promise<string> => page.evaluate(() => document.location.href);
const buildUrl = (path?: string): string => `${baseURL}${path}`;

describe('home view', () => {
  it('should route to home', async () => {
    await page.goto(buildUrl('/'));
    expect(await getCurrentUrl()).toBe(buildUrl('/'));
  });
});

describe('not found view', () => {
  it('should route to 404', async () => {
    await page.goto(buildUrl('/404'));
    expect(await getCurrentUrl()).toBe(buildUrl('/404'));
  });

  it('should route to 404 when url is invalid', async () => {
    await page.goto(buildUrl('/some/completely/invalid/url'));
    expect(await getCurrentUrl()).toBe(buildUrl('/404'));
  });
});

describe('custom view', () => {
  it('should route to custom view', async () => {
    await page.goto(buildUrl('/license'));
    expect(await getCurrentUrl()).toBe(buildUrl('/license'));
  });

  it('should route to 404 when passed custom url is invalid', async () => {
    await page.goto(buildUrl('/some-invalid-url'));
    expect(await getCurrentUrl()).toBe(buildUrl('/404'));
  });
});

describe('page view', () => {
  it('should route to page when no tabs are configured', async () => {
    await page.goto(buildUrl('/about/introduction'));
    expect(await getCurrentUrl()).toBe(buildUrl('/about/introduction'));
  });

  it('should route to passed tab of page when tabs are configured', async () => {
    await page.goto(buildUrl('/components/typography/headline'));
    expect(await getCurrentUrl()).toBe(buildUrl('/components/typography/headline'));
  });

  it('should redirect to first configured tab of page when no tab is passed', async () => {
    await page.goto(buildUrl('/components/typography'));
    expect(await getCurrentUrl()).toBe(buildUrl('/components/typography/text'));
  });

  it('should redirect to first configured tab of page when passed tab is invalid', async () => {
    await page.goto(buildUrl('/components/typography/some-invalid-tab'));
    expect(await getCurrentUrl()).toBe(buildUrl('/components/typography/text'));
  });

  it('should redirect to 404 when passed category is invalid', async () => {
    await page.goto(buildUrl('/some-invalid-category/typography'));
    expect(await getCurrentUrl()).toBe(buildUrl('/404'));
  });

  it('should redirect to 404 when passed page is invalid', async () => {
    await page.goto(buildUrl('/components/some-invalid-page'));
    expect(await getCurrentUrl()).toBe(buildUrl('/404'));
  });
});

describe('pattern view', () => {
  it('should route to pattern', async () => {
    await page.goto(buildUrl('/patterns/forms/example/login'));
    expect(await getCurrentUrl()).toBe(buildUrl('/patterns/forms/example/login'));
  });

  it('should redirect to 404 when category is invalid', async () => {
    await page.goto(buildUrl('/patterns/some-invalid-category/example-login'));
    expect(await getCurrentUrl()).toBe(buildUrl('/404'));
  });

  it('should redirect to 404 when pattern is invalid', async () => {
    await page.goto(buildUrl('/patterns/forms/example/some-invalid-pattern'));
    expect(await getCurrentUrl()).toBe(buildUrl('/404'));
  });
});
