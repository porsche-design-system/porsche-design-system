import {
  getVisualRegressionTester,
  getVisualRegressionMarque2xTester,
  getVisualRegressionMarque3xTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('Marque', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'marque', '/marque')).toBeFalsy();
  });

  it('should have no visual regression on retina 2x display', async () => {
    expect(await vrtTest(getVisualRegressionMarque2xTester(), 'marque-2x', '/marque')).toBeFalsy();
  });

  it('should have no visual regression on retina 3x display', async () => {
    expect(await vrtTest(getVisualRegressionMarque3xTester(), 'marque-3x', '/marque')).toBeFalsy();
  });
});
