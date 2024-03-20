import type { ElementHandle, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import {
  buildDefaultComponentMarkup,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

const tagNamesWithLoadingProp: TagName[] = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).propsMeta?.loading);

for (const tagName of tagNamesWithLoadingProp) {
  test.describe(tagName, () => {
    const getLoadingStatus = async (page: Page): Promise<ElementHandle> => {
      const [nestedComponentWithLoadingProp] = tagNamesWithLoadingProp.filter((tagNameWithLoadingProp) =>
        getComponentMeta(tagName).nestedComponents?.includes(tagNameWithLoadingProp)
      );

      return await page.$(
        nestedComponentWithLoadingProp
          ? `${tagName} ${nestedComponentWithLoadingProp} .loading` // e.g. for p-button-tile
          : `${tagName} .loading`
      );
    };

    const getLoadingMessage = async (page: Page): Promise<string> => {
      return (await getLoadingStatus(page)).evaluate((el) => el.textContent);
    };

    test.describe('for loading="true"', () => {
      const markup = buildDefaultComponentMarkup(tagName).replace(/>/, ' loading="true">'); // add loading attribute

      test('should render loading message initially', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        expect(await getLoadingMessage(page)).toBe('Loading');
      });

      test('should render loading finished message when loading is set to false', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        const host = await page.$(tagName);
        await setProperty(host, 'loading', false);
        await waitForStencilLifecycle(page);

        expect(await getLoadingMessage(page)).toBe('Loading finished');
      });
    });

    test.describe('for loading="false"', () => {
      const markup = buildDefaultComponentMarkup(tagName);

      test('should render no loading message initially', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        expect(await getLoadingMessage(page)).toBe('');
      });

      test('should render loading message when loading is set to true', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        const host = await page.$(tagName);
        await setProperty(host, 'loading', true);
        await waitForStencilLifecycle(page);

        expect(await getLoadingMessage(page)).toBe('Loading');
      });

      test('should render loading finished message when loading is set to true, then to false', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        const host = await page.$(tagName);
        await setProperty(host, 'loading', true);
        await waitForStencilLifecycle(page);

        await setProperty(host, 'loading', false);
        await waitForStencilLifecycle(page);

        expect(await getLoadingMessage(page)).toBe('Loading finished');
      });
    });
  });
}
