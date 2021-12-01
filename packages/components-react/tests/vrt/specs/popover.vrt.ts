import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { openPopoversAndSetBackground } from '@porsche-design-system/shared-src/src/testing/puppeteer-vrt-helper';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'popover', '/popover', {
      scenario: openPopoversAndSetBackground,
      initialViewportHeight: 500,
    })
  ).toBeFalsy();
});

it('should have no visual regression on popover-overview for viewport 1760', async () => {
  expect(
    await vrtTest(getVisualRegressionTester(1760), 'popover-overview', '/popover-overview', {
      scenario: (page) => openPopoversAndSetBackground(page, true),
      initialViewportHeight: 800,
      elementSelector: '',
    })
  ).toBeFalsy();
});
