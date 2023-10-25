import type { Page } from 'puppeteer';
import { a11yAnalyze, baseURL, getInternalUrls } from '../helpers';
import { paramCase } from 'change-case';
import * as fs from 'fs';
import * as path from 'path';

const console = require('console'); // workaround for nicer logs

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

// style overrides for css variables
const styleOverrides = fs.readFileSync(
  path.resolve(require.resolve('@porsche-design-system/shared'), '../css/styles.css'),
  'utf8'
);
const [, rootStyles] = /(:root {[\s\S]+?})/.exec(styleOverrides) || [];

const gotoUrl = async (url: string): Promise<void> => {
  await page.goto(baseURL + url, { waitUntil: 'domcontentloaded' });

  // inject style overrides for css variables
  await page.evaluate((styles) => {
    const styleEl = document.createElement('style');
    styleEl.innerText = styles;
    document.head.append(styleEl);
  }, rootStyles);

  await page.waitForSelector('html.hydrated');
  await page.evaluate(() => (window as any).componentsReady());
};

const enableDarkMode = async (): Promise<void> => {
  const themeBtn = await page.$('.cycle-platform-theme');
  await themeBtn.click();

  await page.waitForFunction(() => document.body.className === 'dark-mode');
};

it('should have successfully extracted :root styles', () => {
  expect(rootStyles).toContain(':root');
  expect(rootStyles).toContain('--p-transition-duration: 0s');
  expect(rootStyles).toContain('--p-animation-duration: 0s');
});

describe('outside main element', () => {
  const excludeSelector = 'main';

  it('should have no accessibility issues on front page', async () => {
    await gotoUrl('/');
    await a11yAnalyze(page, { suffix: 'light', excludeSelector });

    await enableDarkMode();
    await a11yAnalyze(page, { suffix: 'dark', excludeSelector });
  });

  it('should have no accessibility issues on changelog page', async () => {
    await gotoUrl('/news/changelog'); // to have open accordion in sidebar
    await a11yAnalyze(page, { suffix: 'light', excludeSelector });

    await enableDarkMode();
    await a11yAnalyze(page, { suffix: 'dark', excludeSelector });
  });
});

describe('within main element', () => {
  const includeSelector = 'main';

  const cycleFrameworkTabs = async (theme: string): Promise<void> => {
    const buttons = (
      await Promise.all([
        // page.$x("//button[text() = 'Vanilla JS']"),
        page.$x("//button[text() = 'Angular']"),
        page.$x("//button[text() = 'React']"),
        // TODO: vue is missing
      ])
    )
      .map(([handle]) => handle)
      .flat()
      .filter(Boolean); // get rid of null values

    if (buttons.length) {
      expect(buttons.length).toBe(2);

      const [vanillaJsButton] = await page.$x("//button[text() = 'Vanilla JS']");

      for (const button of buttons) {
        // pages for styles sub-package don't have vanilla js examples and angular is selected initially
        if (vanillaJsButton) {
          // angular and react can't be selected initially
          expect(await button.evaluate((el: HTMLElement) => el.getAttribute('aria-selected'))).toBe('false');
        }

        await button.click();
        await page.waitForFunction((el: HTMLElement) => el.getAttribute('aria-selected') === 'true', {}, button);

        const innerText = await button.evaluate((el: HTMLElement) => el.innerText);
        const ariaSelected = await button.evaluate((el: HTMLElement) => el.getAttribute('aria-selected'));

        expect(ariaSelected).toBe('true');

        await a11yAnalyze(page, theme + '-' + paramCase(innerText));
      }
    }
  };

  // filter out files from public/assets directory
  const internalUrls = getInternalUrls().filter((url) => !url.match(/^\/assets\/.*\.\w{3,4}$/));

  it.each(internalUrls.map<[string, number]>((url, i) => [url, i]))(
    'should have no accessibility issues in main element at %s',
    async (url, index) => {
      console.log(`a11y url ${index + 1}/${internalUrls.length}: ${url}`);

      await gotoUrl(url);

      await a11yAnalyze(page, { suffix: 'main-light', includeSelector }); // page in default/initial state
      // disabled because highly redundant, instead this should be tested once for light and dark with a good code example for angular, react and vue
      // await cycleFrameworkTabs('light');

      const [darkThemeButton] = await page.$x("//button[text() = 'Dark theme']");

      if (darkThemeButton) {
        await darkThemeButton.click();

        const playgroundClassName = await darkThemeButton.evaluate(
          (el) => el.parentElement.nextElementSibling.className
        );
        expect(playgroundClassName).toContain('example--dark');

        // reset framework to vanilla js if available
        // const [vanillaJsButton] = await page.$x("//button[text() = 'Vanilla JS']");
        // if (vanillaJsButton) {
        //   await vanillaJsButton.click();
        // }

        await a11yAnalyze(page, { suffix: 'main-dark', includeSelector });
        // disabled because highly redundant, instead this should be tested once for light and dark with a good code example for angular, react and vue
        // await cycleFrameworkTabs('dark');
      }
    }
  );
});
