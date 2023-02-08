import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

xit('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), 'variables', '/#/js-variables', { regressionSuffix: 'js' })
  ).toBeFalsy();
});
