import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, scanMatrix, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/feedback/inline` – the feedback question asked in place, the comment a rating reveals and the
 * confirmation that replaces the question.
 */

const id = 'patterns-feedback-inline';
const url = getExampleUrl(id);

testInitialStates(id);

for (const { viewportWidth, scheme } of scanMatrix) {
  test(`rating chosen at ${viewportWidth} with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, viewportWidth, { prefersColorScheme: scheme });

    await page.locator('p-segmented-control-item[value="4"]').click();
    await expect(page.locator('#feedback-comment')).toBeVisible();
    await expect(page.locator('#feedback-submit')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}-rated-${viewportWidth}-${scheme}`);
  });

  test(`confirmation at ${viewportWidth} with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, viewportWidth, { prefersColorScheme: scheme });

    await page.locator('p-segmented-control-item[value="4"]').click();
    await page.locator('#feedback-submit').click();
    // The example delays the submission to simulate a round trip, so the confirmation is awaited.
    await expect(page.locator('#feedback-thanks')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}-confirmation-${viewportWidth}-${scheme}`);
  });
}
