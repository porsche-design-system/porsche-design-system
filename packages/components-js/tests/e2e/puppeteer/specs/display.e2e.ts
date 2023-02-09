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
  DisplayTag,
  DisplaySize,
  BreakpointCustomizable,
} from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initDisplay = (opts?: {
  size?: BreakpointCustomizable<DisplaySize>;
  slot?: string;
  tag?: DisplayTag;
}): Promise<void> => {
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

const getHost = () => selectNode(page, 'p-display');

const getDisplayTagName = async (): Promise<string> =>
  (await getHost()).evaluate((el) => el.shadowRoot.querySelector('.root').tagName);

describe('tag', () => {
  it('should render according to size', async () => {
    await initDisplay({ size: 'large' });
    expect(await getDisplayTagName(), 'for size="large"').toBe('H1');

    await initDisplay({ size: 'medium' });
    expect(await getDisplayTagName(), 'for size="medium"').toBe('H2');
  });

  it('should render according to tag h6 when tag is set', async () => {
    await initDisplay({ size: 'large', tag: 'h6' });
    expect(await getDisplayTagName()).toBe('H6');
  });

  it('should render according to tag h6 when tag is set', async () => {
    await initDisplay({ size: { base: 'large' }, tag: 'h6' });
    expect(await getDisplayTagName()).toBe('H6');
  });

  it('should render as default if size is a size object without tag', async () => {
    await initDisplay({ size: { base: 'large' } });
    expect(await getDisplayTagName()).toBe('H1');
  });

  it('should render as div due to slotted heading content', async () => {
    await initDisplay({ slot: '<h3>Some Heading</h3>' });
    expect(await getDisplayTagName()).toBe('DIV');
  });

  it('should render as width default display tag if slotted content is not a heading', async () => {
    await initDisplay({ slot: '<div>Some Heading</div>' });
    expect(await getDisplayTagName()).toBe('H1');
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initDisplay({ size: 'xx-large' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-display'], 'componentDidLoad: p-display').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips with custom breakpoints', async () => {
    await initDisplay({ size: { base: 'medium', l: 'large' } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-display'], 'componentDidLoad: p-display').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after prop change', async () => {
    await initDisplay({ size: 'large' });
    const host = await getHost();

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-display'], 'componentDidUpdate: p-display').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should work without unnecessary round trips after state change with custom breakpoints', async () => {
    await initDisplay({ size: { base: 'medium', l: 'large' } });
    const host = await getHost();

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-display'], 'componentDidUpdate: p-display').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should have a theme prop defined at any time without any unnecessary round trips', async () => {
    await initDisplay({ size: 'large-title' });
    const host = await getHost();

    expect(await getProperty(host, 'theme')).toBe('light');

    await setProperty(host, 'theme', 'dark');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);
    expect(status.componentDidUpdate['p-display'], 'componentDidUpdate: p-display').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(await getProperty(host, 'theme')).toBe('dark');

    await setProperty(host, 'theme', 'light');
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-display'], 'componentDidUpdate: p-display').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    expect(await getProperty(host, 'theme')).toBe('light');
  });
});
