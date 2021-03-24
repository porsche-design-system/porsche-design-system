import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Button Group', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'button-group',
        async () => {
          await vrt.goTo('/button-group');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
