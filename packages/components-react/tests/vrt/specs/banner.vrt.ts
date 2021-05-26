import { getVisualRegressionContentWrapperTester, testOptions } from '../helpers';

describe('Banner', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionContentWrapperTester();
    expect(
      await vrt.test(
        'banner',
        async () => {
          await vrt.goTo('/banner');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
