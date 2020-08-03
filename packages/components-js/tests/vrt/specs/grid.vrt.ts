import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Grid', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'grid',
        async () => {
          await vrt.goTo('#grid');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
