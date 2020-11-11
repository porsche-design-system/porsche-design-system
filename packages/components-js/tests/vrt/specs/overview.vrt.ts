import { getVisualRegressionOverviewTester, testOptions } from '../helpers';

describe('Overview', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionOverviewTester();
    expect(
      await vrt.test(
        'overview',
        async () => {
          await vrt.goTo('/#text'); // so ensure fonts are already loaded before js is initialized
          await vrt.goTo('/#overview');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
