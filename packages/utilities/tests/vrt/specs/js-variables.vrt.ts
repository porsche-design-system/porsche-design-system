import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('js-variables', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'overview',
        async () => {
          await vrt.goTo('/#/js-variables');
        },
        { regressionSuffix: 'js' }
      )
    ).toBeFalsy();
  });
});
