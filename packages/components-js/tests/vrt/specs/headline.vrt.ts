import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Headline', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'headline',
        async () => {
          await vrt.goTo('#headline');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
