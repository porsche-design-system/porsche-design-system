import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('scss-focus-pseudo', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'focus-pseudo',
        async () => {
          await vrt.goTo('/#/scss-focus');
          await vrt.focus('#focusable-element-pseudo');
        },
        { regressionSuffix: 'scss' }
      )
    ).toBeFalsy();
  });
});
