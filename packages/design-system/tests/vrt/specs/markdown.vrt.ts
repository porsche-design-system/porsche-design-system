import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Markdown', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('markdown', async () => {
        await visualRegressionTester.goTo('/#/markdown');
      }, ['#app > .sidebar > nav'])
    ).toBeFalsy();
  });
});
