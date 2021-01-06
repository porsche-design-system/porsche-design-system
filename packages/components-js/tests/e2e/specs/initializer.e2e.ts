import { getBrowser, waitForComponentsReady } from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

const BASE_URL = 'http://localhost:8575';

describe('initializer', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const goto = async (url: string) => {
    await page.goto(`${BASE_URL}/#${url}`);
    await waitForComponentsReady(page);
  };

  it('should initialize component deterministically', async () => {
    await goto('initializer');
    await page.waitForTimeout(1500);

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
