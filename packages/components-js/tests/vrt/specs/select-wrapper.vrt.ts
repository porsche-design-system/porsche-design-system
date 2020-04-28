import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Select Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('select-wrapper', async () => {
        await vrt.goTo('/src/components/form/select-wrapper/select-wrapper.test.html');
        await vrt.focus('#test-focus-state');
      })
    ).toBeFalsy();
  });
});
