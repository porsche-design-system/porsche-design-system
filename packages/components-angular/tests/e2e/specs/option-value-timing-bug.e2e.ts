import { expect, type Locator, type Page, test } from '@playwright/test';
import { getConsoleErrorsAmount, goto, initConsoleObserver, waitForComponentsReady } from '../helpers';

const navigateTo = async (page: Page, route: 'page-a' | 'page-b'): Promise<void> => {
  await page.locator(`a[href$="/option-value-timing-bug/${route}"]`).click();
  await page.waitForURL(`**/option-value-timing-bug/${route}`);
  await waitForComponentsReady(page);
};

const hasShadowContent = (option: Locator): Promise<boolean> =>
  option.evaluate((el) => (el.shadowRoot?.children.length ?? 0) > 0);

const optionTagNames = [
  'p-radio-group-option',
  'p-segmented-control-item',
  'p-select-option',
  'p-multi-select-option',
] as const;

// Once the component bundles are cached, e.g. when navigating back to a route, Angular applies the `[value]` and
// `[identifier]` bindings after Stencil has already rendered the options and drilldown items. With `eventCoalescing`
// the parents have additionally matched their value already, so only then the preselection is affected (#4743)
for (const query of ['', '?eventCoalescing']) {
  test.describe(`option value bound as property after navigating back to a route ${query}`, () => {
    test.beforeEach(async ({ page }) => {
      initConsoleObserver(page);
      await goto(page, `option-value-timing-bug/page-a${query}`);
      await navigateTo(page, 'page-b');
      await navigateTo(page, 'page-a');
    });

    for (const tagName of optionTagNames) {
      test(`should render every ${tagName}`, async ({ page }) => {
        for (const option of await page.locator(tagName).all()) {
          expect(await hasShadowContent(option)).toBe(true);
        }
      });

      test(`should select the ${tagName} matching the parent value`, async ({ page }) => {
        const [regularOption, specialOption] = await page.locator(tagName).all();

        await expect(regularOption).toHaveJSProperty('selected', true);
        await expect(specialOption).not.toHaveJSProperty('selected', true);
      });
    }

    test('should show the drilldown level matching the active identifier', async ({ page }) => {
      const [regularItem, specialItem] = await page.locator('p-drilldown-item').all();

      await expect(regularItem).toHaveJSProperty('secondary', false);
      await expect(specialItem).toHaveJSProperty('secondary', true);
    });

    test('should not log any errors', async () => {
      expect(getConsoleErrorsAmount()).toBe(0);
    });
  });
}
