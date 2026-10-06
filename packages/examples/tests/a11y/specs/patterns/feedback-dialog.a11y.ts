import { schemes } from '@porsche-design-system/shared/testing';
import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/feedback/dialog` – the feedback question asked inside a `p-modal`, which the initial scan never
 * reaches. A dialog is exactly the kind of surface where a missing name or an unreachable control matters.
 */

const id = 'patterns-feedback-dialog';
const url = getExampleUrl(id);

testInitialStates(id);

for (const scheme of schemes) {
  test(`dialog open with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator('#feedback-trigger').click();
    await expect(page.locator('#feedback-modal')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--dialog-open--${scheme}`);
  });

  test(`dialog open with a rating chosen with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator('#feedback-trigger').click();
    await expect(page.locator('#feedback-modal')).toBeVisible();
    await page.locator('p-segmented-control-item[value="4"]').click();
    await expect(page.locator('#feedback-comment')).toBeVisible();
    await expect(page.locator('#feedback-submit')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--dialog-rated--${scheme}`);
  });

  test(`dialog open with the confirmation with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator('#feedback-trigger').click();
    await expect(page.locator('#feedback-modal')).toBeVisible();
    await page.locator('p-segmented-control-item[value="4"]').click();
    await page.locator('#feedback-submit').click();
    // The example delays the submission to simulate a round trip, so the confirmation is awaited.
    await expect(page.locator('#feedback-thanks')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--dialog-confirmation--${scheme}`);
  });
}
