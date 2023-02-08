import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('toast-basic', () => {
  it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
    expect(await vrtTest(getVisualRegressionTester(viewport), 'toast-basic', '/toast-basic')).toBeFalsy();
  });
});

describe('toast-prefixed', () => {
  it('should have no visual regression for viewport 1000', async () => {
    expect(await vrtTest(getVisualRegressionStatesTester(), 'toast-prefixed', '/toast-prefixed')).toBeFalsy();
  });
});
