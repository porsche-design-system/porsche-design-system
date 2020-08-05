import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Spinner', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'spinner',
        async () => {
          await vrt.goTo('/#spinner');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
