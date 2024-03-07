import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
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
import type { HeadingTag } from '@porsche-design-system/components';

const clickHandlerScript = `
<script>
  const accordion = document.querySelector('p-accordion');
  accordion.addEventListener('update', (e) => {
    e.target.open = e.detail.open;
  });
</script>`;

type InitOptions = {
  tag?: HeadingTag;
  otherPreMarkup?: string;
  otherPostMarkup?: string;
  otherSlottedMarkup?: string;
  hasInput?: boolean;
  isOpen?: boolean;
};

const initAccordion = (page: Page, opts?: InitOptions) => {
  const {
    tag = 'h2',
    otherPreMarkup = '',
    otherPostMarkup = '',
    otherSlottedMarkup = '',
    hasInput,
    isOpen = false,
  } = opts || {};

  const content = `${otherPreMarkup}<p-accordion heading="Some Accordion" tag="${tag}" open="${isOpen}">
Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
ut labore et dolore magna aliquyam erat, sed diam voluptua.${hasInput ? '<input type="text"/>' : ''}
${otherSlottedMarkup}
</p-accordion>${otherPostMarkup}`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.$('p-accordion');
const getButton = (page: Page) => page.$('p-accordion button');
const getInput = (page: Page) => page.$('input');
const getCollapsible = (page: Page) => page.$('p-accordion .collapsible');
const getBody = (page: Page) => page.$('body');
const getCollapseVisibility = async (page: Page) => getElementStyle(await getCollapsible(page), 'visibility');
const getCollapseGridTemplateRows = async (page: Page) =>
  getElementStyle(await getCollapsible(page), 'gridTemplateRows');

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

test('should not produce scrollbars of parent element on initial close', async ({ page }) => {
  const otherPreMarkup = `
    <div id="container" style="height: 200px; overflow: auto">
      <div style="transform: translate3d(0, 0, 0)">`;
  const otherPostMarkup = '</div></div>';
  const otherSlottedMarkup = `
    <div style="height: 1000px"></div>
    <p-button>Lorem ipsum</p-button>`;

  await initAccordion(page, { otherPreMarkup, otherPostMarkup, otherSlottedMarkup });

  const container = await page.$('#container');
  const clientHeight = await container.evaluate((el) => el.clientHeight);
  const scrollHeight = await container.evaluate((el) => el.scrollHeight);

  expect(scrollHeight > clientHeight).toBe(false);
});

test('should set correct gridTemplateRows and visibility on collapsible on open change', async ({ page }) => {
  await initAccordion(page);
  const host = await getHost(page);

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
  const button = await getButton(page);

  // expand -> collapse -> expand
  await button.click();
  await button.click();
  await button.click();
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows(page)).not.toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('visible');
});

test('should have correct gridTemplateRows and visibility after fast close/open re-trigger', async ({ page }) => {
  await initAccordion(page, { isOpen: true, otherPostMarkup: clickHandlerScript });
  const button = await getButton(page);

  // collapse -> expand -> collapse
  await button.click();
  await button.click();
  await button.click();
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows(page)).toBe('0px');
  expect(await getCollapseVisibility(page)).toBe('hidden');
});

test('should show aria-expanded true when open and false when closed', async ({ page }) => {
  await initAccordion(page, { otherPostMarkup: clickHandlerScript });
  const button = await getButton(page);

  expect(await getAttribute(button, 'aria-expanded'), 'initial when closed').toBe('false');

  await button.click();
  await waitForStencilLifecycle(page);

  expect(await getAttribute(button, 'aria-expanded'), 'after click to open').toBe('true');

  await button.click();
  await waitForStencilLifecycle(page);

  expect(await getAttribute(button, 'aria-expanded'), 'after click to close').toBe('false');
});

test.describe('events', () => {
  skipInBrowsers(['webkit']);

  test('should emit accordionChange event on button mouse click', async ({ page }) => {
    await initAccordion(page, { otherPostMarkup: clickHandlerScript });
    const host = await getHost(page);
    const button = await getButton(page);
    await addEventListener(host, 'accordionChange');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(0);

    await button.click();
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(1);
  });

  test('should emit accordionChange event on enter press', async ({ page }) => {
    await initAccordion(page, { otherPostMarkup: clickHandlerScript });
    const host = await getHost(page);
    await addEventListener(host, 'accordionChange');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(1);
  });

  test('should emit both accordionChange and update event', async ({ page }) => {
    await initAccordion(page);
    const host = await getHost(page);

    await addEventListener(host, 'accordionChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const button = await getButton(page);
    await button.click();
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

test.describe('focus', () => {
  skipInBrowsers(['firefox', 'webkit']);

  test('should have focusable content when opened', async ({ page }) => {
    await initAccordion(page, { otherPostMarkup: clickHandlerScript, hasInput: true });
    const button = await getButton(page);
    const input = await getInput(page);
    const body = await getBody(page);

    expect(await hasFocus(body)).toBe(true);

    await button.click();
    await waitForStencilLifecycle(page);
    await page.keyboard.press('Tab');

    expect(await hasFocus(input)).toBe(true);
  });

  test('should not have focusable content when closed', async ({ page }) => {
    const otherPostMarkup = '<a href="#">Some Link</a>';
    await initAccordion(page, { otherPostMarkup, hasInput: true });
    const host = await getHost(page);
    const body = await getBody(page);
    const link = await page.$('a');

    expect(await hasFocus(body)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(host)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(link)).toBe(true);
  });

  test('should lose focus on content when closed', async ({ page }) => {
    await initAccordion(page, { otherPostMarkup: clickHandlerScript, hasInput: true, isOpen: true });
    const host = await getHost(page);
    const input = await getInput(page);
    const body = await getBody(page);

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
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initAccordion(page);
    const host = await getHost(page);
    await setProperty(host, 'open', true);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-accordion'], 'componentDidUpdate: p-accordion').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });
});
