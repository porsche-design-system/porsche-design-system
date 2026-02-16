import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import {
  addEventListener,
  getAttribute,
  getElementStyle,
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
const getDetails = (page: Page) => page.locator('p-accordion details');
const getInput = (page: Page) => page.locator('input');
const getCollapsible = (page: Page) => page.locator('p-accordion details > div');
const getBody = (page: Page) => page.locator('body');
const getCollapseVisibility = async (page: Page) => getElementStyle(getCollapsible(page), 'visibility');
const getCollapseGridTemplateRows = async (page: Page) => getElementStyle(getCollapsible(page), 'gridTemplateRows');

test('should set "gridTemplateRows: 1fr" and "visibility: visible" on collapsible on initial open', async ({
  page,
}) => {
  await initAccordion(page, { isOpen: true });
  expect(await getCollapseGridTemplateRows(page)).not.toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('visible');
});

test('should set "gridTemplateRows: 0fr" (0px) and "visibility: hidden" on collapsible on initial close', async ({
  page,
}) => {
  await initAccordion(page);
  expect(await getCollapseGridTemplateRows(page)).toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('hidden');
});

test('should set correct gridTemplateRows and visibility on collapsible on open change', async ({ page }) => {
  await initAccordion(page);
  const host = getHost(page);

  expect(await getCollapseGridTemplateRows(page), 'initially').toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('hidden');

  await setProperty(host, 'open', true);
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows(page), 'after open=true').not.toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('visible');

  await setProperty(host, 'open', false);
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows(page), 'after open=false').toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('hidden');
});

test('should have correct gridTemplateRows and visibility after fast open/close re-trigger', async ({ page }) => {
  await initAccordion(page, { otherPostMarkup: clickHandlerScript });
  const summary = getSummary(page);

  // expand -> collapse -> expand
  await summary.click();
  await summary.click();
  await summary.click();
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows(page)).not.toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('visible');
});

test('should have correct gridTemplateRows and visibility after fast close/open re-trigger', async ({ page }) => {
  await initAccordion(page, { isOpen: true, otherPostMarkup: clickHandlerScript });
  const summary = getSummary(page);

  // collapse -> expand -> collapse
  await summary.click();
  await summary.click();
  await summary.click();
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows(page)).toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('hidden');
});

test('should show add attribute open when opened', async ({ page }) => {
  await initAccordion(page, { otherPostMarkup: clickHandlerScript });
  const details = getDetails(page);
  const summary = getSummary(page);

  expect(await getAttribute(details, 'open'), 'initial when closed').toBe(null);

  await summary.click();
  await waitForStencilLifecycle(page);

  expect(await getAttribute(details, 'open'), 'after click to open').toBe('');

  await summary.click();
  await waitForStencilLifecycle(page);

  expect(await getAttribute(details, 'open'), 'after click to close').toBe(null);
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
