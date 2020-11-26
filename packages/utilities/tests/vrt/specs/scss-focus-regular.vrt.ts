import { getVisualRegressionFocusTester } from '../helpers/setup';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';

describe('scss-focus', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionFocusTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'focus-regular',
        async () => {
          await vrt.goTo('/#/scss-focus');
          await vrt.focus('#focusable-element-regular');
        },
        { regressionSuffix: 'scss' }
      )
    ).toBeFalsy();
  });

  it('should have no visual regression custom element', async () => {
    expect(
      await vrt.test(
        'focus-custom',
        async () => {
          await vrt.goTo('/#/scss-focus');
          await vrt.focus('#focusable-element-custom');
        },
        { regressionSuffix: 'scss' }
      )
    ).toBeFalsy();
  });

  it('should have no visual regression pseudo element', async () => {
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

  it('should have no visual regression custom pseudo element', async () => {
    expect(
      await vrt.test(
        'focus-custom-pseudo',
        async () => {
          await vrt.goTo('/#/scss-focus');
          await vrt.focus('#focusable-element-custom-pseudo');
        },
        { regressionSuffix: 'scss' }
      )
    ).toBeFalsy();
  });
});
