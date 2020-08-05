import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Headline', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'headline',
        async () => {
          await vrt.goTo('#headline');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
