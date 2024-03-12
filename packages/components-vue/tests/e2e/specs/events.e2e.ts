import { type ElementHandle, test, expect } from '@playwright/test';
import { getConsoleErrorsAmount, goto, initConsoleObserver, selectNode } from '../helpers';

const getCounterValue = async (el: ElementHandle): Promise<string> => {
  return el.evaluate((element: Element) => element.innerHTML);
};

test.describe('pagination', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const nav = await selectNode(page, 'p-pagination >>> nav');
    const paginationUpdateEventCounter = await selectNode(page, 'p-pagination + p');
    const [, secondBtn, thirdBtn, fourthBtn] = (await nav.$$('span:not(.ellipsis)')).slice(1, -1); // without prev and next

    await secondBtn.click();
    expect(await getCounterValue(paginationUpdateEventCounter)).toBe('1');

    await thirdBtn.click();
    expect(await getCounterValue(paginationUpdateEventCounter)).toBe('2');

    await fourthBtn.click();
    expect(await getCounterValue(paginationUpdateEventCounter)).toBe('3');
  });
});

test.describe('tabs-bar', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const tabsBar = await selectNode(page, 'p-tabs-bar');
    const tabsBarUpdateEventCounter = await selectNode(page, 'p-tabs-bar + p');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.$$('button');

    await secondBtn.click();

    expect(await getCounterValue(tabsBarUpdateEventCounter)).toBe('1');

    await thirdBtn.click();
    expect(await getCounterValue(tabsBarUpdateEventCounter)).toBe('2');

    await firstBtn.click();
    expect(await getCounterValue(tabsBarUpdateEventCounter)).toBe('3');
  });

  test('should not throw error when used with router', async ({ page }) => {
    initConsoleObserver(page);
    await goto(page, 'overview'); // to load component chunk

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

test.describe('tabs', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const tabsBar = await selectNode(page, 'p-tabs >>> p-tabs-bar');
    const tabsUpdateEventCounter = await selectNode(page, 'p-tabs + p');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.$$('button');

    await secondBtn.click();
    expect(await getCounterValue(tabsUpdateEventCounter)).toBe('1');

    await thirdBtn.click();
    expect(await getCounterValue(tabsUpdateEventCounter)).toBe('2');

    await firstBtn.click();
    expect(await getCounterValue(tabsUpdateEventCounter)).toBe('3');
  });
});

test.describe('text-field-wrapper type="search"', () => {
  test('should have working clear functionality', async ({ page }) => {
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

test.describe('switch', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const switchBtn = await selectNode(page, 'p-switch >>> button');
    const switchUpdateEventCounter = await selectNode(page, 'p-switch + p');

    await switchBtn.click();
    expect(await getCounterValue(switchUpdateEventCounter)).toBe('1');

    await switchBtn.click();
    expect(await getCounterValue(switchUpdateEventCounter)).toBe('2');

    await switchBtn.click();
    expect(await getCounterValue(switchUpdateEventCounter)).toBe('3');
  });
});

test.describe('banner', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const banner = await page.locator('p-banner');
    const bannerOpenBtn = await selectNode(page, 'p-banner ~ button');
    const bannerCloseBtn = await selectNode(page, 'p-banner >>> p-inline-notification >>> p-button-pure.close');
    const bannerDismissEventCounter = await selectNode(page, 'p-banner + p');

    await bannerOpenBtn.click();
    await expect(banner).toBeVisible();
    await bannerCloseBtn.click();
    await expect(banner).toBeHidden();
    expect(await getCounterValue(bannerDismissEventCounter)).toBe('1');

    await bannerOpenBtn.click();
    await expect(banner).toBeVisible();
    await bannerCloseBtn.click();
    await expect(banner).toBeHidden();
    expect(await getCounterValue(bannerDismissEventCounter)).toBe('2');

    await bannerOpenBtn.click();
    await expect(banner).toBeVisible();
    await bannerCloseBtn.click();
    await expect(banner).toBeHidden();
    expect(await getCounterValue(bannerDismissEventCounter)).toBe('3');
  });
});

test.describe('modal', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const modalOpenBtn = await selectNode(page, 'p-modal ~ button');
    const modalCloseBtn = await selectNode(page, 'p-modal >>> p-button-pure >>> button');
    const modalDismissEventCounter = await selectNode(page, 'p-modal + p');

    await modalOpenBtn.click();
    // await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 600)); // fade-in transition
    await modalCloseBtn.click();
    // await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 200)); // fade-out transition
    expect(await getCounterValue(modalDismissEventCounter)).toBe('1');

    await modalOpenBtn.click();
    // await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 600)); // fade-in transition
    await modalCloseBtn.click();
    // await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 200)); // fade-out transition
    expect(await getCounterValue(modalDismissEventCounter)).toBe('2');

    await modalOpenBtn.click();
    // await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 600)); // fade-in transition
    await modalCloseBtn.click();
    // await waitForComponentsReady(page);
    await new Promise((resolve) => setTimeout(resolve, 200)); // fade-out transition
    expect(await getCounterValue(modalDismissEventCounter)).toBe('3');
  });
});

test.describe('table', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const tableHeadBtn = await selectNode(page, 'p-table-head-cell >>> button');
    const tableUpdateEventCounter = await selectNode(page, 'p-table + p');

    await tableHeadBtn.click();
    expect(await getCounterValue(tableUpdateEventCounter)).toBe('1');

    await tableHeadBtn.click();
    expect(await getCounterValue(tableUpdateEventCounter)).toBe('2');

    await tableHeadBtn.click();
    expect(await getCounterValue(tableUpdateEventCounter)).toBe('3');
  });
});

test.describe('accordion', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const accordionButton = await selectNode(page, 'p-accordion >>> button');
    const accordionUpdateEventCounter = await selectNode(page, 'p-accordion + p');

    await accordionButton.click();

    expect(await getCounterValue(accordionUpdateEventCounter)).toBe('1');

    await accordionButton.click();
    expect(await getCounterValue(accordionUpdateEventCounter)).toBe('2');

    await accordionButton.click();
    expect(await getCounterValue(accordionUpdateEventCounter)).toBe('3');
  });
});

test.describe('carousel', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const prevButton = await selectNode(page, 'p-carousel >>> p-button-pure');
    const carouselUpdateEventCounter = await selectNode(page, 'p-carousel + p');

    await prevButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('1');

    await prevButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('2');

    await prevButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('3');
  });
});
