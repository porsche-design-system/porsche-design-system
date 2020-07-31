import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Select Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'select-wrapper',
        async () => {
          await vrt.goTo('#select-wrapper');
          await vrt.focus('#test-focus-state');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
