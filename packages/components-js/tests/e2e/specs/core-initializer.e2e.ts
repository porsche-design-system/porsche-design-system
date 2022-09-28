import { goto } from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

describe('core-initializer', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  it('should initialize component deterministically', async () => {
    await goto(page, 'core-initializer');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const [component1, component2] = await page.$$('p-text-field-wrapper');
    const getOuterHTML = (elHandle: ElementHandle) => elHandle.evaluate((el) => el.outerHTML);

    const component1HTML = await getOuterHTML(component1);
    const component2HTML = await getOuterHTML(component2);

    expect(component1HTML).toBe(component2HTML);

    if (component1HTML !== component2HTML) {
      console.log('component1HTML', component1HTML);
      console.log('component2HTML', component2HTML);
    }
  });
});
