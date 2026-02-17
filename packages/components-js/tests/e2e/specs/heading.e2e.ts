import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { BreakpointCustomizable, HeadingSize, HeadingTag } from '@porsche-design-system/components';

const initHeading = (
  page: Page,
  opts?: {
    size?: BreakpointCustomizable<HeadingSize>;
    slot?: string;
    tag?: HeadingTag;
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
    <p-heading ${attrs}>
      ${slot ? slot : 'Some Heading'}
    </p-heading>`
  );
};

const getHost = (page: Page) => page.locator('p-heading');

const getHeadingTagName = async (page: Page): Promise<string> =>
  getHost(page).evaluate((el) => el.shadowRoot.querySelector('.root').tagName);

test.describe('tag', () => {
  test('should render according to size', async ({ page }) => {
    await initHeading(page, { size: 'xx-large' });
    expect(await getHeadingTagName(page), 'for size="xx-large"').toBe('H2');

    await initHeading(page, { size: 'x-large' });
    expect(await getHeadingTagName(page), 'for size="x-large"').toBe('H3');

    await initHeading(page, { size: 'large' });
    expect(await getHeadingTagName(page), 'for size="large"').toBe('H4');

    await initHeading(page, { size: 'medium' });
    expect(await getHeadingTagName(page), 'for size="medium"').toBe('H5');

    await initHeading(page, { size: 'small' });
    expect(await getHeadingTagName(page), 'for size="small"').toBe('H6');
  });

  test('should render according to tag h6 when size is set', async ({ page }) => {
    await initHeading(page, { size: 'large-title', tag: 'h6' });
    expect(await getHeadingTagName(page)).toBe('H6');
  });

  test('should render as default if size is a size object without tag', async ({ page }) => {
    await initHeading(page, { size: { base: 'large' } });
    expect(await getHeadingTagName(page)).toBe('H2');
  });

  test('should render according to tag h6 if size is set', async ({ page }) => {
    await initHeading(page, { size: { base: 'large' }, tag: 'h6' });
    expect(await getHeadingTagName(page)).toBe('H6');
  });

  test('should render as div due to slotted heading content', async ({ page }) => {
    await initHeading(page, { slot: '<h3>Some Heading</h3>' });
    expect(await getHeadingTagName(page)).toBe('DIV');
  });

  test('should render as default heading if slotted content is not a heading', async ({ page }) => {
    await initHeading(page, { slot: '<div>Some Heading</div>' });
    expect(await getHeadingTagName(page)).toBe('H2');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initHeading(page, { size: 'xx-large' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-heading'], 'componentDidLoad: p-heading').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips with custom breakpoints', async ({ page }) => {
    await initHeading(page, { size: { base: 'small', l: 'large' } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-heading'], 'componentDidLoad: p-heading').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after prop change', async ({ page }) => {
    await initHeading(page, { size: 'xx-large' });
    const host = getHost(page);

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after state change with custom breakpoints', async ({ page }) => {
    await initHeading(page, { size: { base: 'small', l: 'large' } });
    const host = getHost(page);

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
