import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/video` – a category with a mood video and the control pausing it.
 */

const url = getExampleUrl('patterns-tile-video');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('pauses and resumes the video from its control', async ({ page }) => {
  await setupExamplePage(page, url);

  const video = page.locator('#tile-video');
  const button = page.locator('#tile-video-button');
  const isPaused = () => video.evaluate((element: HTMLVideoElement) => element.paused);

  // The button hides its label, so its text *is* its accessible name – and it is derived from the media events, not
  // from the last click. The video autoplays, so the control starts out offering to pause it.
  await expect(button).toHaveText('Pause video');
  expect(await isPaused()).toBe(false);

  await button.click();
  await expect(button).toHaveText('Play video');
  expect(await isPaused()).toBe(true);

  await button.click();
  await expect(button).toHaveText('Pause video');
  expect(await isPaused()).toBe(false);
});
