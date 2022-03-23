import {
  defaultViewports,
  getVisualRegressionTester,
  openPopoversAndHighlightSpacer,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'popover', '/popover', {
      scenario: (page) => openPopoversAndHighlightSpacer(page),
    })
  ).toBeFalsy();
});
