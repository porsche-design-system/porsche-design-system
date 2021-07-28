import { getVisualRegressionOverviewTester, testOptions } from '../helpers';

describe('Typography', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionOverviewTester();
    expect(
      await vrt.test(
        'typography',
        async () => {
          await vrt.goTo('/typography');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
