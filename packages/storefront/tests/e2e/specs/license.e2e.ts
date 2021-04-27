import { getBrowser, options } from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

describe('license', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getTitle = (page: Page): Promise<string> => page.$eval('.vmark > h1', (x) => x.innerHTML);
  const isLinkActive = async (element: ElementHandle): Promise<boolean> =>
    (await getCssClasses(element)).includes('router-link-active');
  const getCssClasses = async (element: ElementHandle): Promise<string> =>
    Object.values((await (await element.getProperty('classList')).jsonValue()) as string).join(' ');

  it('should navigate to license', async () => {
    await page.goto(`${options.baseURL}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('html.hydrated');

    const [linkElement] = await page.$x(`//footer[@class='footer']//a[contains(., 'License')]`);

    expect(await isLinkActive(linkElement)).toBe(false);

    await linkElement.click();
    await page.waitForTimeout(40);

    expect(await isLinkActive(linkElement)).toBe(true);

    expect(await getTitle(page)).toBe('License');
  });
});
