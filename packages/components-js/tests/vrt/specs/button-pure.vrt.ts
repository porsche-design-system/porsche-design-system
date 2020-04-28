import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Button Pure', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('button-pure', async () => {
        await vrt.goTo('/src/components/action/button-pure/button-pure.test.html');
      })
    ).toBeFalsy();
  });
});
