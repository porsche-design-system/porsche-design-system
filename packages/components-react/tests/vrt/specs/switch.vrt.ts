import { getVisualRegressionOverviewTester, testOptions } from '../helpers';

describe('Switch', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionOverviewTester();
    expect(
      await vrt.test(
        'switch',
        async () => {
          await vrt.goTo('/switch');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
