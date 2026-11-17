import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import {
  addEventListener,
  expectToSkipFocusOnComponent,
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
const getCollapsibleHeight = async (page: Page): Promise<number | undefined> => {
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

test('should not cause scrollbar on outer scroll container when closed with position:absolute slotted content', async ({
  page,
}) => {
  await initAccordion(page, {
    otherPreMarkup: `<div id="scroll-container" style="height: 400px; overflow-y: scroll;"><div style="position: relative">`,
    otherPostMarkup: '</div></div>',
    otherSlottedMarkup: `<div style="height: 2000px; background-color: red;">CONTENT</div>
<div style="position: absolute; width: 1px; height: 1px;"></div>`,
  });
  await waitForStencilLifecycle(page);

  expect(await getCollapsibleHeight(page)).toBe(0);
  await expect(getCollapsible(page)).toBeHidden();

  const hasVerticalScrollbar = await page.locator('#scroll-container').evaluate((el) => {
    return el.scrollHeight > el.clientHeight;
  });

  expect(hasVerticalScrollbar).toBe(false);
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

test.describe('programmatic focus', () => {
  test('should set programmatic focus', async ({ page }) => {
    await initAccordion(page);
    const host = getHost(page);

    await expect(getSummary(page)).not.toBeFocused();

    // called in the page, since Playwright's locator.focus() and locator.blur() run in an isolated world and bypass the component
    await host.evaluate((el: HTMLElement) => el.focus());
    await expect(getSummary(page)).toBeFocused();

    await host.evaluate((el: HTMLElement) => el.blur());
    await expect(getSummary(page)).not.toBeFocused();
  });

  test('should be removed from tab order including its content by tabindex="-1" on host', async ({ page }) => {
    await initAccordion(page, {
      isOpen: true,
      hasInput: true,
      otherPreMarkup: '<input type="text" id="before" />',
      otherPostMarkup: '<input type="text" id="after" />',
    });
    const host = getHost(page);
    await host.evaluate((el) => el.setAttribute('tabindex', '-1'));

    await expectToSkipFocusOnComponent(page, host, page.locator('#before'));

    await host.evaluate((el: HTMLElement) => el.focus());
    await expect(getSummary(page)).toBeFocused();
  });
});

test.describe('click on content of a scrolled accordion', () => {
  const getScrollY = (page: Page): Promise<number> => page.evaluate(() => window.scrollY);

  // content is taller than the viewport, so the summary is scrolled out of view once the end of the content is visible
  const otherSlottedMarkup = `<div style="height: 200vh"></div>
<p>Some static text</p>
<button type="button">Some button</button>`;

  test('should keep scroll position and not focus summary when static text is clicked', async ({ page }) => {
    await initAccordion(page, { isOpen: true, otherSlottedMarkup });
    const text = page.locator('p-accordion p');

    await text.scrollIntoViewIfNeeded();
    const scrollY = await getScrollY(page);
    expect(scrollY).toBeGreaterThan(0);

    await text.click();

    expect(await getScrollY(page)).toBe(scrollY);
    await expect(getSummary(page)).not.toBeFocused();
  });

  test('should keep scroll position and not focus summary when slotted button is clicked', async ({ page }) => {
    await initAccordion(page, { isOpen: true, otherSlottedMarkup });
    const button = page.locator('p-accordion button');

    await button.scrollIntoViewIfNeeded();
    const scrollY = await getScrollY(page);
    expect(scrollY).toBeGreaterThan(0);

    await button.click();

    expect(await getScrollY(page)).toBe(scrollY);
    await expect(getSummary(page)).not.toBeFocused();
  });

  test('should continue tab order from the clicked static text', async ({ page }) => {
    await initAccordion(page, {
      isOpen: true,
      hasInput: true, // first focusable element of the content, far above the clicked text
      otherSlottedMarkup: `<div style="height: 200vh"></div>
<p>Some static text</p>
<input type="text" id="last" />`,
    });
    const text = page.locator('p-accordion p');

    await text.scrollIntoViewIfNeeded();
    const scrollY = await getScrollY(page);
    expect(scrollY).toBeGreaterThan(0);

    await text.click();
    await page.keyboard.press('Tab');

    await expect(page.locator('#last')).toBeFocused();
    expect(await getScrollY(page)).toBe(scrollY);
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
