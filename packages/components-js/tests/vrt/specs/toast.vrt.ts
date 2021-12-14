import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('toast-basic', () => {
  it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
    expect(await vrtTest(getVisualRegressionTester(viewport), 'toast-basic', '/#toast-basic')).toBeFalsy();
  });
});

describe('toast-basic-dark', () => {
  it('should have no visual regression for viewport 1000', async () => {
    expect(await vrtTest(getVisualRegressionStatesTester(), 'toast-basic-dark', '/#toast-basic-dark')).toBeFalsy();
  });
});

describe('toast-basic-long-text', () => {
  it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionTester(viewport), 'toast-basic-long-text', '/#toast-basic-long-text')
    ).toBeFalsy();
  });
});

describe('toast-offset', () => {
  it('should have no visual regression for viewport 1000', async () => {
    expect(await vrtTest(getVisualRegressionStatesTester(), 'toast-offset', '/#toast-offset')).toBeFalsy();
  });
});

describe('toast-prefixed', () => {
  it('should have no visual regression for viewport 1000', async () => {
    expect(await vrtTest(getVisualRegressionStatesTester(), 'toast-prefixed', '/#toast-prefixed')).toBeFalsy();
  });
});
