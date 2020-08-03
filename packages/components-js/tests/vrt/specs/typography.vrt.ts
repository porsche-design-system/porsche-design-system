import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionOverviewTester, testOptions } from '../helpers';

describe('Typography', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionOverviewTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'typography',
        async () => {
          await vrt.goTo('#typography');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
