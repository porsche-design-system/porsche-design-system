import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

xit('should have no visual regression for screen reader only styles', async () => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), 'helper', '/#/scss-helper', { regressionSuffix: 'scss' })
  ).toBeFalsy();
});
