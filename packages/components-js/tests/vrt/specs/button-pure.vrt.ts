import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Button Pure', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'button-pure',
        async () => {
          await vrt.goTo('#button-pure');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
