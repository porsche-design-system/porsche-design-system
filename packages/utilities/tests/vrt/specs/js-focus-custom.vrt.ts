import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionFocusTester } from '../helpers/setup';

describe('js-focus', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionFocusTester();
  });

  const vrtTest = (id: string, focusSelector: string) => vrt.test(
    `focus-${id}`,
    async () => {
      await vrt.goTo('/#/js-focus');
      await vrt.focus(`#focusable-element-${focusSelector}`);
    },
    { regressionSuffix: 'js' }
  );

  it('should have no visual regression', async () => {
    expect( await vrtTest('regular','regular')).toBeFalsy();
  });

  it('should have no visual regression custom element', async () => {
    expect( await vrtTest('custom','custom')).toBeFalsy();
  });

  it('should have no visual regression custom pseudo element', async () => {
    expect( await vrtTest('custom-pseudo','custom-pseudo')).toBeFalsy();
  });

  it('should have no visual regression pseudo element', async () => {
    expect( await vrtTest('pseudo','pseudo')).toBeFalsy();
  });
});
