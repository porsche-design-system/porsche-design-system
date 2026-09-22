import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing';
import { getExamplePages } from '../../vrt/helpers/pages.ts';
import { getTriggerControl, isOpen, setupExamplePage, waitForStablePosition } from '../helpers/index.ts';

/**
 * The flows an example authors next to its page, in `main.js`.
 *
 * Where [`examples.e2e.ts`](examples.e2e.ts) covers what every page shares, this file covers what exactly one page
 * does. The common thread is **controlled mode**: every disclosure in these examples has its open state owned by the
 * page, which is what lets a trigger mirror it onto `aria-expanded` and what makes "close" a thing the page has to
 * write back. Forgetting that half leaves a panel that opens and never closes, which renders and screenshots fine.
 *
 * Each flow is looked up by page id, so a page that disappears fails the lookup instead of silently testing nothing.
 */

const examplePages = getExamplePages();

/** The URL of an example, failing loudly if the page it names is gone. */
const getUrl = (id: string): string => {
  const examplePage = examplePages.find((page) => page.id === id);
  if (!examplePage) {
    throw new Error(`[examples] no example page "${id}" – rename the flow or remove it`);
  }
  return examplePage.url;
};

/**
 * Both feedback patterns ask the same thing through the same partial, so they run the same flow.
 *
 * The submission is deliberately delayed by 1.2s in the example to simulate a round trip, which is why the
 * confirmation is awaited rather than asserted straight after the click.
 */
for (const id of ['patterns-feedback-inline', 'patterns-feedback-dialog']) {
  test.describe(id, () => {
    test('reveals the comment on a rating, confirms, and moves focus', async ({ page }) => {
      await setupExamplePage(page, getUrl(id));

      // The dialog variant asks the same question inside a `p-modal`, so it has to be opened first.
      if (id === 'patterns-feedback-dialog') {
        await page.locator('#feedback-trigger').click();
        await expect(page.locator('#feedback-modal')).toBeVisible();
      }

      const comment = page.locator('#feedback-comment');
      const submit = page.locator('#feedback-submit');

      // The free-text field and the submit action only appear once there is something to submit.
      await expect(comment).toBeHidden();
      await expect(submit).toBeHidden();

      await page.locator('p-segmented-control-item[value="4"]').click();

      await expect(comment).toBeVisible();
      await expect(submit).toBeVisible();

      await submit.click();

      await expect(page.locator('#feedback-thanks')).toBeVisible();
      await expect(page.locator('#feedback-form')).toBeHidden();
      // The confirmation replaces the question, so focus has to be taken to it – otherwise it is never announced.
      await expect(page.locator('#feedback-thanks-heading')).toBeFocused();
    });
  });
}

test.describe('patterns-feedback-inline', () => {
  test('restarts the flow and returns focus to the question', async ({ page }) => {
    await setupExamplePage(page, getUrl('patterns-feedback-inline'));

    await page.locator('p-segmented-control-item[value="4"]').click();
    await page.locator('#feedback-submit').click();
    await expect(page.locator('#feedback-thanks')).toBeVisible();

    await page.locator('#feedback-restart').click();

    await expect(page.locator('#feedback-thanks')).toBeHidden();
    await expect(page.locator('#feedback-form')).toBeVisible();
    await expect(page.locator('#feedback-question')).toBeFocused();
    // Starting over has to start over: a rating left behind would submit the previous answer again.
    await expect(page.locator('#feedback-comment')).toBeHidden();
    await expect(page.locator('#feedback-submit')).toBeHidden();
  });
});

test.describe('patterns-feedback-dialog', () => {
  test('resets only once the dialog is fully hidden', async ({ page }) => {
    await setupExamplePage(page, getUrl('patterns-feedback-dialog'));

    await page.locator('#feedback-trigger').click();
    await page.locator('p-segmented-control-item[value="4"]').click();
    await page.locator('#feedback-submit').click();
    await expect(page.locator('#feedback-thanks')).toBeVisible();

    // The reset runs on `motionHiddenEnd` rather than on close, so the content does not snap back while the dialog
    // is still on screen. Re-opening is what proves it ran at all.
    await page.locator('#feedback-close').click();
    await expect(page.locator('#feedback-modal')).toBeHidden();

    await page.locator('#feedback-trigger').click();

    await expect(page.locator('#feedback-form')).toBeVisible();
    await expect(page.locator('#feedback-thanks')).toBeHidden();
    await expect(page.locator('#feedback-comment')).toBeHidden();
  });
});

