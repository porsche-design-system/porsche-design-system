import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Component Overview', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('overview', async () => {
        await visualRegressionTester.goTo('/index.html');
        await visualRegressionTester.getPage()
          .addStyleTag({content: ':root { --p-animation-duration__spinner: 0s; }'});
      })
    ).toBeFalsy();
  });
});
