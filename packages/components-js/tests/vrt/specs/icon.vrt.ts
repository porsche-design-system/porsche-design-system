import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Icon', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'icon',
        async () => {
          await vrt.goTo('#icon');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
