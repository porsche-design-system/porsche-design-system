import { getVisualRegressionTester } from '../helpers/setup';

describe('Markdown', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'markdown',
        async () => {
          await vrt.goTo('/markdown');
        },
        { elementSelector: '#app > .main > .router-view' }
      )
    ).toBeFalsy();
  });
});
