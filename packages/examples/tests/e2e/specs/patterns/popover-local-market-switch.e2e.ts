import { expect, test } from '@playwright/test';
import { viewportWidthXXS } from '@porsche-design-system/shared/testing';
import { ids } from '../../../../src/_ids.ts';
import { collectPageErrors, getExampleUrl, getTriggerControl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/local-market-switch` – two popovers in controlled mode, plus the navigation drilldown
 * (`src/assets/header.js`) and the hero video (`src/assets/video.js`) the build inlines.
 */

const url = getExampleUrl('patterns-popover-local-market-switch');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('offers the market switch on load and keeps the two disclosures exclusive', async ({ page }) => {
  await setupExamplePage(page, url);

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
  await setupExamplePage(page, url);

  const marketPanel = page.locator('#market-dismiss');
  await expect(marketPanel).toBeVisible();

  await marketPanel.click();

  await expect(marketPanel).toBeHidden();
  await expect(getTriggerControl(page, 'market-button')).toHaveAttribute('aria-expanded', 'false');
});

test('opens and closes the navigation drilldown', async ({ page }) => {
  // The menu button is the only way into the navigation at the narrow viewport.
  await setupExamplePage(page, url, viewportWidthXXS);

  // The host stays a zero-height anchor in the header, so what becomes visible is the `dialog` in its shadow root.
  const drilldown = page.locator(`#${ids.navDrilldown} dialog`);
  await expect(drilldown).toBeHidden();

  await page.locator(`#${ids.navButton}`).click();
  await expect(drilldown).toBeVisible();

  // Closing is requested by the component and written back by the page – the one half of controlled mode that an
  // example gets wrong by forgetting, which leaves a drilldown that can be opened but never closed.
  await page.keyboard.press('Escape');
  await expect(drilldown).toBeHidden();
});

test('pauses and resumes the hero video from its control', async ({ page }) => {
  await setupExamplePage(page, url);

  const video = page.locator(`#${ids.heroVideo}`);
  const pauseButton = page.locator(`#${ids.pauseButton}`);
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
