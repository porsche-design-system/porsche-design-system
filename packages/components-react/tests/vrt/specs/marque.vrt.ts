import {
  getVisualRegressionMarque2xTester,
  getVisualRegressionMarque3xTester,
  getVisualRegressionTester,
  testOptions
} from '../helpers';

describe('Marque', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'marque',
        async () => {
          await vrt.goTo('/marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression on retina 2x display', async () => {
    const vrt = getVisualRegressionMarque2xTester();
    expect(
      await vrt.test(
        'marque-2x',
        async () => {
          await vrt.goTo('/marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression on retina 3x display', async () => {
    const vrt = getVisualRegressionMarque3xTester();
    expect(
      await vrt.test(
        'marque-3x',
        async () => {
          await vrt.goTo('/marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
