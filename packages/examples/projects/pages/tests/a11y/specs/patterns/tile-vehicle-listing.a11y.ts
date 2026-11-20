import { schemes } from '@porsche-design-system/testing';
import { waitForComponentsHydrated } from '@porsche-design-system/testing/playwright';
import { getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/vehicle-listing` – a vehicle of a search result, with a popover, a link to its technical data and
 * two actions. The opened popover is scanned on top of the initial state.
 */

const id = 'patterns-tile-vehicle-listing';
const url = getExampleUrl(id);
// `page-has-heading-one` is a best-practice rule about *pages*, and this pattern is not one: like the footer pattern,
// it demonstrates a single element in the place it occupies, and a heading above it would be content the pattern is
// not about. The unit tests encode the same exception for every tile pattern.
const disabledRules = ['page-has-heading-one'];

testInitialStates(id, { disabledRules });

for (const scheme of schemes) {
  test(`price explained with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.getByLabel('More information about the price').click();
    await expect(page.getByText('The price includes VAT')).toBeVisible();
    await waitForComponentsHydrated(page);

    await expectNoViolations(makeAxeBuilder().disableRules(disabledRules), testInfo, `${id}--popover--${scheme}`);
  });
}
