import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Radio Button Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('radio-button-wrapper', async () => {
        await vrt.goTo('/src/components/form/radio-button-wrapper/radio-button-wrapper.test.html');
        await vrt.focus('#test-focus-state');
      })
    ).toBeFalsy();
  });
});
