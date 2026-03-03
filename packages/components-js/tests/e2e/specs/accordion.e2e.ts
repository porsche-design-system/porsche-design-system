import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import {
  addEventListener,
  getEventSummary,
  getLifecycleStatus,
  hasFocus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const clickHandlerScript = `
<script>
  const accordion = document.querySelector('p-accordion');
  accordion.addEventListener('update', (e) => {
    e.target.open = e.detail.open;
  });
</script>`;

type InitOptions = {
  otherPreMarkup?: string;
  otherPostMarkup?: string;
  otherSlottedMarkup?: string;
  hasInput?: boolean;
  isOpen?: boolean;
};

const initAccordion = (page: Page, opts?: InitOptions) => {
  const { otherPreMarkup = '', otherPostMarkup = '', otherSlottedMarkup = '', hasInput, isOpen = false } = opts || {};

  const content = `${otherPreMarkup}<p-accordion open="${isOpen}">
<span slot="summary">Some Accordion</span>
Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
ut labore et dolore magna aliquyam erat, sed diam voluptua.${hasInput ? '<input type="text"/>' : ''}
${otherSlottedMarkup}
</p-accordion>${otherPostMarkup}`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.locator('p-accordion');
const getSummary = (page: Page) => page.locator('p-accordion summary');
const getSummaryBefore = (page: Page) => page.locator('p-accordion details slot[name="summary-before"]');
const getSummaryAfter = (page: Page) => page.locator('p-accordion details slot[name="summary-after"]');
const getDetails = (page: Page) => page.locator('p-accordion details');
const getInput = (page: Page) => page.locator('input');
const getCollapsible = (page: Page) => page.locator('p-accordion details > div');
const getBody = (page: Page) => page.locator('body');
const getCollapsibleHeight = async (page: Page): Promise<number> => {
  return await getCollapsible(page)
    .boundingBox()
    .then((box) => box?.height);
};

test('should set "gridTemplateRows: 1fr" and "visibility: visible" on collapsible on initial open', async ({
  page,
}) => {
  await initAccordion(page, { isOpen: true });

  expect(await getCollapsibleHeight(page)).toBeGreaterThan(0);
  await expect(getCollapsible(page)).toBeVisible();
});

test('should set "gridTemplateRows: 0fr" (0px) and "visibility: hidden" on collapsible on initial close', async ({
  page,
}) => {
  await initAccordion(page);

  expect(await getCollapsibleHeight(page)).toBe(0);
  await expect(getCollapsible(page)).toBeHidden();
});

test('should set correct gridTemplateRows and visibility on collapsible on open change', async ({ page }) => {
  await initAccordion(page);
  const host = getHost(page);

  expect(await getCollapsibleHeight(page), 'initially').toBe(0);
  await expect(getCollapsible(page)).toBeHidden();

  await setProperty(host, 'open', true);
  await waitForStencilLifecycle(page);

  expect(await getCollapsibleHeight(page), 'after open=true').toBeGreaterThan(0);
  await expect(getCollapsible(page)).toBeVisible();

  await setProperty(host, 'open', false);
  await waitForStencilLifecycle(page);

  expect(await getCollapsibleHeight(page), 'after open=false').toBe(0);
  await expect(getCollapsible(page)).toBeHidden();
});

test('should have correct gridTemplateRows and visibility after fast open/close re-trigger', async ({ page }) => {
  await initAccordion(page, { otherPostMarkup: clickHandlerScript });
  const summary = getSummary(page);

  // expand -> collapse -> expand
  await summary.click();
  await summary.click();
  await summary.click();
  await waitForStencilLifecycle(page);

  expect(await getCollapsibleHeight(page)).toBeGreaterThan(0);
  await expect(getCollapsible(page)).toBeVisible();
});

test('should have correct gridTemplateRows and visibility after fast close/open re-trigger', async ({ page }) => {
  await initAccordion(page, { isOpen: true, otherPostMarkup: clickHandlerScript });
  const summary = getSummary(page);

  // collapse -> expand -> collapse
  await summary.click();
  await summary.click();
  await summary.click();
  await waitForStencilLifecycle(page);

  expect(await getCollapsibleHeight(page)).toBe(0);
  await expect(getCollapsible(page)).toBeHidden();
});

test('should add attribute "open" when opened', async ({ page }) => {
  await initAccordion(page, { otherPostMarkup: clickHandlerScript });
  const details = getDetails(page);
  const summary = getSummary(page);

  await expect(details, 'initial when closed').not.toHaveAttribute('open', '');

  await summary.click();
  await waitForStencilLifecycle(page);

  await expect(details, 'after click to open').toHaveAttribute('open', '');

  await summary.click();
  await waitForStencilLifecycle(page);

  await expect(details, 'after click to close').not.toHaveAttribute('open', '');
});

test.describe('after dynamic slot change', () => {
  skipInBrowsers(['webkit', 'firefox']);

  test('should show summary-before', async ({ page }) => {
    await initAccordion(page);
    const host = getHost(page);
    const summaryBeforeText = 'Some slotted summary-before content';

    await host.evaluate((el, summaryBeforeText) => {
      el.innerHTML = `<div slot="summary-before">${summaryBeforeText}</div>`;
    }, summaryBeforeText);

    await expect(page.getByText(summaryBeforeText)).toBeVisible();
    await expect(getSummaryBefore(page)).toBeVisible();
  });

  test('should show summary-after', async ({ page }) => {
    await initAccordion(page);
    const host = getHost(page);
    const summaryAfterText = 'Some slotted summary-after content';

    await host.evaluate((el, summaryAfterText) => {
      el.innerHTML = `<div slot="summary-after">${summaryAfterText}</div>`;
    }, summaryAfterText);

    await expect(page.getByText(summaryAfterText)).toBeVisible();
    await expect(getSummaryAfter(page)).toBeVisible();
  });
});

test.describe('events', () => {
  skipInBrowsers(['webkit']);

  test('should emit accordionChange event on button mouse click', async ({ page }) => {
    await initAccordion(page, { otherPostMarkup: clickHandlerScript });
    const host = getHost(page);
    const summary = getSummary(page);
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await summary.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });

  test('should emit update event on enter press', async ({ page }) => {
    await initAccordion(page, { otherPostMarkup: clickHandlerScript });
    const host = getHost(page);
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

test.describe('focus', () => {
  skipInBrowsers(['firefox', 'webkit']);

  test('should have focusable content when opened', async ({ page }) => {
    await initAccordion(page, { otherPostMarkup: clickHandlerScript, hasInput: true });
    const summary = getSummary(page);
    const input = getInput(page);
    const body = getBody(page);

    expect(await hasFocus(body)).toBe(true);

    await summary.click();
    await waitForStencilLifecycle(page);
    await page.keyboard.press('Tab');

    expect(await hasFocus(input)).toBe(true);
  });

  test('should not have focusable content when closed', async ({ page }) => {
    const otherPostMarkup = '<a href="#">Some Link</a>';
    await initAccordion(page, { otherPostMarkup, hasInput: true });
    const host = getHost(page);
    const body = getBody(page);
    const link = page.locator('a');

    expect(await hasFocus(body)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(host)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(link)).toBe(true);
  });

  test('should lose focus on content when closed', async ({ page }) => {
    await initAccordion(page, { otherPostMarkup: clickHandlerScript, hasInput: true, isOpen: true });
    const host = getHost(page);
    const input = getInput(page);
    const body = getBody(page);

    await page.keyboard.press('Tab');

    expect(await hasFocus(host)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(input)).toBe(true);

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);

    expect(await hasFocus(body)).toBe(true);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initAccordion(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-accordion'], 'componentDidLoad: p-accordion').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initAccordion(page);
    const host = getHost(page);
    await setProperty(host, 'open', true);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-accordion'], 'componentDidUpdate: p-accordion').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });
});
