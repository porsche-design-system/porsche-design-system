import { ElementHandle, Page } from 'puppeteer';
import { getConsoleErrorsAmount, goto, initConsoleObserver, selectNode, waitForComponentsReady } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const clickElement = async (el: ElementHandle) => {
  await el.click();
  await page.waitForTimeout(50);
};

const getCounterValue = async (el: ElementHandle): Promise<string> =>
  await el.evaluate((element) => element.innerHTML, el);

describe('pagination', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const nav = await selectNode(page, 'p-pagination >>> nav');
    const pageChangeEventCounter = await selectNode(page, 'p-pagination + p');
    const [, secondBtn, thirdBtn, fourthBtn] = (await nav.$$('span')).slice(1, -1); // without prev and next;

    await clickElement(secondBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('1');

    await clickElement(thirdBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('2');

    await clickElement(fourthBtn);
    expect(await getCounterValue(pageChangeEventCounter)).toBe('3');
  });
});

describe('tabs-bar', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const tabsBar = await selectNode(page, 'p-tabs-bar');
    const tabChangeEventCounter = await selectNode(page, 'p-tabs-bar + p');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.$$('button');

    await clickElement(secondBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('1');

    await clickElement(thirdBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('2');

    await clickElement(firstBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('3');
  });

  it('should not throw error error when used with router', async () => {
    initConsoleObserver(page);
    await goto(page, 'tabs-bar'); // to load component chunk

    // navigate via select, otherwise we would have a reload
    const select = await selectNode(page, 'select');
    await select.click();
    await page.keyboard.type('Events');
    await page.keyboard.press('Enter');
    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });
});

describe('tabs', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const tabsBar = await selectNode(page, 'p-tabs >>> p-tabs-bar');
    const tabChangeEventCounter = await selectNode(page, 'p-tabs + p');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.$$('button');

    await clickElement(secondBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('1');

    await clickElement(thirdBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('2');

    await clickElement(firstBtn);
    expect(await getCounterValue(tabChangeEventCounter)).toBe('3');
  });
});

describe('switch', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const switchBtn = await selectNode(page, 'p-switch >>> button');
    const switchChangeEventCounter = await selectNode(page, 'p-switch + p');

    await clickElement(switchBtn);
    expect(await getCounterValue(switchChangeEventCounter)).toBe('1');

    await clickElement(switchBtn);
    expect(await getCounterValue(switchChangeEventCounter)).toBe('2');

    await clickElement(switchBtn);
    expect(await getCounterValue(switchChangeEventCounter)).toBe('3');
  });
});

describe('modal', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const modalOpenBtn = await selectNode(page, 'p-modal + p button');
    const modalCloseBtn = await selectNode(page, 'p-modal >>> p-button-pure >>> button');
    const modalCloseEventCounter = await selectNode(page, 'p-modal + p');

    await clickElement(modalOpenBtn);
    await waitForComponentsReady(page);
    await page.waitForTimeout(600); // fade-in transition
    await clickElement(modalCloseBtn);
    await waitForComponentsReady(page);
    await page.waitForTimeout(200); // fade-out transition
    expect(await getCounterValue(modalCloseEventCounter)).toBe('1 <button>Open Modal</button>');

    await clickElement(modalOpenBtn);
    await waitForComponentsReady(page);
    await page.waitForTimeout(600); // fade-in transition
    await clickElement(modalCloseBtn);
    await waitForComponentsReady(page);
    await page.waitForTimeout(200); // fade-out transition
    expect(await getCounterValue(modalCloseEventCounter)).toBe('2 <button>Open Modal</button>');

    await clickElement(modalOpenBtn);
    await waitForComponentsReady(page);
    await page.waitForTimeout(600); // fade-in transition
    await clickElement(modalCloseBtn);
    await waitForComponentsReady(page);
    await page.waitForTimeout(200); // fade-out transition
    expect(await getCounterValue(modalCloseEventCounter)).toBe('3 <button>Open Modal</button>');
  });
});

describe('table', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const tableHeadBtn = await selectNode(page, 'p-table-head-cell >>> button');
    const tableSortingChangeEventCounter = await selectNode(page, 'p-table + p');

    await clickElement(tableHeadBtn);
    expect(await getCounterValue(tableSortingChangeEventCounter)).toBe('1');

    await clickElement(tableHeadBtn);
    expect(await getCounterValue(tableSortingChangeEventCounter)).toBe('2');

    await clickElement(tableHeadBtn);
    expect(await getCounterValue(tableSortingChangeEventCounter)).toBe('3');
  });
});

describe('accordion', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const accordionButton = await selectNode(page, 'p-accordion >>> button');
    const accordionChangeEventCounter = await selectNode(page, 'p-accordion + p');

    await clickElement(accordionButton);
    expect(await getCounterValue(accordionChangeEventCounter)).toBe('1');

    await clickElement(accordionButton);
    expect(await getCounterValue(accordionChangeEventCounter)).toBe('2');

    await clickElement(accordionButton);
    expect(await getCounterValue(accordionChangeEventCounter)).toBe('3');
  });
});
