import { getVisualRegressionContentWrapperTester, getVisualRegressionTester, testOptions } from '../helpers';

describe('Content Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionContentWrapperTester();
    expect(
      await vrt.test(
        'content-wrapper',
        async () => {
          await vrt.goTo('#content-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
