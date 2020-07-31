import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Pagination', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'pagination',
        async () => {
          await vrt.goTo('#pagination');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
