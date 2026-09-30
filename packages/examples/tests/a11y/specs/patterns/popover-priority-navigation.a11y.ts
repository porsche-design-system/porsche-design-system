import {
  getExampleUrl,
  setupExamplePage,
  waitForComponentsReady,
  waitForStablePosition,
} from '../../../helpers/index.ts';
import { expect, expectNoViolations, scanMatrix, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/priority-navigation` – a bar that moves the entries it cannot fit into a popover, scanned
 * with that popover open.
 */

const id = 'patterns-popover-priority-navigation';
const url = getExampleUrl(id);

testInitialStates(id);

for (const { viewportWidth, scheme } of scanMatrix) {
  test(`overflow popover open at ${viewportWidth} with color-scheme ${scheme}`, async ({
    page,
    makeAxeBuilder,
  }, testInfo) => {
    await setupExamplePage(page, url, viewportWidth, { prefersColorScheme: scheme });

    await page.locator('#more-button').click();
    await expect(page.locator('#more-button button')).toHaveAttribute('aria-expanded', 'true');
    await waitForStablePosition(page.locator('#overflow-list'));
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}-overflow-open-${viewportWidth}-${scheme}`);
  });
}
