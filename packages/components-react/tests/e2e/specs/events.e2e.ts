import { ElementHandle, Page } from 'puppeteer';
import { selectNode, goto } from '../helpers';
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

    const nav = await selectNode(page, 'p-pagination >>> nav');
    const pageChangeEventCounter = await selectNode(page, 'p-pagination + *');
    const [firstBtn, secondBtn, thirdBtn] = await nav.$$('.goto');

    await clickElement(secondBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('1');

    await clickElement(thirdBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('2');

    await clickElement(firstBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('3');
  });

  it('pagination should emit events once', async () => {
    await goto(page, 'events');

    const accordionButton = await selectNode(page, 'p-accordion >>> button');
    const pageChangeEventCounter = await selectNode(page, 'p-accordion + *');

    await clickElement(accordionButton);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('1');

    await clickElement(accordionButton);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('2');

    await clickElement(accordionButton);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('3');
  });
});
