import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'textarea-wrapper', '/textarea-wrapper')).toBeFalsy();
});

it.each(defaultViewports)('should have no skeleton visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'textarea-wrapper-skeleton', '/textarea-wrapper-skeleton')
  ).toBeFalsy();
});
