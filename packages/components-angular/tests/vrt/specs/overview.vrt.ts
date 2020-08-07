import { getVisualRegressionOverviewTester, testOptions } from '../helpers';

describe('Overview', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionOverviewTester();
    expect(
      await vrt.test(
        'overview',
        async () => {
          await vrt.goTo('/overview');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
