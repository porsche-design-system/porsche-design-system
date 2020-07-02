import 'jasmine';
import { getBrowser, options } from '../helpers/setup';
import { Page } from 'puppeteer';

describe('router', () => {
  let page: Page;

  const getCurrentUrl = async (): Promise<string> => await page.evaluate('location.href') as string;

  beforeEach(async () => page = await getBrowser().newPage());
  afterEach(async () => await page.close());

  describe('home view', () => {
    it('should route to home', async () => {
      await page.goto(`${options.baseURL}/`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/`);
    });
  });

  describe('not found view', () => {
    it('should route to 404', async () => {
      await page.goto(`${options.baseURL}/#/404`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/404`);
    });

    it('should route to 404 when url is invalid', async () => {
      await page.goto(`${options.baseURL}/#/some/completely/invalid/url`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/404`);
    });
  });

  describe('custom view', () => {
    it('should route to custom view', async () => {
      await page.goto(`${options.baseURL}/#/license`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/license`);
    });

    it('should route to 404 when passed custom url is invalid', async () => {
      await page.goto(`${options.baseURL}/#/some-invalid-url`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/404`);
    });
  });

  describe('page view', () => {
    it('should route to page when no tabs are configured', async () => {
      await page.goto(`${options.baseURL}/#/about/introduction`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/about/introduction`);
    });

    it('should route to passed tab of page when tabs are configured', async () => {
      await page.goto(`${options.baseURL}/#/components/typography#headline`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/components/typography#headline`);
    });

    it('should redirect to first configured tab of page when no tab is passed', async () => {
      await page.goto(`${options.baseURL}/#/components/typography`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/components/typography#design`);
    });

    it('should redirect to first configured tab of page when passed tab is invalid', async () => {
      await page.goto(`${options.baseURL}/#/components/typography#some-invalid-tab`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/components/typography#design`);
    });

    it('should redirect to 404 when passed category is invalid', async () => {
      await page.goto(`${options.baseURL}/#/some-invalid-category/typography`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/404`);
    });

    it('should redirect to 404 when passed page is invalid', async () => {
      await page.goto(`${options.baseURL}/#/components/some-invalid-page`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/404`);
    });
  });

  describe('pattern view', () => {
    it('should route to pattern', async () => {
      await page.goto(`${options.baseURL}/#/patterns/forms/example-login`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/patterns/forms/example-login`);
    });

    it('should redirect to 404 when category is invalid', async () => {
      await page.goto(`${options.baseURL}/#/patterns/some-invalid-category/example-login`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/404`);
    });

    it('should redirect to 404 when pattern is invalid', async () => {
      await page.goto(`${options.baseURL}/#/patterns/forms/some-invalid-pattern`);
      expect(await getCurrentUrl()).toBe(`${options.baseURL}/#/404`);
    });
  });
});
