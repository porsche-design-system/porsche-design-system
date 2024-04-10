import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  reattachElementHandle,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { InlineNotificationState, InlineNotificationHeadingTag } from '@porsche-design-system/components';

const initInlineNotification = (
  page: Page,
  opts?: {
    state?: InlineNotificationState;
    persistent?: boolean;
    dismissButton?: boolean;
    actionLabel?: string;
    headingTag?: InlineNotificationHeadingTag;
  }
): Promise<void> => {
  const { state, persistent, dismissButton = true, actionLabel, headingTag } = opts || {};
  const attributes = [
    'heading="Some inline-notification heading."',
    'description="Some inline-notification description."',
    state && `state="${state}"`,
    persistent && 'persistent',
    `dismiss-button="${dismissButton}"`,
    actionLabel && `action-label="${actionLabel}"`,
    headingTag && `heading-tag="${headingTag}"`,
  ]
    .filter((x) => x)
    .join(' ');

  // <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
  return setContentWithDesignSystem(
    page,
    `
    <p-inline-notification ${attributes}>
    </p-inline-notification>`
  );
};

const getHost = (page: Page) => page.$('p-inline-notification');
const getCloseButton = (page: Page) => page.$('p-inline-notification p-button-pure.close');
const getActionButton = (page: Page) => page.$('p-inline-notification p-button-pure.action');
const getHeadingTagName = async (page: Page): Promise<string> =>
  (await getHost(page)).evaluate((el) => el.shadowRoot.querySelector('.heading').tagName);

test('should render close button with type of "button"', async ({ page }) => {
  await initInlineNotification(page);
  const closeBtnReal = await page.$('p-inline-notification p-button-pure button');
  expect(await getAttribute(closeBtnReal, 'type')).toBe('button');
});

test('should render without button when persistent prop true', async ({ page }) => {
  await initInlineNotification(page, { persistent: true });
  const el = await getCloseButton(page);
  expect(el).toBeNull();
});

test('should render without button when dismissButton prop false', async ({ page }) => {
  await initInlineNotification(page, { dismissButton: false });
  console.log(await getProperty(await getHost(page), 'dismissButton'));
  const el = await getCloseButton(page);
  expect(el).toBeNull();
});

test('should render correct heading tag when heading-tag property is set', async ({ page }) => {
  await initInlineNotification(page);
  expect(await getHeadingTagName(page)).toBe('H5');

  const host = await getHost(page);
  await setProperty(host, 'headingTag', 'h2');
  await waitForStencilLifecycle(page);

  expect(await getHeadingTagName(page)).toBe('H2');
});

test.describe('close button', () => {
  test('should emit custom event by click on close button', async ({ page }) => {
    await initInlineNotification(page);

    const host = await getHost(page);
    const closeButton = await getCloseButton(page);
    await addEventListener(host, 'dismiss');

    await closeButton.click();
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should remove and re-attach event', async ({ page }) => {
    await initInlineNotification(page);

    const host = await getHost(page);
    const closeButton = await getCloseButton(page);
    await addEventListener(host, 'dismiss');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElementHandle(host);

    await closeButton.click();
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });
});

test.describe('action button', () => {
  test('should emit custom event by click on action button', async ({ page }) => {
    await initInlineNotification(page, { actionLabel: 'Retry' });

    const host = await getHost(page);
    const actionButton = await getActionButton(page);
    await addEventListener(host, 'action');

    await actionButton.click();
    expect((await getEventSummary(host, 'action')).counter).toBe(1);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInlineNotification(page, { state: 'error' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-inline-notification'], 'componentDidLoad: p-inline-notification').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // one included in button-pure
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInlineNotification(page, { state: 'error' });
    const host = await getHost(page);

    await setProperty(host, 'state', 'warning');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-inline-notification'], 'componentDidUpdate: p-inline-notification').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});
