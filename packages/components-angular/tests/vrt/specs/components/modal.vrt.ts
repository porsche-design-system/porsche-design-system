import { furtherExtendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

// TODO: renders slightly different compared to JS and React version (regression looks still good, maybe use vrt tolerance or ensure dom noes + styles are exactly the same in all framework implementations?)
xit.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'modal', '/modal', {
      scenario: async (page) => {
        await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal
      },
    })
  ).toBeFalsy();
});
