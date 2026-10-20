import { schemes } from '@porsche-design-system/shared/testing';
import {
  getExampleUrl,
  setupExamplePage,
  waitForComponentsReady,
  waitForStablePosition,
} from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/feature-tour` – coachmarks of which only one is open at a time. The initial scan covers the
 * first; this scans the second, which is the first to carry a back action.
 */

const id = 'patterns-popover-feature-tour';
const url = getExampleUrl(id);

testInitialStates(id);

for (const scheme of schemes) {
  test(`second step with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    const steps = page.locator('[data-tour-step]');
    // A popover is positioned after it opens – clicking before it settled would be an outside click ending the tour.
    const next = steps.first().locator('[data-tour="next"]');
    await waitForStablePosition(next);
    await next.click();

    const back = steps.nth(1).locator('[data-tour="back"]');
    await expect(back).toBeVisible();
    await waitForStablePosition(back);
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--step-2--${scheme}`);
  });
}
