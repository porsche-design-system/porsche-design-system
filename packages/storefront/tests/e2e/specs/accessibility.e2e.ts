import type { Page } from 'puppeteer';
import { a11yAnalyze, baseURL, getInternalUrls } from '../helpers';
import { paramCase } from 'change-case';

const console = require('console'); // workaround for nicer logs

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const cycleFrameworkTabs = async (theme: string): Promise<void> => {
  const buttons = (
    await Promise.all([
      // page.$x("//button[text() = 'Vanilla JS']"),
      page.$x("//button[text() = 'Angular']"),
      page.$x("//button[text() = 'React']"),
    ])
  )
    .map(([handle]) => handle)
    .flat()
    .filter((x) => x); // get rid of null values

  if (buttons.length) {
    expect(buttons.length).toBe(2);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];

      // angular and react can't be selected initially
      expect(await button.evaluate((el) => el.getAttribute('aria-selected'))).toBe('false');

      await button.click();
      await page.waitForFunction((el) => el.getAttribute('aria-selected') === 'true', {}, button);

      const innerText = await button.evaluate((el) => (el as HTMLElement).innerText);
      const ariaSelected = await button.evaluate((el) => el.getAttribute('aria-selected'));

      expect(ariaSelected).toBe('true');

      await a11yAnalyze(page, theme + '-' + paramCase(innerText));
    }
  }
};

// filter out files from public/assets directory
const internalUrls = getInternalUrls().filter((url) => !url.match(/^\/assets\/.*\.\w{3,4}$/));

it.each(internalUrls.map<[string, number]>((url, i) => [url, i]))(
  'should have no accessibility issues at %s',
  async (url, index) => {
    console.log(`a11y url ${index + 1}/${internalUrls.length}: ${url}`);

    await page.goto(baseURL + url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('html.hydrated');
    await page.evaluate(() => (window as any).componentsReady());

    await a11yAnalyze(page, 'light'); // page in default/initial state
    await cycleFrameworkTabs('light');

    const [darkThemeButton] = await page.$x("//button[text() = 'Dark theme']");

    if (darkThemeButton) {
      await darkThemeButton.click();

      const playgroundClassName = await darkThemeButton.evaluate((el) => el.parentElement.nextElementSibling.className);
      expect(playgroundClassName).toContain('example--dark');

      // reset framework to vanilla js if available
      const [vanillaJsButton] = await page.$x("//button[text() = 'Vanilla JS']");
      if (vanillaJsButton) {
        await vanillaJsButton.click();
      }

      await a11yAnalyze(page, 'dark');
      await cycleFrameworkTabs('dark');
    }
  }
);
