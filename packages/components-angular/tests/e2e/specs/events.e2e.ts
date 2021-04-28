import { selectNode, goto } from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

import { browser } from '../config';

describe('events', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const clickElement = async (el: ElementHandle) => {
    await el.click();
    await page.waitForTimeout(50);
  };

  const getCounterValue = async (el: ElementHandle): Promise<string> =>
    await el.evaluate((element) => element.innerHTML, el);

  it('tabs-bar should emit events once', async () => {
    await goto(page, 'events');

    const tabsBar = await selectNode(page, 'p-tabs-bar');
    const tabChangeEventCounter = await selectNode(page, 'p-tabs-bar + *');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.$$('button');

    await clickElement(secondBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('1');

    await clickElement(thirdBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('2');

    await clickElement(firstBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('3');
  });

  it('pagination should emit events once', async () => {
    await goto(page, 'events');

    const getNav = () => selectNode(page, 'p-pagination >>> nav');
    const getPaginationItems = async () => (await getNav()).$$('.goto');

    const pageChangeEventCounter = await selectNode(page, 'p-pagination + *');
    const [firstBtn, secondBtn, thirdBtn] = await getPaginationItems();

    await clickElement(secondBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('1');

    await clickElement(thirdBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('2');

    await clickElement(firstBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('3');
  });
});
