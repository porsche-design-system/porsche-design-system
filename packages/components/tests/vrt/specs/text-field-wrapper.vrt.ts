import 'jasmine';
import {VisualRegressionTester} from '@porsche-design-system/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Text Field Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('text-field-wrapper', async () => {
        await vrt.goTo('/src/components/form/text-field-wrapper/text-field-wrapper.test.html');
        await vrt.focus('#test-focus-state');
      })
    ).toBeFalsy();
  });
});
