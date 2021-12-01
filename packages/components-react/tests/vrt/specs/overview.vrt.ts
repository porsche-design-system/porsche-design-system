import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';
import { openPopoversAndSetBackground } from '@porsche-design-system/shared-src/src/testing/puppeteer-vrt-helper';

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/overview', {
      scenario: (page) => openPopoversAndSetBackground(page, false, true),
      // We need a initial height to ensure the popover can open to the preferred direction
      initialViewportHeight: 1000,
    })
  ).toBeFalsy();
});
