import { expect, test } from '@playwright/test';
import { viewportWidthXXS } from '@porsche-design-system/shared/testing';
import { ids } from '../../../src/_ids.ts';
import { getExamplePages } from '../../vrt/helpers/pages.ts';
import { collectPageErrors, hasElement, setupExamplePage } from '../helpers/index.ts';

/**
 * Every example, and the behaviour the build inlines into it.
 *
 * The pages are globbed from `*.page.tsx` like the VRT and the a11y suite, so a new example is covered without
 * touching this file. The shared behaviour is keyed off the **ids a page renders** rather than off a list of page
 * names, which is the same rule [`plugins/entries.ts`](../../../plugins/entries.ts) uses to decide which snippet to
 * inline: if a page renders `#nav-button`, the drilldown snippet is in its entry and has to work.
 *
 * That keeps the two in step. A pattern that starts rendering the header gets its drilldown covered here on the same
 * commit, and a page that stops rendering it stops being asserted, without either list being maintained by hand.
 */

const examplePages = getExamplePages();

test('should have a page for every example', () => {
  // 3 templates and 9 patterns, the same count the other suites assert.
  expect(examplePages.length).toBe(12);
});

for (const { id, url } of examplePages) {
  test.describe(id, () => {
    test('loads without reporting an error', async ({ page }) => {
      const errors = collectPageErrors(page);

      await setupExamplePage(page, url);

      // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
      await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
      expect(errors).toEqual([]);
    });
  });
}

/**
 * The navigation drilldown – `src/assets/header.js`.
 *
 * Opened by the menu button, which is the only way into the navigation at the narrow viewport. The host of the
 * drilldown stays a zero-height anchor in the header, so what becomes visible is the `dialog` in its shadow root.
 */
for (const { id, url } of examplePages) {
  test.describe(id, () => {
    test('opens and closes the navigation drilldown', async ({ page }) => {
      await setupExamplePage(page, url, viewportWidthXXS);

      test.skip(!(await hasElement(page, `#${ids.navButton}`)), 'this example renders no menu button');

      const drilldown = page.locator(`#${ids.navDrilldown} dialog`);
      await expect(drilldown).toBeHidden();

      await page.locator(`#${ids.navButton}`).click();
      await expect(drilldown).toBeVisible();

      // Closing is requested by the component and written back by the page – the one half of controlled mode that
      // an example gets wrong by forgetting, which leaves a drilldown that can be opened but never closed.
      await page.keyboard.press('Escape');
      await expect(drilldown).toBeHidden();
    });
  });
}

/**
 * The pause control of an autoplaying hero video – `src/assets/video.js`.
 *
 * The button hides its label, so its text content *is* its accessible name, and it is derived from the media events
 * rather than from the last click. Asserting the label is therefore asserting the accessibility of the control, not
 * only that the video stopped.
 */
for (const { id, url } of examplePages) {
  test.describe(id, () => {
    test('pauses and resumes the hero video from its control', async ({ page }) => {
      await setupExamplePage(page, url);

      test.skip(!(await hasElement(page, `#${ids.pauseButton}`)), 'this example renders no hero video');

      const video = page.locator(`#${ids.heroVideo}`);
      const pauseButton = page.locator(`#${ids.pauseButton}`);
      const isPaused = () => video.evaluate((element: HTMLVideoElement) => element.paused);

      // The video autoplays, so the control starts out offering to pause it.
      await expect(pauseButton).toHaveText('Pause Video');
      expect(await isPaused()).toBe(false);

      await pauseButton.click();
      await expect(pauseButton).toHaveText('Play Video');
      expect(await isPaused()).toBe(true);

      await pauseButton.click();
      await expect(pauseButton).toHaveText('Pause Video');
      expect(await isPaused()).toBe(false);
    });
  });
}
