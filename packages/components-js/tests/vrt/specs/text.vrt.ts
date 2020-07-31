import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Text', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'text',
        async () => {
          await vrt.goTo('#text');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
