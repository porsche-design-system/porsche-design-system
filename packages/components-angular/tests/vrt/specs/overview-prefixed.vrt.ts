import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers';

describe('Overview Prefixed', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'overview-prefixed',
        async () => {
          await vrt.goTo('/overview-prefixed', 1000);
        },
        { elementSelector: '#app' }
      )
    ).toBeFalsy();
  });
});
