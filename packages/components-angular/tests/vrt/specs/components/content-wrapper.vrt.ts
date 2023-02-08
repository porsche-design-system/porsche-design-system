import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

// TODO: renders slightly different compared to JS and React version (regression looks still good, maybe use vrt tolerance or ensure dom noes + styles are exactly the same in all framework implementations?)
xit.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'content-wrapper', '/content-wrapper')).toBeFalsy();
});
