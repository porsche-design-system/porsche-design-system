import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { VisualRegressionTester } from './../../../../../vrt/visual-regression-tester';

describe('Button Regular', () => {
  let browser: Browser, page: Page, visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    visualRegressionTester = new VisualRegressionTester(page);
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular/02-molecules-buttons-button-regular.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~ghost', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-01-03-ghost/02-molecules-buttons-button-regular-01-03-ghost.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~inverted', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-01-06-inverted/02-molecules-buttons-button-regular-01-06-inverted.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~ghost-inverted', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-01-09-inverted-ghost/02-molecules-buttons-button-regular-01-09-inverted-ghost.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~highlight', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-02-01-highlight/02-molecules-buttons-button-regular-02-01-highlight.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~highlight-inverted', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-02-04-highlight-inverted/02-molecules-buttons-button-regular-02-04-highlight-inverted.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~sales', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-03-01-sales/02-molecules-buttons-button-regular-03-01-sales.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~sales-ghost', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-03-04-sales-ghost/02-molecules-buttons-button-regular-03-04-sales-ghost.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~sales-inverted', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-03-07-sales-inverted/02-molecules-buttons-button-regular-03-07-sales-inverted.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~sales-ghost-inverted', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-03-10-sales-inverted-ghost/02-molecules-buttons-button-regular-03-10-sales-inverted-ghost.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~small', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-04-01-small/02-molecules-buttons-button-regular-04-01-small.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~small-ghost', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-04-04-small-ghost/02-molecules-buttons-button-regular-04-04-small-ghost.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~small-highlight', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-04-07-small-highlight/02-molecules-buttons-button-regular-04-07-small-highlight.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~small-sales', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-04-10-small-sales/02-molecules-buttons-button-regular-04-10-small-sales.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~small-sales-ghost', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-04-13-small-sales-ghost/02-molecules-buttons-button-regular-04-13-small-sales-ghost.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~stretched', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-05-01-stretch/02-molecules-buttons-button-regular-05-01-stretch.rendered.html');
    })).toBeFalsy();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('button-regular~link', async () => {
      await visualRegressionTester.goTo('02-molecules-buttons-button-regular-06-01-link/02-molecules-buttons-button-regular-06-01-link.rendered.html');
    })).toBeFalsy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
