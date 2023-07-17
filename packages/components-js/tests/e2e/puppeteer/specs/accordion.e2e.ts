import type { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
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

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

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

const initAccordion = (opts?: InitOptions) => {
  const { tag = 'h2', otherMarkup = '', hasInput, isOpen = false } = opts || {};

  const content = `<p-accordion heading="Some Accordion" tag="${tag}" open="${isOpen}">
Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
ut labore et dolore magna aliquyam erat, sed diam voluptua.${hasInput ? '<input type="text"/>' : ''}
</p-accordion>${otherMarkup}`;

  return setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-accordion');
const getButton = () => selectNode(page, 'p-accordion >>> button');
const getInput = () => selectNode(page, 'input');
const getCollapsible = () => selectNode(page, 'p-accordion >>> .collapsible');
const getBody = () => selectNode(page, 'body');
const getCollapseVisibility = async () => getElementStyle(await getCollapsible(), 'visibility');
const getCollapseGridTemplateRows = async () => getElementStyle(await getCollapsible(), 'gridTemplateRows');

it('should set "gridTemplateRows: 1fr" and "visibility: visible" on collapsible on initial open', async () => {
  await initAccordion({ isOpen: true });
  expect(await getCollapseGridTemplateRows()).not.toBe('0px');
  expect(await getCollapseVisibility()).toBe('visible');
});

it('should set "gridTemplateRows: 0fr" (0px) and "visibility: hidden" on collapsible on initial close', async () => {
  await initAccordion();
  expect(await getCollapseGridTemplateRows()).toBe('0px');
  expect(await getCollapseVisibility()).toBe('hidden');
});

it('should set correct gridTemplateRows and visibility on collapsible on open change', async () => {
  await initAccordion();
  const host = await getHost();

  expect(await getCollapseGridTemplateRows(), 'initially').toBe('0px');
  expect(await getCollapseVisibility()).toBe('hidden');

  await setProperty(host, 'open', true);
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows(), 'after open=true').not.toBe('0px');
  expect(await getCollapseVisibility()).toBe('visible');

  await setProperty(host, 'open', false);
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows(), 'after open=false').toBe('0px');
  expect(await getCollapseVisibility()).toBe('hidden');
});

it('should have correct gridTemplateRows and visibility after fast open/close re-trigger', async () => {
  await initAccordion({ otherMarkup: clickHandlerScript });
  const button = await getButton();

  // expand -> collapse -> expand
  await button.click();
  await button.click();
  await button.click();
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows()).not.toBe('0px');
  expect(await getCollapseVisibility()).toBe('visible');
});

it('should have correct gridTemplateRows and visibility after fast close/open re-trigger', async () => {
  await initAccordion({ isOpen: true, otherMarkup: clickHandlerScript });
  const button = await getButton();

  // collapse -> expand -> collapse
  await button.click();
  await button.click();
  await button.click();
  await waitForStencilLifecycle(page);

  expect(await getCollapseGridTemplateRows()).toBe('0px');
  expect(await getCollapseVisibility()).toBe('hidden');
});

it('should show aria-expanded true when open and false when closed', async () => {
  await initAccordion({ otherMarkup: clickHandlerScript });
  const button = await getButton();

  expect(await getAttribute(button, 'aria-expanded'), 'initial when closed').toBe('false');

  await button.click();
  await waitForStencilLifecycle(page);

  expect(await getAttribute(button, 'aria-expanded'), 'after click to open').toBe('true');

  await button.click();
  await waitForStencilLifecycle(page);

  expect(await getAttribute(button, 'aria-expanded'), 'after click to close').toBe('false');
});

describe('events', () => {
  it('should emit accordionChange event on button mouse click', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript });
    const host = await getHost();
    const button = await getButton();
    await addEventListener(host, 'accordionChange');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(0);

    await button.click();
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(1);
  });

  it('should emit accordionChange event on enter press', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript });
    const host = await getHost();
    await addEventListener(host, 'accordionChange');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(1);
  });

  it('should emit both accordionChange and update event', async () => {
    await initAccordion();
    const host = await getHost();

    await addEventListener(host, 'accordionChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const button = await getButton();
    await button.click();
    expect((await getEventSummary(host, 'accordionChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

describe('focus', () => {
  it('should have focusable content when opened', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript, hasInput: true });
    const button = await getButton();
    const input = await getInput();
    const body = await getBody();

    expect(await hasFocus(body)).toBe(true);

    await button.click();
    await waitForStencilLifecycle(page);
    await page.keyboard.press('Tab');

    expect(await hasFocus(input)).toBe(true);
  });

  it('should not have focusable content when closed', async () => {
    const otherMarkup = '<a href="#">Some Link</a>';
    await initAccordion({ otherMarkup, hasInput: true });
    const host = await getHost();
    const body = await getBody();
    const link = await selectNode(page, 'a');

    expect(await hasFocus(body)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(host)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(link)).toBe(true);
  });

  it('should lose focus on content when closed', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript, hasInput: true, isOpen: true });
    const host = await getHost();
    const input = await getInput();
    const body = await getBody();

    await page.keyboard.press('Tab');

    expect(await hasFocus(host)).toBe(true);

    await page.keyboard.press('Tab');

    expect(await hasFocus(input)).toBe(true);

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);

    expect(await hasFocus(body)).toBe(true);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initAccordion();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-accordion'], 'componentDidLoad: p-accordion').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initAccordion();
    const host = await getHost();
    await setProperty(host, 'open', true);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-accordion'], 'componentDidUpdate: p-accordion').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree and aria properties', async () => {
    await initAccordion();
    const button = await getButton();

    await expectA11yToMatchSnapshot(page, button, { message: 'Of Button' });
    expect(await getAttribute(button, 'aria-controls')).toBe('accordion-panel');
  });

  it('should expose correct accessibility tree properties in open state', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript });
    const button = await getButton();
    const panel = await getCollapsible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Of Button' });
    await expectA11yToMatchSnapshot(page, panel, { message: 'Of Panel', interestingOnly: false });
  });
});
