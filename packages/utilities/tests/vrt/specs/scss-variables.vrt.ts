import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('scss-variables', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'overview',
        async () => {
          await vrt.goTo('/#/scss-variables');
        },
        { regressionSuffix: 'scss' }
      )
    ).toBeFalsy();
  });
});
