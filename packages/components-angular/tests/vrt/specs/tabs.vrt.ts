import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Tabs', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'tabs',
        async () => {
          await vrt.goTo('/tabs');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
