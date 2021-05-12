import { getVisualRegressionTester } from '../helpers/setup';

describe('Home', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'home',
        async () => {
          await vrt.goTo('/');
        },
        { maskSelectors: ['.sidebar header p-text[size="x-small"]'] }
      )
    ).toBeFalsy();
  });
});
