import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('js-focus-regular', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'focus-regular',
        async () => {
          await vrt.goTo('/#/js-focus');
          await vrt.focus('#focusable-element-regular');
        },
        { regressionSuffix: 'js' }
      )
    ).toBeFalsy();
  });
});
