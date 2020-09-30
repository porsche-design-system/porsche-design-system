import { getVisualRegressionTester, testOptions } from '../helpers';

describe('TabsNav', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'tabs-nav',
        async () => {
          await vrt.goTo('/tabs-nav');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
