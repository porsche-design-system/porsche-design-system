import { expect, type Locator, test } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import type { Page } from 'playwright';
import {
  buildDefaultComponentMarkup,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

const tagNamesWithLoadingProp: TagName[] = TAG_NAMES.filter((tagName) => {
  const meta = getComponentMeta(tagName);
  return meta.propsMeta?.loading;
});

for (const tagName of tagNamesWithLoadingProp) {
  test.describe(tagName, () => {
    const getLoadingStatus = async (page: Page): Promise<Locator> => {
      const [nestedComponentWithLoadingProp] = tagNamesWithLoadingProp.filter(
        (tagNameWithLoadingProp) =>
          getComponentMeta(tagName).nestedComponents?.includes(tagNameWithLoadingProp) &&
          ![
            'p-input-search',
            'p-input-number',
            'p-input-date',
            'p-input-month',
            'p-input-week',
            'p-input-time',
            'p-input-text',
            'p-input-email',
            'p-input-tel',
            'p-input-url',
            'p-input-password',
          ].includes(tagName)
      );

      return page.locator(
        nestedComponentWithLoadingProp
          ? `${tagName} ${nestedComponentWithLoadingProp} .loading` // e.g. for p-button-tile
          : `${tagName} .loading`
      );
    };

    const getLoadingMessage = async (page: Page): Promise<string> => {
      const locators = await page.locator(`${tagName} .loading`).all();

      // Some components (e.g. <p-input-date>) have multiple `.loading` elements.
      // Return only the first one with visible (non-empty) text.
      for (const locator of locators) {
        const text = await locator.textContent();
        if (text?.trim()) return text.trim();
      }
      return '';
    };

    test.describe('for loading="true"', () => {
      const markup = buildDefaultComponentMarkup(tagName).replace(`<${tagName}`, `<${tagName} loading="true"`); // add loading attribute

      test('should render loading message initially', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        await expect.poll(() => getLoadingMessage(page)).toBe('Loading');
      });

      test('should render loading finished message when loading is set to false', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        const host = page.locator(tagName);
        await setProperty(host, 'loading', false);
        await waitForStencilLifecycle(page);

        await expect.poll(() => getLoadingMessage(page)).toBe('Loading finished');
      });
    });

    test.describe('for loading="false"', () => {
      const markup = buildDefaultComponentMarkup(tagName);

      test('should render no loading message initially', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        await expect.poll(() => getLoadingMessage(page)).toBe('');
      });

      test('should render loading message when loading is set to true', async ({ page }) => {
        await setContentWithDesignSystem(page, markup);

        const host = page.locator(tagName);
        await setProperty(host, 'loading', true);
        await waitForStencilLifecycle(page);

        await expect.poll(() => getLoadingMessage(page)).toBe('Loading');
      });

      test('should render loading finished message when loading is set to true, then to false', async ({
        page,
        browserName,
      }) => {
        // TODO: Fails in CI but works locally
        if (tagName === 'p-button' && browserName === 'webkit') {
          test.skip();
        }
        await setContentWithDesignSystem(page, markup);

        const host = page.locator(tagName);
        await setProperty(host, 'loading', true);
        await waitForStencilLifecycle(page);

        await setProperty(host, 'loading', false);
        await waitForStencilLifecycle(page);

        await expect.poll(() => getLoadingMessage(page), { timeout: 10000 }).toBe('Loading finished');
      });
    });
  });
}
