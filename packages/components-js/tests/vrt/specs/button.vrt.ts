import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Button', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('button', async () => {
        await vrt.goTo('/src/components/action/button/button.test.html');
      })
    ).toBeFalsy();
  });
});
