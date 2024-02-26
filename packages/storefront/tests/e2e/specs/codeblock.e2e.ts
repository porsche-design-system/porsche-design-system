import { baseURL, getElementInnerText } from '../helpers';
import type { Page, ElementHandle } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should have no leading and trailing whitespace in framework buttons of tabs-bar', async () => {
  await page.goto(`${baseURL}/components/button/examples`);

  const buttons = await Promise.all([
    page.$$("xpath/.//button[text() = 'Vanilla JS']"),
    page.$$("xpath/.//button[text() = 'Angular']"),
    page.$$("xpath/.//button[text() = 'React']"),
  ]);

  const [[vanillaButton], [angularButton], [reactButton]] = buttons;

  expect(await getElementInnerText(vanillaButton)).toBe('Vanilla JS');
  expect(await getElementInnerText(angularButton)).toBe('Angular');
  expect(await getElementInnerText(reactButton)).toBe('React');
  expect(buttons.length).toBe(3);
});
