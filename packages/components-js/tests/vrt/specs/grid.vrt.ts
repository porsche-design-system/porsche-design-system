import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Grid', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'grid',
        async () => {
          await vrt.goTo('/#grid');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
