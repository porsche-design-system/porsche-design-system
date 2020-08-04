import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionOverviewTester, redraw, testOptions } from '../helpers';

describe('Overview Prefixed', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionOverviewTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'overview-prefixed',
        async () => {
          await vrt.goTo('/#overview-prefixed', 1000);
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
