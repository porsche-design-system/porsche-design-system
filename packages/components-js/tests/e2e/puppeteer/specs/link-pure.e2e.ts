import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getEventSummary,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-link-pure');
const getLink = () => selectNode(page, 'p-link-pure >>> a');
const getIcon = () => selectNode(page, 'p-link-pure >>> p-icon >>> svg');
const getSpan = () => selectNode(page, 'p-link-pure >>> span');

const initLinkPure = (opts?: { useSlottedAnchor?: boolean; withSubline?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false, withSubline = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `
    <p-link-pure onclick="return false;" ${!useSlottedAnchor ? 'href="#"' : ''}>
      ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
      Some label
      ${useSlottedAnchor ? '</a>' : ''}
      ${withSubline ? '<span slot="subline">Some Subline </span>' : ''}
    </p-link-pure>`
  );
};

it('should dispatch correct click events', async () => {
  await setContentWithDesignSystem(
    page,
    `<div><p-link-pure id="hostElement" href="about:blank#">Some label</p-link-pure></div>`
  );

  const wrapper = await selectNode(page, 'div');
  const host = await getHost();
  const link = await getLink();

  await addEventListener(wrapper, 'click');

  await link.click();
  await host.click();
  const { counter, targets } = await getEventSummary(wrapper, 'click');

  expect(counter).toBe(2);
  for (const target of targets) {
    expect(target.id).toBe('hostElement');
  }
});

it('should trigger focus & blur events at the correct time', async () => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-link-pure href="#" id="my-link-pure">Some label</p-link-pure>
      <a href="#" id="after">after</a>
    </div>`
  );
  const link = await getHost();
  const before = await selectNode(page, '#before');
  const after = await selectNode(page, '#after');

  await addEventListener(before, 'focus');
  await addEventListener(link, 'focus');
  await addEventListener(link, 'focusin');
  await addEventListener(link, 'blur');
  await addEventListener(link, 'focusout');
  await addEventListener(after, 'focus');

  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls initially').toBe(0);
  expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls initially').toBe(0);
  expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls initially').toBe(0);
  expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls initially').toBe(0);
  expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls initially').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls initially').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab').toBe(1);
  expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 1st tab').toBe(0);
  expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 1st tab').toBe(0);
  expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 1st tab').toBe(0);
  expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 1st tab').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 2nd tab').toBe(0);
  expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 2nd tab').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-link-pure');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 3rd tab').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId  after 3rd tab').toBe('after');

  // tab back
  await page.keyboard.down('ShiftLeft');
  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 1st tab back').toBe(2);
  expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 1st tab back').toBe(2);
  expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab back').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-link-pure');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab back').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

  await page.keyboard.up('ShiftLeft');
});

it('should provide functionality to focus & blur the custom element', async () => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-link-pure href="#">Some label</p-link-pure>
    </div>`
  );

  const linkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-link-pure'));

  const link = await getHost();
  const before = await selectNode(page, '#before');
  await before.focus();

  expect(await linkHasFocus()).toBe(false);
  await link.focus();
  expect(await linkHasFocus()).toBe(true);
  await page.evaluate(() => {
    const linkElement: HTMLElement = document.querySelector('p-link-pure');
    linkElement.blur();
  });
  expect(await linkHasFocus()).toBe(false);
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initLinkPure();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initLinkPure();
    const host = await getHost();

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-link-pure'], 'componentDidUpdate: p-link-pure').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkPure();
    const link = await getLink();
    const icon = await getIcon();

    await expectA11yToMatchSnapshot(page, link);
    await expectA11yToMatchSnapshot(page, icon, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if label is hidden', async () => {
    await initLinkPure();
    const host = await getHost();
    const link = await getLink();
    await setProperty(host, 'hide-label', 'true');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, link);
  });

  it('should expose correct accessibility tree description if subline property is set', async () => {
    await initLinkPure({ withSubline: true });
    const link = await getLink();

    await expectA11yToMatchSnapshot(page, link);
  });

  it('should not expose accessibility tree description with slotted anchor and subline', async () => {
    await initLinkPure({ useSlottedAnchor: true, withSubline: true });
    const span = await getSpan();

    const snapshot = await page.accessibility.snapshot({
      root: span,
    });

    expect(snapshot).toBeNull();
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initLinkPure();
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, link);
  });
});
