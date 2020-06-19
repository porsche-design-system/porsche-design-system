import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Home', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'home',
        async () => {
          await vrt.goTo('/');
        },
        { maskSelectors: ['.sidebar .header p-text[size="x-small"]'] }
      )
    ).toBeFalsy();
  });
});
