import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

type InitOpts = {
  withLabel?: boolean;
};

const initTagDismissible = (page: Page, props?: InitOpts) => {
  const { withLabel = false } = props || {};
  const attributes = withLabel ? ' label="Some label"' : '';

  const content = `<p-tag-dismissible${attributes}>Some Tag</p-tag-dismissible>`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.$('p-tag-dismissible');

test.describe('focus', () => {
  test('should provide functionality to focus & blur the custom element', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <a href="#" id="before">before</a>
      <p-tag-dismissible>Some Tag</p-tag-dismissible>`
    );

    const host = await getHost(page);
    const hostHasFocus = () => host.evaluate((el) => document.activeElement === el);

    const before = await page.$('#before');
    await before.focus();
    expect(await hostHasFocus()).toBe(false);
    await host.focus();
    expect(await hostHasFocus()).toBe(true);
    await host.evaluate((el: HTMLElement) => el.blur());
    expect(await hostHasFocus()).toBe(false);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTagDismissible(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);
    expect(status.componentDidLoad['p-tag-dismissible'], 'componentDidLoad: p-tag-dismissible').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initTagDismissible(page, { withLabel: true });
    const host = await getHost(page);

    await setProperty(host, 'label', 'Another label');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-tag-dismissible'], 'componentDidUpdate: p-tag-dismissible').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
