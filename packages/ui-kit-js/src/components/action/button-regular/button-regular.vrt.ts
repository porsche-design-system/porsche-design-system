import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../tests/vrt/helpers/setup';

describe('Button Regular', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('button-regular', async () => {
        await visualRegressionTester.goTo('/src/components/action/button-regular/button-regular.test.html');
      })
    ).toBeFalsy();
  });
});
