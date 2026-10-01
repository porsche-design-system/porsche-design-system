import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing';
import { collectPageErrors, getExampleUrl, getTriggerControl, isOpen, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/priority-navigation` – a bar that moves the entries it cannot fit into a controlled popover.
 */

const url = getExampleUrl('patterns-popover-priority-navigation');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('moves entries into the popover as the bar narrows, and back out again', async ({ page }) => {
  await setupExamplePage(page, url, viewportWidthM);

  const overflowEntries = page.locator('#overflow-list > *');
  const wideOverflowCount = await overflowEntries.count();

  // Narrowing the viewport has to push entries out of the bar and into the popover behind the trigger.
  await page.setViewportSize({ width: 480, height: 800 });
  await expect.poll(() => overflowEntries.count()).toBeGreaterThan(wideOverflowCount);
  await expect(page.locator('#more-trigger')).toBeVisible();

  // The popover is controlled, so its trigger has to report its state.
  const moreTrigger = getTriggerControl(page, 'more-button');
  await expect(moreTrigger).toHaveAttribute('aria-expanded', 'false');

  await page.locator('#more-button').click();
  await expect.poll(() => isOpen(page.locator('#more-popover'))).toBe(true);
  await expect(moreTrigger).toHaveAttribute('aria-expanded', 'true');

  // Widening again has to pull them back – a boundary that only ever collapses is the bug this guards.
  await page.setViewportSize({ width: viewportWidthM, height: 800 });
  await expect.poll(() => overflowEntries.count()).toBe(wideOverflowCount);
});
