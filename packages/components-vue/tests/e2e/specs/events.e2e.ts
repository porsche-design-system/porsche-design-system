import { expect, type Locator, test } from '@playwright/test';
import { getConsoleErrorsAmount, goto, initConsoleObserver } from '../helpers';

const getCounterValue = async (el: Locator): Promise<string> => {
  return el.evaluate((element: Element) => element.innerHTML);
};

test.describe('pagination', () => {
  test('should emit events once', async ({ page }) => {
    await goto(page, 'events');

    const nav = page.getByRole('navigation');
    const paginationUpdateEventCounter = page.locator('p-pagination + p');
    const [, secondBtn, thirdBtn, fourthBtn] = (await nav.locator('span:not(.ellipsis)').all()).slice(1, -1); // without prev and next

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

    const tabsBar = page.locator('p-tabs-bar');
    const tabsBarUpdateEventCounter = page.locator('p-tabs-bar + p');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.locator('button').all();

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
    const select = page.locator('select').first();
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

    const tabsBar = page.locator('p-tabs >>> p-tabs-bar');
    const tabsUpdateEventCounter = page.locator('p-tabs + p');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.locator('button').all();

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

    const input = page.locator('p-text-field-wrapper > input[type=search]');
    const inputValue = page.locator('p-text-field-wrapper + p');

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

    const switchBtn = page.locator('p-switch button');
    const switchUpdateEventCounter = page.locator('p-switch + p');

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
    const bannerOpenBtn = page.locator('p-banner ~ button');
    const bannerCloseBtn = page.locator('p-banner p-inline-notification .close');
    const bannerDismissEventCounter = page.locator('p-banner + p');

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

    const modalOpenBtn = page.locator('p-modal ~ button');
    const modalCloseBtn = page.locator('p-modal p-button button');
    const modalDismissEventCounter = page.locator('p-modal + p');

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

    const tableHeadBtn = page.locator('p-table-head-cell button');
    const tableUpdateEventCounter = page.locator('p-table + p');

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

    const accordionButton = page.locator('p-accordion button');
    const accordionUpdateEventCounter = page.locator('p-accordion + p');

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

    const prevButton = page.locator('p-carousel p-button-pure').first();
    const carouselUpdateEventCounter = page.locator('p-carousel + p');

    await prevButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('1');

    await prevButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('2');

    await prevButton.click();
    expect(await getCounterValue(carouselUpdateEventCounter)).toBe('3');
  });
});

test.describe('input-date', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-date');
    const inputValue = page.locator('p-input-date + p');
    const blurValue = page.locator('p-input-date + p + p');
    const changeValue = page.locator('p-input-date + p + p + p');

    await input.focus();
    await page.locator('p-input-date input').fill('2025-10-17');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: 2025-10-17');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-week', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-week');
    const inputValue = page.locator('p-input-week + p');
    const blurValue = page.locator('p-input-week + p + p');
    const changeValue = page.locator('p-input-week + p + p + p');

    await input.focus();
    await page.locator('p-input-week input').fill('2025-W26');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: 2025-W26');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-month', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-month');
    const inputValue = page.locator('p-input-month + p');
    const blurValue = page.locator('p-input-month + p + p');
    const changeValue = page.locator('p-input-month + p + p + p');

    await input.focus();
    await page.locator('p-input-month input').fill('2025-05');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: 2025-05');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-email', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-email');
    const inputValue = page.locator('p-input-email + p');
    const blurValue = page.locator('p-input-email + p + p');
    const changeValue = page.locator('p-input-email + p + p + p');

    await input.focus();
    await page.keyboard.type('hello@example.com');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: hello@example.com');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-number', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-number');
    const inputValue = page.locator('p-input-number + p');
    const blurValue = page.locator('p-input-number + p + p');
    const changeValue = page.locator('p-input-number + p + p + p');

    await input.focus();
    await page.keyboard.type('42');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: 42');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-password', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-password');
    const inputValue = page.locator('p-input-password + p');
    const blurValue = page.locator('p-input-password + p + p');
    const changeValue = page.locator('p-input-password + p + p + p');

    await input.focus();
    await page.keyboard.type('secret123');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: secret123');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-search', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-search');
    const inputValue = page.locator('p-input-search + p');
    const blurValue = page.locator('p-input-search + p + p');
    const changeValue = page.locator('p-input-search + p + p + p');

    await input.focus();
    await page.keyboard.type('query');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: query');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-tel', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-tel');
    const inputValue = page.locator('p-input-tel + p');
    const blurValue = page.locator('p-input-tel + p + p');
    const changeValue = page.locator('p-input-tel + p + p + p');

    await input.focus();
    await page.keyboard.type('+123456789');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: +123456789');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-text', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-text');
    const inputValue = page.locator('p-input-text + p');
    const blurValue = page.locator('p-input-text + p + p');
    const changeValue = page.locator('p-input-text + p + p + p');

    await input.focus();
    await page.keyboard.type('hello world');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: hello world');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-time', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-time');
    const inputValue = page.locator('p-input-time + p');
    const blurValue = page.locator('p-input-time + p + p');
    const changeValue = page.locator('p-input-time + p + p + p');

    await input.focus();
    await page.locator('p-input-time input').fill('12:34');

    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: 12:34');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('input-url', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-input-url');
    const inputValue = page.locator('p-input-url + p');
    const blurValue = page.locator('p-input-url + p + p');
    const changeValue = page.locator('p-input-url + p + p + p');

    await input.focus();
    await page.keyboard.type('https://example.com');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: https://example.com');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});

test.describe('textarea', () => {
  test('should have working input, blur and change functionality', async ({ page }) => {
    await goto(page, 'events');

    const input = page.locator('p-textarea');
    const inputValue = page.locator('p-textarea + p');
    const blurValue = page.locator('p-textarea + p + p');
    const changeValue = page.locator('p-textarea + p + p + p');

    await input.focus();
    await page.keyboard.type('This is a textarea test');
    await expect.poll(async () => await getCounterValue(inputValue)).toBe('Value: This is a textarea test');

    await input.blur();
    await expect.poll(async () => await getCounterValue(blurValue)).toBe('Blur: 1');

    await expect.poll(async () => await getCounterValue(changeValue)).toBe('Change: 1');
  });
});
