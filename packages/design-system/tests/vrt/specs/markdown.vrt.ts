import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Markdown', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test(
        'markdown',
        async () => {
          await visualRegressionTester.goTo('/#/web/markdown');
        },
        '#app > .content > .main > .router-view'
      )
    ).toBeFalsy();
  });
});
