import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Button Icon', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('button-icon', async () => {
        await vrt.goTo('/src/components/action/button-icon/button-icon.test.html');
      })
    ).toBeFalsy();
  });
});
