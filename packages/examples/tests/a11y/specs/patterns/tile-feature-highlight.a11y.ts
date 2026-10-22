import { schemes } from '@porsche-design-system/shared/testing';
import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/feature-highlight` – a feature whose details an accordion reveals on demand.
 */

const id = 'patterns-tile-feature-highlight';
const url = getExampleUrl(id);
// `page-has-heading-one` is a best-practice rule about *pages*, and this pattern is not one: like the footer pattern, it
// demonstrates a single element in the place it occupies, and a heading above it would be content the pattern is not
// about. The unit tests encode the same exception for every tile pattern.
const disabledRules = ['page-has-heading-one'];

testInitialStates(id, { disabledRules });

for (const scheme of schemes) {
  test(`details revealed with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    const accordion = page.locator('#feature-highlight-accordion');
    await accordion.getByText('Show more').click();
    await expect(accordion.getByText('Distinctive light signatures')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder().disableRules(disabledRules), testInfo, `${id}--expanded--${scheme}`);
  });
}
