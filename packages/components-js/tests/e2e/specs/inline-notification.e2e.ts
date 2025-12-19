import { expect, test } from '@playwright/test';
import type { InlineNotificationState } from '@porsche-design-system/components';
import type { Page } from 'playwright';
import {
  addEventListener,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  reattachElement,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

const initInlineNotification = (
  page: Page,
  opts?: {
    state?: InlineNotificationState;
    persistent?: boolean;
    dismissButton?: boolean;
    actionLabel?: string;
  }
): Promise<void> => {
  const { state, persistent, dismissButton = true, actionLabel } = opts || {};
  const attributes = [
    'heading="Some inline-notification heading."',
    'description="Some inline-notification description."',
    state && `state="${state}"`,
    persistent && 'persistent',
    `dismiss-button="${dismissButton}"`,
    actionLabel && `action-label="${actionLabel}"`,
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

const getHost = (page: Page) => page.locator('p-inline-notification');
const getCloseButton = (page: Page) => page.locator('p-inline-notification .close');
const getActionButton = (page: Page) => page.locator('p-inline-notification .action');

test('should render close button with type of "button"', async ({ page }) => {
  await initInlineNotification(page);
  const closeBtnReal = page.locator('p-inline-notification .close button');
  expect(await getAttribute(closeBtnReal, 'type')).toBe('button');
});

test('should render without button when dismissButton prop false', async ({ page }) => {
  await initInlineNotification(page, { dismissButton: false });
  console.log(await getProperty(getHost(page), 'dismissButton'));
  const el = getCloseButton(page);
  await expect(el).toHaveCount(0);
});

test.describe('close button', () => {
  test('should emit custom event by click on close button', async ({ page }) => {
    await initInlineNotification(page);

    const host = getHost(page);
    const closeButton = getCloseButton(page);
    await addEventListener(host, 'dismiss');

    await closeButton.click();
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should remove and re-attach event', async ({ page }) => {
    await initInlineNotification(page);

    const host = getHost(page);
    const closeButton = getCloseButton(page);
    await addEventListener(host, 'dismiss');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(host);

    await closeButton.click();
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });
});

test.describe('action button', () => {
  test('should emit custom event by click on action button', async ({ page }) => {
    await initInlineNotification(page, { actionLabel: 'Retry' });

    const host = getHost(page);
    const actionButton = getActionButton(page);
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
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // one included in button
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInlineNotification(page, { state: 'error' });
    const host = getHost(page);

    await setProperty(host, 'state', 'warning');
    await waitForStencilLifecycle(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-inline-notification'];
        },
        {
          message: 'componentDidUpdate: p-inline-notification',
        }
      )
      .toBe(1);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-icon'];
        },
        {
          message: 'componentDidUpdate: p-icon',
        }
      )
      .toBe(1);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad.all;
        },
        {
          message: 'componentDidLoad: all',
        }
      )
      .toBe(4);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate.all;
        },
        {
          message: 'componentDidUpdate: all',
        }
      )
      .toBe(2);
  });
});
