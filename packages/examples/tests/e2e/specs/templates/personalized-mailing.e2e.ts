import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, isOpen, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/templates/personalized-mailing` – the hero video (`HeroVideo`), wired up by the script of its partial, and the
 * behaviour of the page itself: the count-up of the key figures, the engine sound, the video modal of the reviews and
 * the contact bar that follows the scroll position.
 */

const url = getExampleUrl('templates-personalized-mailing');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // Templates share one site name; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Templates$/);
  expect(errors).toEqual([]);
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

test('counts the key figures up to their values once they are scrolled into view', async ({ page }) => {
  await setupExamplePage(page, url);

  const figures = page.locator('#pm-kpis [data-countup]');

  // Reset to zero on load, so the count-up has somewhere to start from.
  await expect(figures).toHaveText(['0', '0.0', '0', '0']);

  await page.locator('#pm-kpis').scrollIntoViewIfNeeded();
  await expect(figures).toHaveText(['9000', '3.9', '375', '510']);
});

test('shows the key figures right away when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await setupExamplePage(page, url);

  await expect(page.locator('#pm-kpis [data-countup]')).toHaveText(['9000', '3.9', '375', '510']);
});

test('plays and pauses the engine sound from its control', async ({ page }) => {
  await setupExamplePage(page, url);

  const player = page.locator('#pm-sound');
  const toggle = page.locator('#pm-sound-toggle');

  // Like the pause control of the video, the label follows the media events of the audio, not the last click.
  await expect(toggle).toHaveText('Play engine sound');
  await expect(player).not.toHaveAttribute('data-playing');

  await toggle.click();
  await expect(toggle).toHaveText('Pause engine sound');
  await expect(player).toHaveAttribute('data-playing');

  await toggle.click();
  await expect(toggle).toHaveText('Play engine sound');
  await expect(player).not.toHaveAttribute('data-playing');
});

test('opens a review in the video modal and unloads it on close', async ({ page }) => {
  await setupExamplePage(page, url);

  const modal = page.locator('#pm-video-modal');
  const iframe = page.locator('#pm-video-iframe');

  expect(await isOpen(modal)).toBe(false);

  await page.locator('#pm-voices [data-video-id="cYvm2S3pNp8"]').click();
  await expect.poll(() => isOpen(modal)).toBe(true);
  await expect(iframe).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/cYvm2S3pNp8/);
  // `open` is set before the modal has taken the focus – a key pressed in between still goes to the card behind it.
  await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe('pm-video-modal');

  // Closing is requested by the component and written back by the page – and only removing the source stops a
  // cross-origin player for good.
  await page.keyboard.press('Escape');
  await expect.poll(() => isOpen(modal)).toBe(false);
  await expect(iframe).not.toHaveAttribute('src');
});

test('shows the contact bar below the hero and hides it again at the contact section and the footer', async ({
  page,
}) => {
  await setupExamplePage(page, url);

  const contactBar = page.locator('#pm-contact-bar');
  const isInert = () => contactBar.evaluate((element: HTMLElement) => element.inert);

  // On the hero the bar is out of view – and inert, so its links are no tab stops.
  await expect(contactBar).not.toHaveAttribute('data-shown');
  expect(await isInert()).toBe(true);

  await page.locator('#pm-voices').scrollIntoViewIfNeeded();
  await expect(contactBar).toHaveAttribute('data-shown');
  expect(await isInert()).toBe(false);

  // The contact section shows the advisor already, so the bar steps aside.
  await page.locator('#pm-contact').scrollIntoViewIfNeeded();
  await expect(contactBar).not.toHaveAttribute('data-shown');

  // And it never covers the legal links of the footer.
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(contactBar).not.toHaveAttribute('data-shown');
  expect(await isInert()).toBe(true);
});
