import 'jasmine';
import {VisualRegressionTester} from '@porsche-design-system/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Checkbox Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('checkbox-wrapper', async () => {
        await vrt.goTo('/src/components/form/checkbox-wrapper/checkbox-wrapper.test.html');
        await vrt.focus('#test-focus-state');
      })
    ).toBeFalsy();
  });
});
