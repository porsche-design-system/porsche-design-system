import { test, expect } from '../../../helpers';
import { setupScenario } from '../../../../vrt/helpers';
import { viewportWidthXXL, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';

// executed in Chrome only
test.describe('overview', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no accessibility regression for viewport ${viewportWidthXXL}`, async ({
    page,
    makeAxeBuilder,
  }, testInfo) => {
    await setupScenario(page, '/overview', viewportWidthXXL);
    await page.mouse.click(0, 0);

    const accessibilityScanResults = await makeAxeBuilder().analyze();

    await testInfo.attach(`a11y-scan-results-overview-${viewportWidthXXL}`, {
      body: JSON.stringify(accessibilityScanResults.violations, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations.length).toBe(0);
  });
});

// executed in Chrome only
test.describe('overview notifications', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no accessibility regression for viewport ${viewportWidthM}`, async ({
    page,
    makeAxeBuilder,
  }, testInfo) => {
    await setupScenario(page, '/overview-notifications', viewportWidthM);
    await page.mouse.click(0, 0);

    const accessibilityScanResults = await makeAxeBuilder().analyze();

    await testInfo.attach(`a11y-scan-results-overview-notifications-${viewportWidthM}`, {
      body: JSON.stringify(accessibilityScanResults.violations, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations.length).toBe(0);
  });
});
