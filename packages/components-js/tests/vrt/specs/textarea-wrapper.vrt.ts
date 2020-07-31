import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester, redraw, testOptions } from '../helpers';

describe('Textarea Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'textarea-wrapper',
        async () => {
          await vrt.goTo('#textarea-wrapper');
          await vrt.focus('#test-focus-state');
          await redraw(vrt.getPage());
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
