import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Fieldset Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'fieldset-wrapper',
        async () => {
          await vrt.goTo('#fieldset-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
