import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  hasFocus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { HeadingTag } from '@porsche-design-system/components/dist/types/bundle';

const clickHandlerScript = `
<script>
  const accordion = document.querySelector('p-accordion');
  accordion.addEventListener('update', (e) => {
    e.target.open = e.detail.open;
  });
</script>`;

type InitOptions = {
  tag?: HeadingTag;
  otherMarkup?: string;
  hasInput?: boolean;
  isOpen?: boolean;
};

const initAccordion = (page: Page, opts?: InitOptions) => {
  const { tag = 'h2', otherMarkup = '', hasInput, isOpen = false } = opts || {};

  const content = `<p-accordion heading="Some Accordion" tag="${tag}" open="${isOpen}">
Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
ut labore et dolore magna aliquyam erat, sed diam voluptua.${hasInput ? '<input type="text"/>' : ''}
</p-accordion>${otherMarkup}`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => selectNode(page, 'p-accordion');
const getButton = (page: Page) => selectNode(page, 'p-accordion >>> button');
const getInput = (page: Page) => selectNode(page, 'input');
const getCollapsible = (page: Page) => selectNode(page, 'p-accordion >>> .collapsible');
const getBody = (page: Page) => selectNode(page, 'body');
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
  await initAccordion(page, { otherMarkup: clickHandlerScript });
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
  await initAccordion(page, { isOpen: true, otherMarkup: clickHandlerScript });
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
  await initAccordion(page, { otherMarkup: clickHandlerScript });
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
  test('should emit accordionChange event on button mouse click', async ({ page }) => {
    await initAccordion(page, { otherMarkup: clickHandlerScript });
    const host = await getHost(page);
    const button = await getButton(page);
    await addEventListener(host, 'accordionChange');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(0);

    await button.click();
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(1);
  });

  test('should emit accordionChange event on enter press', async ({ page }) => {
    await initAccordion(page, { otherMarkup: clickHandlerScript });
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
  test('should have focusable content when opened', async ({ page }) => {
    await initAccordion(page, { otherMarkup: clickHandlerScript, hasInput: true });
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
    const otherMarkup = '<a href="#">Some Link</a>';
    await initAccordion(page, { otherMarkup, hasInput: true });
    const host = await getHost(page);
    const body = await getBody(page);
    const link = await selectNode(page, 'a');

    expect(await hasFocus(body)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(host)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(link)).toBe(true);
  });

  test('should lose focus on content when closed', async ({ page }) => {
    await initAccordion(page, { otherMarkup: clickHandlerScript, hasInput: true, isOpen: true });
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
