import { getInternalUrls, getProperty } from '../helpers';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { expect, test } from '@playwright/test';

// filter out files from public/assets directory
const internalUrls = getInternalUrls().filter((url) => !url.match(/^\/assets\/.*\.\w{3,4}$/));

const themeableComponents = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).isThemeable).join();
const componentsWithThemeAutoSelector = `:where(${themeableComponents}):not(.playground *):not(p-link-tile *)`; // everything inside playground is not based on color-scheme preferences

for (const [url, index] of internalUrls.map<[string, number]>((url, i) => [url, i])) {
  test(`should have auto dark mode support at (${index + 1}/${internalUrls.length}) "${url}"`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('html.hydrated');
    await page.evaluate(() =>
      (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
    );

    const components = page.locator(componentsWithThemeAutoSelector);

    // TODO: Use Locator instead of ElementHandle
    for (const component of await components.elementHandles()) {
      expect(
        await getProperty(component, `theme`),
        `"${await getProperty(component, 'tagName')}" didn't use theme="auto"`
      ).toBe('auto');
    }
  });
}
