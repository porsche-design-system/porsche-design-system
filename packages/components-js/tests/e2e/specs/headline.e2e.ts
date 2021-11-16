import {
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';
import { HeadlineTag, HeadlineVariant } from '@porsche-design-system/components/dist/types/bundle';

describe('headline', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const initHeadline = (opts?: { variant?: HeadlineVariant; slot?: string; tag?: HeadlineTag }): Promise<void> => {
    const { variant, slot, tag } = opts;

    const content = (variant ? `variant="${variant}" ` : '') + (tag ? `tag="${tag}"` : '');

    return setContentWithDesignSystem(
      page,
      `
        <p-headline ${content.trim()}>
          ${slot ? slot : 'Some Headline'}
        </p-headline>`
    );
  };

  const getHost = () => selectNode(page, 'p-headline');
  const getText = () => selectNode(page, 'p-headline >>> p-text');

  const getHeadlineTagName = async () =>
    await page.$eval('p-headline', (el) => el.shadowRoot.querySelector('.root').tagName);

  it('should forward props correctly to p-text', async () => {
    await initHeadline({ variant: 'inherit' });
    const host = await getHost();
    const text = await getText();

    expect(await getProperty(text, 'size')).toBe('inherit');
    expect(await getProperty(text, 'align')).toBe('left');
    expect(await getProperty(text, 'ellipsis')).toBe(false);

    await setProperty(host, 'align', 'center');
    await setProperty(host, 'ellipsis', true);
    await waitForStencilLifecycle(page);

    expect(await getProperty(text, 'align')).toBe('center');
    expect(await getProperty(text, 'ellipsis')).toBe(true);
  });

  describe('tag', () => {
    it('should render according to variant', async () => {
      await initHeadline({ variant: 'large-title' });
      expect(await getHeadlineTagName(), 'for variant="large-title"').toBe('H1');

      await initHeadline({ variant: 'headline-1' });
      expect(await getHeadlineTagName(), 'for variant="headline-1"').toBe('H1');

      await initHeadline({ variant: 'headline-2' });
      expect(await getHeadlineTagName(), 'for variant="headline-2"').toBe('H2');

      await initHeadline({ variant: 'headline-3' });
      expect(await getHeadlineTagName(), 'for variant="headline-3"').toBe('H3');

      await initHeadline({ variant: 'headline-4' });
      expect(await getHeadlineTagName(), 'for variant="headline-4"').toBe('H4');

      await initHeadline({ variant: 'headline-5' });
      expect(await getHeadlineTagName(), 'for variant="headline-5"').toBe('H5');
    });

    it('should render according to tag h6 when variant is set', async () => {
      await initHeadline({ variant: 'large-title', tag: 'h6' });
      expect(await getHeadlineTagName()).toBe('H6');
    });

    it('should render as default if variant is a size object without tag', async () => {
      await initHeadline({ variant: { base: 'large' } });
      expect(await getHeadlineTagName()).toBe('H1');
    });

    it('should render according to tag h6 if size is set', async () => {
      await initHeadline({ variant: { base: 'large' }, tag: 'h6' });
      expect(await getHeadlineTagName()).toBe('H6');
    });

    it('should render as div due to slotted headline content', async () => {
      await initHeadline({ slot: '<h3>Some Headline</h3>' });
      expect(await getHeadlineTagName()).toBe('DIV');
    });

    it('should render as default headline if slotted content is not a headline', async () => {
      await initHeadline({ slot: '<div>Some Headline</div>' });
      expect(await getHeadlineTagName()).toBe('H1');
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initHeadline({ variant: 'headline-1' });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);
      expect(status.componentDidUpdate['p-headline'], 'componentDidUpdate: p-headline').toBe(0);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips with custom breakpoints', async () => {
      await initHeadline({ variant: { base: 'small', l: 'large' } });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initHeadline({ variant: 'headline-1' });
      const host = await getHost();

      await setProperty(host, 'variant', 'headline-4');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-headline'], 'componentDidUpdate: p-headline').toBe(1);

      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });

    it('should work without unnecessary round trips after state change with custom breakpoints', async () => {
      await initHeadline({ variant: { base: 'small', l: 'large' } });
      const host = await getHost();

      await setProperty(host, 'variant', 'headline-4');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-headline'], 'componentDidUpdate: p-headline').toBe(1);

      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });
});
