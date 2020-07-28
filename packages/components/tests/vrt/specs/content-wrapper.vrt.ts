import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionContentWrapperTester } from '../helpers/setup';

describe('Content Wrapper', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionContentWrapperTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('content-wrapper', async () => {
        await vrt.goTo('/src/components/layout/content-wrapper/content-wrapper.test.html');
      })
    ).toBeFalsy();
  });
});
