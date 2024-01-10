import {
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import type {
  HeadingTag,
  HeadingSize,
  BreakpointCustomizable,
} from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initHeading = (opts?: {
  size?: BreakpointCustomizable<HeadingSize>;
  slot?: string;
  tag?: HeadingTag;
}): Promise<void> => {
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

const getHost = () => selectNode(page, 'p-heading');

const getHeadingTagName = async (): Promise<string> =>
  (await getHost()).evaluate((el) => el.shadowRoot.querySelector('.root').tagName);

describe('tag', () => {
  it('should render according to size', async () => {
    await initHeading({ size: 'xx-large' });
    expect(await getHeadingTagName(), 'for size="xx-large"').toBe('H2');

    await initHeading({ size: 'x-large' });
    expect(await getHeadingTagName(), 'for size="x-large"').toBe('H3');

    await initHeading({ size: 'large' });
    expect(await getHeadingTagName(), 'for size="large"').toBe('H4');

    await initHeading({ size: 'medium' });
    expect(await getHeadingTagName(), 'for size="medium"').toBe('H5');

    await initHeading({ size: 'small' });
    expect(await getHeadingTagName(), 'for size="small"').toBe('H6');
  });

  it('should render according to tag h6 when size is set', async () => {
    await initHeading({ size: 'large-title', tag: 'h6' });
    expect(await getHeadingTagName()).toBe('H6');
  });

  it('should render as default if size is a size object without tag', async () => {
    await initHeading({ size: { base: 'large' } });
    expect(await getHeadingTagName()).toBe('H2');
  });

  it('should render according to tag h6 if size is set', async () => {
    await initHeading({ size: { base: 'large' }, tag: 'h6' });
    expect(await getHeadingTagName()).toBe('H6');
  });

  it('should render as div due to slotted heading content', async () => {
    await initHeading({ slot: '<h3>Some Heading</h3>' });
    expect(await getHeadingTagName()).toBe('DIV');
  });

  it('should render as default heading if slotted content is not a heading', async () => {
    await initHeading({ slot: '<div>Some Heading</div>' });
    expect(await getHeadingTagName()).toBe('H2');
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initHeading({ size: 'xx-large' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-heading'], 'componentDidLoad: p-heading').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips with custom breakpoints', async () => {
    await initHeading({ size: { base: 'small', l: 'large' } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-heading'], 'componentDidLoad: p-heading').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after prop change', async () => {
    await initHeading({ size: 'xx-large' });
    const host = await getHost();

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should work without unnecessary round trips after state change with custom breakpoints', async () => {
    await initHeading({ size: { base: 'small', l: 'large' } });
    const host = await getHost();

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-heading'], 'componentDidUpdate: p-heading').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should have a theme prop defined at any time without any unnecessary round trips', async () => {
    await initHeading({ size: 'large-title' });
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
