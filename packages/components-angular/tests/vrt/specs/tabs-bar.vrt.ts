import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Tabs Bar', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'tabs-bar',
        async () => {
          await vrt.goTo('/text'); // to ensure fonts are already loaded before js is initialized
          await vrt.goTo('/tabs-bar');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
