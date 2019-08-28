import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Button Regular', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('button-regular', async () => {
        await vrt.goTo('/src/components/action/button-regular/button-regular.test.html');
        await vrt.getPage().addStyleTag({content: ':root { --p-animation-duration__spinner: 0s; }'});
      })
    ).toBeFalsy();
  });
});
