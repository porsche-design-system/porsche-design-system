import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Panel', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'panel',
        async () => {
          await vrt.goTo('/text'); // to ensure fonts are already loaded before js is initialized
          await vrt.goTo('/panel');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
