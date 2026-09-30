import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/templates/landing-page` – the navigation drilldown (`MainNav`) and the hero video
 * (`VideoPauseButton`), both wired up by the scripts of their partials.
 */

const url = getExampleUrl('templates-landing-page');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('opens and closes the navigation drilldown', async ({ page }) => {
  await setupExamplePage(page, url);

  // The host stays a zero-height anchor in the header, so what becomes visible is the `dialog` in its shadow root.
  const drilldown = page.locator('#nav-drilldown dialog');
  await expect(drilldown).toBeHidden();

  await page.locator('#nav-button').click();
  await expect(drilldown).toBeVisible();

  // Closing is requested by the component and written back by the page – the one half of controlled mode that an
  // example gets wrong by forgetting, which leaves a drilldown that can be opened but never closed.
  await page.keyboard.press('Escape');
  await expect(drilldown).toBeHidden();
});

test('pauses and resumes the hero video from its control', async ({ page }) => {
  await setupExamplePage(page, url);

  const video = page.locator('#hero-video');
  const pauseButton = page.locator('#pause-button');
  const isPaused = () => video.evaluate((element: HTMLVideoElement) => element.paused);

  // The button hides its label, so its text *is* its accessible name – and it is derived from the media events, not
  // from the last click. The video autoplays, so the control starts out offering to pause it.
  await expect(pauseButton).toHaveText('Pause Video');
  expect(await isPaused()).toBe(false);

  await pauseButton.click();
  await expect(pauseButton).toHaveText('Play Video');
  expect(await isPaused()).toBe(true);

  await pauseButton.click();
  await expect(pauseButton).toHaveText('Pause Video');
  expect(await isPaused()).toBe(false);
});
