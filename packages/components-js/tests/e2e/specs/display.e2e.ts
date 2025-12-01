import {
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import type { BreakpointCustomizable, DisplaySize, DisplayTag } from '@porsche-design-system/components';

const initDisplay = (
  page: Page,
  opts?: {
    size?: BreakpointCustomizable<DisplaySize>;
    slot?: string;
    tag?: DisplayTag;
  }
): Promise<void> => {
  const { size, slot, tag } = opts;

  const attrs = [
    size ? `size="${typeof size === 'object' ? JSON.stringify(size).replace(/"/g, "'") : size}"` : '',
    tag ? `tag="${tag}"` : '',
  ].join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-display ${attrs}>
      ${slot ? slot : 'Some Heading'}
    </p-display>`
  );
};

const getHost = (page: Page) => page.locator('p-display');

const getDisplayTagName = async (page: Page): Promise<string> =>
  getHost(page).evaluate((el) => el.shadowRoot.querySelector('.root').tagName);

test.describe('tag', () => {
  test('should render according to size', async ({ page }) => {
    await initDisplay(page, { size: 'large' });
    expect(await getDisplayTagName(page), 'for size="large"').toBe('H1');

    await initDisplay(page, { size: 'medium' });
    expect(await getDisplayTagName(page), 'for size="medium"').toBe('H2');
  });

  test('should render according to tag h6 when tag is set', async ({ page }) => {
    await initDisplay(page, { size: 'large', tag: 'h6' });
    expect(await getDisplayTagName(page)).toBe('H6');
  });

  test('should render according to tag h6 when tag is set and if size is a size object', async ({ page }) => {
    await initDisplay(page, { size: { base: 'large' }, tag: 'h6' });
    expect(await getDisplayTagName(page)).toBe('H6');
  });

  test('should render as default if size is a size object without tag', async ({ page }) => {
    await initDisplay(page, { size: { base: 'large' } });
    expect(await getDisplayTagName(page)).toBe('H1');
  });

  test('should render as div due to slotted heading content', async ({ page }) => {
    await initDisplay(page, { slot: '<h3>Some Heading</h3>' });
    expect(await getDisplayTagName(page)).toBe('DIV');
  });

  test('should render as width default display tag if slotted content is not a heading', async ({ page }) => {
    await initDisplay(page, { slot: '<div>Some Heading</div>' });
    expect(await getDisplayTagName(page)).toBe('H1');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initDisplay(page, { size: 'xx-large' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-display'], 'componentDidLoad: p-display').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips with custom breakpoints', async ({ page }) => {
    await initDisplay(page, { size: { base: 'medium', l: 'large' } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-display'], 'componentDidLoad: p-display').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after prop change', async ({ page }) => {
    await initDisplay(page, { size: 'large' });
    const host = getHost(page);

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-display'], 'componentDidUpdate: p-display').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after state change with custom breakpoints', async ({ page }) => {
    await initDisplay(page, { size: { base: 'medium', l: 'large' } });
    const host = getHost(page);

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-display'], 'componentDidUpdate: p-display').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

});
