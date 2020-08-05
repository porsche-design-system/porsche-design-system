import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Fieldset Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'fieldset-wrapper',
        async () => {
          await vrt.goTo('#fieldset-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
