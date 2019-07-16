import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Text List', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('text-list', async () => {
        await visualRegressionTester.goTo('/src/components/content/text-list/text-list.test.html');
      })
    ).toBeFalsy();
  });
});
