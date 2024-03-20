import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { HeadlineTag, HeadlineVariant } from '@porsche-design-system/components';

const initHeadline = (
  page: Page,
  opts?: {
    variant?: HeadlineVariant;
    slot?: string;
    tag?: HeadlineTag;
  }
): Promise<void> => {
  const { variant, slot, tag } = opts;

  const attrs = [
    variant ? `variant="${typeof variant === 'object' ? JSON.stringify(variant).replace(/"/g, "'") : variant}"` : '',
    tag ? `tag="${tag}"` : '',
  ].join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-headline ${attrs}>
      ${slot ? slot : 'Some Headline'}
    </p-headline>`
  );
};

const getHost = (page: Page) => page.$('p-headline');

const getHeadlineTagName = (page: Page): Promise<string> =>
  page.$eval('p-headline', (el) => el.shadowRoot.querySelector('.root').tagName);

test.describe('tag', () => {
  test('should render according to variant', async ({ page }) => {
    await initHeadline(page, { variant: 'large-title' });
    expect(await getHeadlineTagName(page), 'for variant="large-title"').toBe('H1');

    await initHeadline(page, { variant: 'headline-1' });
    expect(await getHeadlineTagName(page), 'for variant="headline-1"').toBe('H1');

    await initHeadline(page, { variant: 'headline-2' });
    expect(await getHeadlineTagName(page), 'for variant="headline-2"').toBe('H2');

    await initHeadline(page, { variant: 'headline-3' });
    expect(await getHeadlineTagName(page), 'for variant="headline-3"').toBe('H3');

    await initHeadline(page, { variant: 'headline-4' });
    expect(await getHeadlineTagName(page), 'for variant="headline-4"').toBe('H4');

    await initHeadline(page, { variant: 'headline-5' });
    expect(await getHeadlineTagName(page), 'for variant="headline-5"').toBe('H5');
  });

  test('should render according to tag h6 when variant is set', async ({ page }) => {
    await initHeadline(page, { variant: 'large-title', tag: 'h6' });
    expect(await getHeadlineTagName(page)).toBe('H6');
  });

  test('should render as default if variant is a size object without tag', async ({ page }) => {
    await initHeadline(page, { variant: { base: 'large' } });
    expect(await getHeadlineTagName(page)).toBe('H1');
  });

  test('should render according to tag h6 if size is set', async ({ page }) => {
    await initHeadline(page, { variant: { base: 'large' }, tag: 'h6' });
    expect(await getHeadlineTagName(page)).toBe('H6');
  });

  test('should render as div due to slotted headline content', async ({ page }) => {
    await initHeadline(page, { slot: '<h3>Some Headline</h3>' });
    expect(await getHeadlineTagName(page)).toBe('DIV');
  });

  test('should render as default headline if slotted content is not a headline', async ({ page }) => {
    await initHeadline(page, { slot: '<div>Some Headline</div>' });
    expect(await getHeadlineTagName(page)).toBe('H1');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initHeadline(page, { variant: 'headline-1' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);
    expect(status.componentDidUpdate['p-headline'], 'componentDidUpdate: p-headline').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips with custom breakpoints', async ({ page }) => {
    await initHeadline(page, { variant: { base: 'small', l: 'large' } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initHeadline(page, { variant: 'headline-1' });
    const host = await getHost(page);

    await setProperty(host, 'variant', 'headline-4');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-headline'], 'componentDidUpdate: p-headline').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after state change with custom breakpoints', async ({ page }) => {
    await initHeadline(page, { variant: { base: 'small', l: 'large' } });
    const host = await getHost(page);

    await setProperty(host, 'variant', 'headline-4');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-headline'], 'componentDidUpdate: p-headline').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should have a theme prop defined at any time without any unnecessary round trips', async ({ page }) => {
    await initHeadline(page, { variant: 'large-title' });
    const host = await getHost(page);

    expect(await getProperty(host, 'theme')).toBe('light');

    await setProperty(host, 'theme', 'dark');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);
    expect(status.componentDidUpdate['p-headline'], 'componentDidUpdate: p-headline').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(await getProperty(host, 'theme')).toBe('dark');

    await setProperty(host, 'theme', 'light');
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-headline'], 'componentDidUpdate: p-headline').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    expect(await getProperty(host, 'theme')).toBe('light');
  });
});
