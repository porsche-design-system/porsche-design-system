import { getVisualRegressionFocusTester } from '../helpers/setup';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';

describe('scss-helper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionFocusTester();
  });

  const vrtTest = (id: string) =>
    vrt.test(
      `helper-${id}`,
      async () => {
        await vrt.goTo('/#/scss-helper');
      },
      { regressionSuffix: 'scss' }
    );

  it('should have no visual regression for screen reader only styles', async () => {
    expect(await vrtTest('regular')).toBeFalsy();
  });
});
