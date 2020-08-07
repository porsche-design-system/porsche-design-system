import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Markdown', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'markdown',
        async () => {
          await vrt.goTo('/#/markdown');
        },
        { elementSelector: '#app > .content > .main > .router-view' }
      )
    ).toBeFalsy();
  });
});
