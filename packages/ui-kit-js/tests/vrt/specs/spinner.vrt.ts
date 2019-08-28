import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Spinner', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('spinner', async () => {
        await vrt.goTo('/src/components/feedback/spinner/spinner.test.html');
        await vrt.getPage().addStyleTag({content: ':root { --p-animation-duration__spinner: 0s; }'});
      })
    ).toBeFalsy();
  });
});
