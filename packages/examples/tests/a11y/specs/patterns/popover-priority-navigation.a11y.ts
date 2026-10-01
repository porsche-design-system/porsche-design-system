import { schemes } from '@porsche-design-system/shared/testing';
import {
  getDevice,
  getExampleUrl,
  setupExamplePage,
  waitForComponentsReady,
  waitForStablePosition,
} from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/priority-navigation` – a bar that moves the entries it cannot fit into a popover, scanned
 * with that popover open on mobile, the one device where entries overflow.
 */

const id = 'patterns-popover-priority-navigation';
const url = getExampleUrl(id);

testInitialStates(id);

for (const scheme of schemes) {
  test(`overflow popover open with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    // The desktop viewport fits every entry into the bar, so there is no overflow to open.
    test.skip(getDevice() === 'desktop', 'every entry fits into the bar on desktop');
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator('#more-button').click();
    await expect(page.locator('#more-button button')).toHaveAttribute('aria-expanded', 'true');
    await waitForStablePosition(page.locator('#overflow-list'));
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--overflow-open--${scheme}`);
  });
}
