import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Checkbox Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('checkbox-wrapper', async () => {
        await vrt.goTo('/src/components/form/checkbox/checkbox-wrapper.test.html');
        await vrt.focus('#test-focus-state');
      })
    ).toBeFalsy();
  });
});
