import { expect, test } from '@playwright/test';
import { getDevice, getExampleUrl, setupExamplePage, waitForStablePosition } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/templates/personalized-mailing/video` – the whole page, and the video modal its reviews open. The modal is the
 * same in the `no-video` variant, so it is captured here only.
 *
 * The page is captured with reduced motion, which is what makes it deterministic: every reveal is shown, the key
 * figures carry their final values, the share cards are fanned out and the hero is not inset. The modal covers the
 * viewport, so it is captured at viewport size; the external player inside it is stubbed by the setup.
 */

const id = 'templates-personalized-mailing-video';
const url = getExampleUrl(id);

testInitialStates(id);

test('video modal open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('#pm-voices [data-video-id]').first().click();
  const panel = page.locator('#pm-video-modal dialog');
  await expect(panel).toBeVisible();
  await waitForStablePosition(panel);
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--video-modal-open--${device}.png`);
});
