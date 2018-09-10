import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { VisualRegressionTester } from './../../../../../vrt/visual-regression-tester';

describe('Pagination', () => {
  let browser: Browser, page: Page, visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    visualRegressionTester = new VisualRegressionTester(page);
  });

  it('should have no visual regression | variant:many pages | state:default', async () => {
    expect(await visualRegressionTester.test('pagination~default', async () => {
      await visualRegressionTester.goTo('02-molecules-pagination-pagination-04-many-pages/02-molecules-pagination-pagination-04-many-pages.rendered.html?disableCSSAnimations');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages | state:hover', async () => {
    expect(await visualRegressionTester.test('pagination~default-hover', async () => {
      await visualRegressionTester.goTo('02-molecules-pagination-pagination-04-many-pages/02-molecules-pagination-pagination-04-many-pages.rendered.html?disableCSSAnimations');
      await page.hover('.pagination__item:nth-child(1) .pagination__goto');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages | state:focus', async () => {
    expect(await visualRegressionTester.test('pagination~default-focus', async () => {
      await visualRegressionTester.goTo('02-molecules-pagination-pagination-04-many-pages/02-molecules-pagination-pagination-04-many-pages.rendered.html?disableCSSAnimations');
      await page.focus('.pagination__item:nth-child(1) .pagination__goto');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages inverted | state:default', async () => {
    expect(await visualRegressionTester.test('pagination~default-inverted', async () => {
      await visualRegressionTester.goTo('02-molecules-pagination-pagination-08-many-pages-inverted/02-molecules-pagination-pagination-08-many-pages-inverted.rendered.html?disableCSSAnimations');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages inverted | state:hover', async () => {
    expect(await visualRegressionTester.test('pagination~default-inverted-hover', async () => {
      await visualRegressionTester.goTo('02-molecules-pagination-pagination-08-many-pages-inverted/02-molecules-pagination-pagination-08-many-pages-inverted.rendered.html?disableCSSAnimations');
      await page.hover('.pagination__item:nth-child(1) .pagination__goto');
    })).toBeFalsy();
  });

  it('should have no visual regression | variant:many pages inverted | state:focus', async () => {
    expect(await visualRegressionTester.test('pagination~default-inverted-focus', async () => {
      await visualRegressionTester.goTo('02-molecules-pagination-pagination-08-many-pages-inverted/02-molecules-pagination-pagination-08-many-pages-inverted.rendered.html?disableCSSAnimations');
      await page.focus('.pagination__item:nth-child(1) .pagination__goto');
    })).toBeFalsy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
