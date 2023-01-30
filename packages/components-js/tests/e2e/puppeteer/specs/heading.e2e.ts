import {
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import type { HeadingTag, HeadingVariant } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initHeading = (opts?: { variant?: HeadingVariant; slot?: string; tag?: HeadingTag }): Promise<void> => {
  const { variant, slot, tag } = opts;

  const attrs = [
    variant ? `variant="${typeof variant === 'object' ? JSON.stringify(variant).replace(/"/g, "'") : variant}"` : '',
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

const getHost = () => selectNode(page, 'p-heading');

const getHeadingTagName = (): Promise<string> =>
  page.$eval('p-heading', (el) => el.shadowRoot.querySelector('.root').tagName);

describe('tag', () => {
  it('should render according to variant', async () => {
    await initHeading({ variant: 'large-title' });
    expect(await getHeadingTagName(), 'for variant="large-title"').toBe('H1');

    await initHeading({ variant: 'heading-1' });
    expect(await getHeadingTagName(), 'for variant="heading-1"').toBe('H1');

    await initHeading({ variant: 'heading-2' });
    expect(await getHeadingTagName(), 'for variant="heading-2"').toBe('H2');

    await initHeading({ variant: 'heading-3' });
    expect(await getHeadingTagName(), 'for variant="heading-3"').toBe('H3');

    await initHeading({ variant: 'heading-4' });
    expect(await getHeadingTagName(), 'for variant="heading-4"').toBe('H4');

    await initHeading({ variant: 'heading-5' });
    expect(await getHeadingTagName(), 'for variant="heading-5"').toBe('H5');
  });

  it('should render according to tag h6 when variant is set', async () => {
    await initHeading({ variant: 'large-title', tag: 'h6' });
    expect(await getHeadingTagName()).toBe('H6');
  });

  it('should render as default if variant is a size object without tag', async () => {
    await initHeading({ variant: { base: 'large' } });
    expect(await getHeadingTagName()).toBe('H1');
  });

  it('should render according to tag h6 if size is set', async () => {
    await initHeading({ variant: { base: 'large' }, tag: 'h6' });
    expect(await getHeadingTagName()).toBe('H6');
  });

  it('should render as div due to slotted heading content', async () => {
    await initHeading({ slot: '<h3>Some Heading</h3>' });
    expect(await getHeadingTagName()).toBe('DIV');
  });

  it('should render as default heading if slotted content is not a heading', async () => {
    await initHeading({ slot: '<div>Some Heading</div>' });
    expect(await getHeadingTagName()).toBe('H1');
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initHeading({ variant: 'heading-1' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-heading'], 'componentDidLoad: p-heading').toBe(1);
    expect(status.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips with custom breakpoints', async () => {
    await initHeading({ variant: { base: 'small', l: 'large' } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-heading'], 'componentDidLoad: p-heading').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after state change', async () => {
    await initHeading({ variant: 'heading-1' });
    const host = await getHost();

    await setProperty(host, 'variant', 'heading-4');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should work without unnecessary round trips after state change with custom breakpoints', async () => {
    await initHeading({ variant: { base: 'small', l: 'large' } });
    const host = await getHost();

    await setProperty(host, 'variant', 'heading-4');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should have a theme prop defined at any time without any unnecessary round trips', async () => {
    await initHeading({ variant: 'large-title' });
    const host = await getHost();

    expect(await getProperty(host, 'theme')).toBe('light');

    await setProperty(host, 'theme', 'dark');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);
    expect(status.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(await getProperty(host, 'theme')).toBe('dark');

    await setProperty(host, 'theme', 'light');
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    expect(await getProperty(host, 'theme')).toBe('light');
  });
});
