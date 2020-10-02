import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Story', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'story',
        async () => {
          await vrt.goTo('/#/components/pagination#code');
        },
        { elementSelector: '#app > .content > .main > .router-view' }
      )
    ).toBeFalsy();
  });
});
