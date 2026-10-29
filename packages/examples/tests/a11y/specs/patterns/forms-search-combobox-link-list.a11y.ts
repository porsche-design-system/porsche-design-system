import { schemes } from '@porsche-design-system/shared/testing';
import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/search-combobox-link-list` – the closed field, an open list of matching links, and the empty state.
 */

const id = 'patterns-forms-search-combobox-link-list';
const url = getExampleUrl(id);

testInitialStates(id);

for (const scheme of schemes) {
  test(`results open with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    const stuttgart = page.getByRole('link', { name: 'Stuttgart', exact: true });
    await page.locator('#dealer-search input').fill('stu');
    await expect(stuttgart).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(stuttgart.locator('xpath=ancestor::p-link-pure[1]')).toHaveJSProperty('active', true);
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--results--${scheme}`);
  });

  test(`no results with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator('#dealer-search input').fill('zzz');
    await expect(page.locator('#dealer-search-empty')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--empty--${scheme}`);
  });
}
