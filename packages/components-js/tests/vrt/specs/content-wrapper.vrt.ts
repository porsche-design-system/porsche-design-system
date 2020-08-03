import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionContentWrapperTester, testOptions } from '../helpers';

describe('Content Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionContentWrapperTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'content-wrapper',
        async () => {
          await vrt.goTo('#content-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
