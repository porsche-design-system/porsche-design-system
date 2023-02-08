import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

const componentName = 'display';
it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), componentName, `/${componentName}`, { javaScriptEnabled: false })
  ).toBeFalsy();
});
