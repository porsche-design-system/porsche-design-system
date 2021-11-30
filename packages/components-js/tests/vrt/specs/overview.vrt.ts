import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';
import { openPopoversAndSetBackground } from '@porsche-design-system/shared-src/src/testing/puppeteer-vrt-helper';

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/#overview', {
      scenario: (page) => openPopoversAndSetBackground(page, false, true),
      initialViewportHeight: 1000,
    })
  ).toBeFalsy();
});
