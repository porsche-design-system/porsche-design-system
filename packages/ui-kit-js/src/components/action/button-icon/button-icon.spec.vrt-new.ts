import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../tests/vrt/helpers/setup';

describe('Component Button Icon', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('component-button-icon', async () => {
        await visualRegressionTester.goTo('/src/components/action/button-icon/button-icon.test.html');
      })
    ).toBeFalsy();
  });
});
