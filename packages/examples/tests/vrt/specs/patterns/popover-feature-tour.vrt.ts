import { expect, test } from '@playwright/test';
import { getExampleUrl, setupExamplePage, waitForStablePosition } from '../../../helpers/index.ts';
import { getViewportWidth, testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/feature-tour` – coachmarks of which only one is open at a time. The initial state shows the
 * first; this captures the second, which is the first to carry a back action.
 */

const id = 'patterns-popover-feature-tour';
const url = getExampleUrl(id);

testInitialStates(id);

test('second step', async ({ page }) => {
  const viewportWidth = getViewportWidth();
  await setupExamplePage(page, url, viewportWidth);

  const steps = page.locator('[data-tour-step]');
  // A popover is positioned after it opens – clicking before it settled would be an outside click ending the tour.
  const next = steps.first().locator('[data-tour="next"]');
  await waitForStablePosition(next);
  await next.click();

  const back = steps.nth(1).locator('[data-tour="back"]');
  await expect(back).toBeVisible();
  await waitForStablePosition(back);
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--step-2--${viewportWidth}.png`);
});
