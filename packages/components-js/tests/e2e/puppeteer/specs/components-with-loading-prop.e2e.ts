import type { ElementHandle, Page } from 'puppeteer';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import {
  buildDefaultComponentMarkup,
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const tagNamesWithLoadingProp: TagName[] = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).propsMeta?.loading);

describe.each<TagName>(tagNamesWithLoadingProp)('%s', (tagName) => {
  const getLoadingStatus = async (): Promise<ElementHandle> => {
    const [nestedComponentWithLoadingProp] = tagNamesWithLoadingProp.filter(
      (tagNameWithLoadingProp) => getComponentMeta(tagName).nestedComponents?.includes(tagNameWithLoadingProp)
    );

    return await selectNode(
      page,
      nestedComponentWithLoadingProp
        ? `${tagName} >>> ${nestedComponentWithLoadingProp} >>> .loading` // e.g. for p-button-tile
        : `${tagName} >>> .loading`
    );
  };

  const getLoadingMessage = async (): Promise<string> => {
    return (await getLoadingStatus()).evaluate((el) => el.textContent);
  };

  describe('for loading="true"', () => {
    const markup = buildDefaultComponentMarkup(tagName).replace(/>/, ' loading="true">'); // add loading attribute

    it('should render loading message initially', async () => {
      await setContentWithDesignSystem(page, markup);

      expect(await getLoadingMessage()).toBe('Loading');
    });

    it('should render loading finished message when loading is set to false', async () => {
      await setContentWithDesignSystem(page, markup);

      const host = await selectNode(page, tagName);
      await setProperty(host, 'loading', false);
      await waitForStencilLifecycle(page);

      expect(await getLoadingMessage()).toBe('Loading finished');
    });
  });

  describe('for loading="false"', () => {
    const markup = buildDefaultComponentMarkup(tagName);

    it('should render no loading message initially', async () => {
      await setContentWithDesignSystem(page, markup);

      expect(await getLoadingMessage()).toBe('');
    });

    it('should render loading message when loading is set to true', async () => {
      await setContentWithDesignSystem(page, markup);

      const host = await selectNode(page, tagName);
      await setProperty(host, 'loading', true);
      await waitForStencilLifecycle(page);

      expect(await getLoadingMessage()).toBe('Loading');
    });

    it('should render loading finished message when loading is set to true, then to false', async () => {
      await setContentWithDesignSystem(page, markup);

      const host = await selectNode(page, tagName);
      await setProperty(host, 'loading', true);
      await waitForStencilLifecycle(page);

      await setProperty(host, 'loading', false);
      await waitForStencilLifecycle(page);

      expect(await getLoadingMessage()).toBe('Loading finished');
    });
  });

  describe('accessibility', () => {
    const markup = buildDefaultComponentMarkup(tagName);

    it('should expose correct initial accessibility tree properties', async () => {
      await setContentWithDesignSystem(page, markup);
      const status = await getLoadingStatus();

      await expectA11yToMatchSnapshot(page, status, { interestingOnly: false });
    });
  });
});
