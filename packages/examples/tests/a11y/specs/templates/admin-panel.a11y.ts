import {
  getExampleUrl,
  setupExamplePage,
  waitForComponentsReady,
  waitForStablePosition,
} from '../../../helpers/index.ts';
import { expect, expectNoViolations, scanMatrix, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/templates/admin-panel` – an application canvas, scanned with its settings sidebar and its search dialog open.
 */

const id = 'templates-admin-panel';
const url = getExampleUrl(id);

testInitialStates(id);

for (const { viewportWidth, scheme } of scanMatrix) {
  test(`settings sidebar open at ${viewportWidth} with color-scheme ${scheme}`, async ({
    page,
    makeAxeBuilder,
  }, testInfo) => {
    await setupExamplePage(page, url, viewportWidth, { prefersColorScheme: scheme });

    await page.locator('#settings-button').click();
    await expect(page.locator('#settings-button button')).toHaveAttribute('aria-expanded', 'true');
    await expect
      .poll(() =>
        page
          .locator('#admin-canvas')
          .evaluate((element: HTMLElement & { sidebarEndOpen?: boolean }) => element.sidebarEndOpen === true)
      )
      .toBe(true);
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}-settings-open-${viewportWidth}-${scheme}`);
  });

  test(`search dialog open at ${viewportWidth} with color-scheme ${scheme}`, async ({
    page,
    makeAxeBuilder,
  }, testInfo) => {
    await setupExamplePage(page, url, viewportWidth, { prefersColorScheme: scheme });

    await page.locator('#search-button').click();
    await expect(page.locator('#search-dialog')).toBeVisible();
    // The panel of `p-modal` is the `dialog` in its shadow root – the host is `display: contents` and has no box.
    await waitForStablePosition(page.locator('#search-dialog dialog'));
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}-search-open-${viewportWidth}-${scheme}`);
  });
}
