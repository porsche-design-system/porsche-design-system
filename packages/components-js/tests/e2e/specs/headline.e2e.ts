import { getBrowser, setContentWithDesignSystem } from '../helpers';
import { Page } from 'puppeteer';
import { BreakpointCustomizable, TextSize, VariantType } from '@porsche-design-system/components/dist/types/bundle';

describe('headline', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const initHeadline = (opts?: {
    variant?: VariantType;
    size?: BreakpointCustomizable<TextSize>;
    slot?: string;
    tag?: string;
  }): Promise<void> => {
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

  const getHeadlineTagName = async () =>
    await page.$eval('p-headline', (el) => el.shadowRoot.querySelector('.p-headline').tagName);

  describe('tag', () => {
    it('should render according to variant', async () => {
      await initHeadline({ variant: 'large-title' });
      expect(await getHeadlineTagName()).toBe('H1', 'for variant="large-title"');

      await initHeadline({ variant: 'headline-1' });
      expect(await getHeadlineTagName()).toBe('H1', 'for variant="headline-1"');

      await initHeadline({ variant: 'headline-2' });
      expect(await getHeadlineTagName()).toBe('H2', 'for variant="headline-2"');

      await initHeadline({ variant: 'headline-3' });
      expect(await getHeadlineTagName()).toBe('H3', 'for variant="headline-3"');

      await initHeadline({ variant: 'headline-4' });
      expect(await getHeadlineTagName()).toBe('H4', 'for variant="headline-4"');

      await initHeadline({ variant: 'headline-5' });
      expect(await getHeadlineTagName()).toBe('H5', 'for variant="headline-5"');
    });

    it('should render according to tag h6 when variant is set', async () => {
      await initHeadline({ variant: 'large-title', tag: 'h6' });
      expect(await getHeadlineTagName()).toBe('H6');
    });

    it('should render as default if variant is a size object without tag', async () => {
      await initHeadline({ variant: 'x-large' });
      expect(await getHeadlineTagName()).toBe('H1');
    });

    it('should render according to tag h6 if size is set', async () => {
      await initHeadline({ variant: 'x-large', tag: 'h6' });
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
});
