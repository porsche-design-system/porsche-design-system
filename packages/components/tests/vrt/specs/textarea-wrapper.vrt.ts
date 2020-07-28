import 'jasmine';
import {VisualRegressionTester} from '@porsche-design-system/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';
import { redraw } from '../helpers/redraw';

describe('Textarea Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('textarea-wrapper', async () => {
        await vrt.goTo('/src/components/form/textarea-wrapper/textarea-wrapper.test.html');
        await vrt.focus('#test-focus-state');
        await redraw(vrt.getPage());
      })
    ).toBeFalsy();
  });
});