test.describe('patterns-popover-local-market-switch', () => {
  test('offers the market switch on load and keeps the two disclosures exclusive', async ({ page }) => {
    await setupExamplePage(page, getUrl('patterns-popover-local-market-switch'));

    const marketTrigger = getTriggerControl(page, 'market-button');
    const profileTrigger = getTriggerControl(page, 'profile-button');
    // The popover host is a zero-height anchor and its panel lives in the shadow root, so what tells the two states
    // apart is whether the content the page slotted into it is on screen.
    const marketPanel = page.locator('#market-dismiss');

    // The market switch is the message the page offers on load, so it starts open and says so.
    await expect(marketPanel).toBeVisible();
    await expect(marketTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(profileTrigger).toHaveAttribute('aria-expanded', 'false');

    // Opening the profile menu closes the market switch – that mutual exclusion is the reason for controlled mode.
    await page.locator('#profile-button').click();

    await expect(marketPanel).toBeHidden();
    await expect(marketTrigger).toHaveAttribute('aria-expanded', 'false');
    await expect(profileTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('dismisses the market switch from its own action', async ({ page }) => {
    await setupExamplePage(page, getUrl('patterns-popover-local-market-switch'));

    const marketPanel = page.locator('#market-dismiss');
    await expect(marketPanel).toBeVisible();

    await marketPanel.click();

    await expect(marketPanel).toBeHidden();
    await expect(getTriggerControl(page, 'market-button')).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('patterns-popover-feature-tour', () => {
  test('walks the steps one at a time and ends on skip', async ({ page }) => {
    await setupExamplePage(page, getUrl('patterns-popover-feature-tour'));

    const steps = page.locator('[data-tour-step]');
    const openStates = () =>
      steps.evaluateAll<boolean[], HTMLElement & { open?: boolean }>((elements) =>
        elements.map((element) => element.open === true)
      );
    // Scoped to the step under test rather than picked by `:visible`, so the control clicked is unambiguous.
    const controlOf = (index: number, action: string) => steps.nth(index).locator(`[data-tour="${action}"]`);

    // "Only a single step is open at once" is the whole point of the pattern.
    await expect.poll(openStates).toEqual([true, false, false, false]);

    const next = controlOf(0, 'next');
    await waitForStablePosition(next);
    await next.click();

    await expect.poll(openStates).toEqual([false, true, false, false]);

    const skip = controlOf(1, 'skip');
    await waitForStablePosition(skip);
    await skip.click();

    await expect.poll(openStates).toEqual([false, false, false, false]);
  });

  test('offers the tour again after it ended', async ({ page }) => {
    await setupExamplePage(page, getUrl('patterns-popover-feature-tour'));

    const steps = page.locator('[data-tour-step]');
    const openCount = () =>
      steps.evaluateAll<number, HTMLElement & { open?: boolean }>(
        (elements) => elements.filter((element) => element.open === true).length
      );

    const skip = steps.first().locator('[data-tour="skip"]');
    await waitForStablePosition(skip);
    await skip.click();
    await expect.poll(openCount).toBe(0);

    await page.locator('#restart-tour').click();

    await expect.poll(() => isOpen(steps.first())).toBe(true);
  });
});

test.describe('patterns-popover-priority-navigation', () => {
  test('moves entries into the popover as the bar narrows, and back out again', async ({ page }) => {
    await setupExamplePage(page, getUrl('patterns-popover-priority-navigation'), viewportWidthM);

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
});

test.describe('templates-admin-panel', () => {
  test('mirrors the settings sidebar onto its trigger', async ({ page }) => {
    await setupExamplePage(page, getUrl('templates-admin-panel'), viewportWidthM);

    const settingsTrigger = getTriggerControl(page, 'settings-button');
    const canvas = page.locator('#admin-canvas');
    const isSidebarEndOpen = () =>
      canvas.evaluate((element: HTMLElement & { sidebarEndOpen?: boolean }) => element.sidebarEndOpen === true);

    await expect(settingsTrigger).toHaveAttribute('aria-expanded', 'false');

    await page.locator('#settings-button').click();

    await expect(settingsTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect.poll(isSidebarEndOpen).toBe(true);

    await page.locator('#settings-button').click();

    await expect(settingsTrigger).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(isSidebarEndOpen).toBe(false);
  });

  test('opens the search dialog from the toolbar', async ({ page }) => {
    await setupExamplePage(page, getUrl('templates-admin-panel'), viewportWidthM);

    const searchDialog = page.locator('#search-dialog');
    await expect(searchDialog).toBeHidden();

    await page.locator('#search-button').click();

    await expect(searchDialog).toBeVisible();

    // `p-modal` moves focus into itself as it opens, and Escape only reaches it once that has happened – pressing
    // too early is a keystroke into the page behind, which under load is exactly what happens.
    await waitForStablePosition(searchDialog);
    await page.keyboard.press('Escape');

    await expect(searchDialog).toBeHidden();
  });
});
