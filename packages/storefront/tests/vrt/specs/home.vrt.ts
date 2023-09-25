import { furtherExtendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

it.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'home', '/', { prefersColorScheme: 'light' })).toBeFalsy();
});

it('should have no visual regression for viewport 1000 in auto dark mode', async () => {
  expect(await vrtTest(getVisualRegressionTester(1000), 'home-dark', '/', { prefersColorScheme: 'dark' })).toBeFalsy();
});
