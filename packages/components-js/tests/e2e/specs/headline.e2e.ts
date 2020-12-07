import {
  getBrowser, selectNode,
  setContentWithDesignSystem, waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';
import { HeadlineVariant, TextSize } from "@porsche-design-system/components/src/types";
import { BreakpointCustomizable } from "@porsche-design-system/components/src/utils";

describe('headline', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const initHeadline = async (opts?: { variant?: HeadlineVariant, size?: BreakpointCustomizable<TextSize>, slot?: string, tag?: string }) => {
    const { variant, size, slot, tag } = opts;
    const content = `
      <p-headline variant=${variant} size=${size} tag=${tag}>
        ${slot ? slot : 'Some Headline'}
      </p-headline>`
    await setContentWithDesignSystem(page, content);
  };

  const getHeadlineTagName = async () => {
    const host = await selectNode(page, 'p-headline');
    return await host.evaluate((el) => {
      return el.shadowRoot.querySelector('.p-headline').tagName;
    });
  };

  describe('tag', () => {
    fit('should render according to variant', async () => {
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
