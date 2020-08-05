import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Pagination', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'pagination',
        async () => {
          await vrt.goTo('/pagination');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
