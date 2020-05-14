import 'jasmine';
import {VisualRegressionTester} from '@porsche-design-system/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Button', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('button', async () => {
        await vrt.goTo('/src/components/action/button/button.test.html');
      })
    ).toBeFalsy();
  });
});
