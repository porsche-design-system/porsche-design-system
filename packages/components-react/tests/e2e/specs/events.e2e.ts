import type { ElementHandle, Page } from 'puppeteer';
import { getConsoleErrorsAmount, goto, initConsoleObserver, selectNode, waitForComponentsReady } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getCounterValue = async (el: ElementHandle): Promise<string> => {
  // wait for innerHTML change by storing previous innerHTML
  await page.waitForFunction(
    (element: Element & { prevInnerHtml: string }) => {
      return element.innerHTML !== element.prevInnerHtml;
    },
    {},
    el
  );

  return el.evaluate((element: Element & { prevInnerHtml: string }) => {
    element.prevInnerHtml = element.innerHTML;
    return element.innerHTML;
  });
};

describe('pagination', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const nav = await selectNode(page, 'p-pagination >>> nav');
    const paginationChangeEventCounter = await selectNode(page, 'p-pagination + p');
    const [, secondBtn, thirdBtn, fourthBtn] = (await nav.$$('span')).slice(1, -1); // without prev and next;

    await secondBtn.click();
    expect(await getCounterValue(paginationChangeEventCounter)).toBe('1');

    await thirdBtn.click();
    expect(await getCounterValue(paginationChangeEventCounter)).toBe('2');

    await fourthBtn.click();
    expect(await getCounterValue(paginationChangeEventCounter)).toBe('3');
  });
});

describe('tabs-bar', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const tabsBar = await selectNode(page, 'p-tabs-bar');
    const tabsBarChangeEventCounter = await selectNode(page, 'p-tabs-bar + p');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.$$('button');

    await secondBtn.click();
    expect(await getCounterValue(tabsBarChangeEventCounter)).toBe('1');

    await thirdBtn.click();
    expect(await getCounterValue(tabsBarChangeEventCounter)).toBe('2');

    await firstBtn.click();
    expect(await getCounterValue(tabsBarChangeEventCounter)).toBe('3');
  });

  it('should not throw error when used with router', async () => {
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
    const tabsChangeEventCounter = await selectNode(page, 'p-tabs + p');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.$$('button');

    await secondBtn.click();
    expect(await getCounterValue(tabsChangeEventCounter)).toBe('1');

    await thirdBtn.click();
    expect(await getCounterValue(tabsChangeEventCounter)).toBe('2');

    await firstBtn.click();
    expect(await getCounterValue(tabsChangeEventCounter)).toBe('3');
  });
});

describe('text-field-wrapper type="search"', () => {
  it('should have working clear functionality', async () => {
    await goto(page, 'events');

    const input = await selectNode(page, 'p-text-field-wrapper > input[type=search]');
    const inputValue = await selectNode(page, 'p-text-field-wrapper + p');

    await input.focus();
    await page.keyboard.type('hello');
    expect(await getCounterValue(inputValue)).toBe('Value: hello');

    await page.keyboard.press('Backspace');
    expect(await getCounterValue(inputValue)).toBe('Value: hell');

    await page.keyboard.press('Escape');
    expect(await getCounterValue(inputValue)).toBe('Value: ');
  });
});

describe('switch', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const switchBtn = await selectNode(page, 'p-switch >>> button');
    const switchChangeEventCounter = await selectNode(page, 'p-switch + p');

    await switchBtn.click();
    expect(await getCounterValue(switchChangeEventCounter)).toBe('1');

    await switchBtn.click();
    expect(await getCounterValue(switchChangeEventCounter)).toBe('2');

    await switchBtn.click();
    expect(await getCounterValue(switchChangeEventCounter)).toBe('3');
  });
});

describe('modal', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const modalOpenBtn = await selectNode(page, 'p-modal ~ button');
    const modalCloseBtn = await selectNode(page, 'p-modal >>> p-button-pure >>> button');
    const modalDismissEventCounter = await selectNode(page, 'p-modal + p');

    await modalOpenBtn.click();
    await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 600)); // fade-in transition
    await modalCloseBtn.click();
    await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 200)); // fade-out transition
    expect(await getCounterValue(modalDismissEventCounter)).toBe('1');

    await modalOpenBtn.click();
    await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 600)); // fade-in transition
    await modalCloseBtn.click();
    await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 200)); // fade-out transition
    expect(await getCounterValue(modalDismissEventCounter)).toBe('2');

    await modalOpenBtn.click();
    await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 600)); // fade-in transition
    await modalCloseBtn.click();
    await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 200)); // fade-out transition
    expect(await getCounterValue(modalDismissEventCounter)).toBe('3');
  });
});

describe('table', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const tableHeadBtn = await selectNode(page, 'p-table-head-cell >>> button');
    const tableChangeEventCounter = await selectNode(page, 'p-table + p');

    await tableHeadBtn.click();
    expect(await getCounterValue(tableChangeEventCounter)).toBe('1');

    await tableHeadBtn.click();
    expect(await getCounterValue(tableChangeEventCounter)).toBe('2');

    await tableHeadBtn.click();
    expect(await getCounterValue(tableChangeEventCounter)).toBe('3');
  });
});

describe('accordion', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const accordionButton = await selectNode(page, 'p-accordion >>> button');
    const accordionChangeEventCounter = await selectNode(page, 'p-accordion + p');

    await accordionButton.click();
    expect(await getCounterValue(accordionChangeEventCounter)).toBe('1');

    await accordionButton.click();
    expect(await getCounterValue(accordionChangeEventCounter)).toBe('2');

    await accordionButton.click();
    expect(await getCounterValue(accordionChangeEventCounter)).toBe('3');
  });
});

describe('carousel', () => {
  it('should emit events once', async () => {
    await goto(page, 'events');

    const prevButton = await selectNode(page, 'p-carousel >>> p-button-pure');
    const carouselChangeEventCounter = await selectNode(page, 'p-carousel + p');

    await prevButton.click();
    expect(await getCounterValue(carouselChangeEventCounter)).toBe('1');

    await prevButton.click();
    expect(await getCounterValue(carouselChangeEventCounter)).toBe('2');

    await prevButton.click();
    expect(await getCounterValue(carouselChangeEventCounter)).toBe('3');
  });
});
