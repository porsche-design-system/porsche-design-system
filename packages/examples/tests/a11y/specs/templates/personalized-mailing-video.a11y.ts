import { schemes } from '@porsche-design-system/shared/testing';
import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/templates/personalized-mailing/video` – the whole page, and the video modal its reviews open, which the initial
 * scan never reaches. The modal is the same in the `no-video` variant, so it is scanned here only.
 */

const id = 'templates-personalized-mailing-video';
const url = getExampleUrl(id);

testInitialStates(id);

for (const scheme of schemes) {
  test(`video modal open with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator('#pm-voices [data-video-id]').first().click();
    await expect(page.locator('#pm-video-modal dialog')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--video-modal-open--${scheme}`);
  });
}
