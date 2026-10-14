import { expect, type Locator } from '@playwright/test';

/**
 * Waits until an element has stopped moving.
 *
 * A popover is positioned *after* it opens, and the `open` property flips before that has happened. Clicking in
 * between lands on whatever is still underneath — and for a coachmark anchored over the page that is an outside
 * click, which dismisses the very tour the test was about to walk. Playwright's own actionability cannot save this:
 * by the time it retries, the step is gone.
 *
 * `p-popover` emits only `dismiss`, so there is no "finished opening" event to await and the settled box is the
 * signal: two consecutive frames reporting the same position, with a real size.
 */
export const waitForStablePosition = async (locator: Locator): Promise<void> => {
  await expect
    .poll(async () => {
      const before = await locator.boundingBox();
      await locator
        .page()
        .evaluate(
          () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
        );
      const after = await locator.boundingBox();

      return !!before && !!after && before.x === after.x && before.y === after.y && after.width > 0;
    })
    .toBe(true);
};
