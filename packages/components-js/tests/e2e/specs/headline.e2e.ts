import { getBrowser, setContentWithDesignSystem } from '../helpers';
import { Page } from 'puppeteer';
import { HeadlineVariant, TextSize } from '@porsche-design-system/components/src/types';
import { BreakpointCustomizable } from '@porsche-design-system/components/src/utils';

fdescribe('headline', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const initHeadline = (opts?: {
    variant?: HeadlineVariant;
    size?: BreakpointCustomizable<TextSize>;
    slot?: string;
    tag?: string;
  }): Promise<void> => {
    const { variant, size, slot, tag } = opts;
    return setContentWithDesignSystem(
      page,
      `
        <p-headline variant=${variant} size=${size} tag=${tag}>
          ${slot ? slot : 'Some Headline'}
        </p-headline>`
    );
  };

  const getHeadlineTagName = async () =>
    await page.$eval('p-headline', (el) => el.shadowRoot.querySelector('.p-headline').tagName);

  describe('tag', () => {
    it('should render according to variant', async () => {
      await initHeadline({ variant: 'large-title' });
      expect(await getHeadlineTagName()).toBe('H2');
    });

    it('should render according to tag', async () => {
      await initHeadline({ variant: 'large-title', tag: 'h6' });
      expect(await getHeadlineTagName()).toBe('H6');
    });

    it('should render as default if size is set', async () => {
      await initHeadline({ size: 'x-large' });
      expect(await getHeadlineTagName()).toBe('H2');
    });

    it('should render according to tag if size is set', async () => {
      await initHeadline({ size: 'x-large', tag: 'h6' });
      expect(await getHeadlineTagName()).toBe('H6');
    });

    it('should render as div due to slotted content', async () => {
      await initHeadline({ slot: '<h3>Some Headline</h3>' });
      expect(await getHeadlineTagName()).toBe('DIV');
    });

    it('should render as default headline if slotted content is not a headline', async () => {
      await initHeadline({ slot: '<div>Some Headline</div>' });
      expect(await getHeadlineTagName()).toBe('H2');
    });
  });
});
