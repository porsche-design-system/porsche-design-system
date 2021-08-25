import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionFocusTester } from '../helpers/setup';

describe('js-helper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionFocusTester();
  });

  const vrtTest = (id: string) =>
    vrt.test(
      `helper-${id}`,
      async () => {
        await vrt.goTo('/#/js-helper');
      },
      { regressionSuffix: 'js' }
    );

  it('should have no visual regression for screen reader only styles', async () => {
    expect(await vrtTest('regular')).toBeFalsy();
  });
});
