import { type ElementHandle, test, expect } from '@playwright/test';
import { getConsoleErrorsAmount, goto, initConsoleObserver, waitForComponentsReady } from '../helpers';

const getCounterValue = async (el: ElementHandle): Promise<string> => {
  return el.evaluate((element: Element & { prevInnerHtml: string }) => {
    element.prevInnerHtml = element.innerHTML;
    return element.innerHTML;
  });
};

test.describe('pagination', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const nav = await page.$('p-pagination >>> nav');
    const paginationUpdateEventCounter = await page.$('p-pagination + p');
    const [, secondBtn, thirdBtn, fourthBtn] = (await nav.$$('span:not(.ellipsis)')).slice(1, -1); // without prev and next;

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

    const tabsBar = await page.$('p-tabs-bar');
    const tabsBarUpdateEventCounter = await page.$('p-tabs-bar + p');
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
    await goto(page, 'tabs-bar'); // to load component chunk

    // navigate via select, otherwise we would have a reload
    const select = await page.$('select');
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

    const tabsBar = await page.$('p-tabs >>> p-tabs-bar');
    const tabsUpdateEventCounter = await page.$('p-tabs + p');
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

    const input = await page.$('p-text-field-wrapper > input[type=search]');
    const inputValue = await page.$('p-text-field-wrapper + p');

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

    const switchBtn = await page.$('p-switch >>> button');
    const switchUpdateEventCounter = await page.$('p-switch + p');

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

    const banner = page.locator('p-banner');
    const bannerOpenBtn = await page.$('p-banner ~ button');
    const bannerCloseBtn = await page.$('p-banner >>> p-inline-notification >>> p-button-pure.close');
    const bannerDismissEventCounter = await page.$('p-banner + p');

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

    const modalOpenBtn = page.getByRole('button', { name: 'Open Modal' });
    const modalCloseBtn = page.locator('p-modal').getByRole('button', { name: 'Dismiss modal' });
    const modalDismissEventCounter = await page.$('p-modal + p');

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

test.describe('table', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const tableHeadBtn = page.locator('p-table-head-cell').getByRole('button');
    const tableUpdateEventCounter = await page.$('p-table + p');

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

    const accordionButton = page.locator('p-accordion').getByRole('button');
    const accordionUpdateEventCounter = await page.$('p-accordion + p');

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

    const goToLastSlideButton = page.locator('p-carousel').getByRole('button', { name: 'Go to last slide' }); // await selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
    const prevSlideButton = page.locator('p-carousel').getByRole('button', { name: 'Previous slide' });
    const carouselUpdateEventCounter = await page.$('p-carousel + p');

    await goToLastSlideButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('1');

    await prevSlideButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('2');

    await prevSlideButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('3');
  });
});
