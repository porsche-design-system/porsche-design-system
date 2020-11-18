import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Radio Button Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'radio-button-wrapper',
        async () => {
          await vrt.goTo('/radio-button-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
