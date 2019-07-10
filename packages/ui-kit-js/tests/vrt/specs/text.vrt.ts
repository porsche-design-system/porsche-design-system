import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Text', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('text', async () => {
        await visualRegressionTester.goTo('/src/components/basic/typography/text/text.test.html');
      })
    ).toBeFalsy();
  });
});
