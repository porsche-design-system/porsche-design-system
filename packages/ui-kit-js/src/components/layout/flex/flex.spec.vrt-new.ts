import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../tests/vrt/helpers/setup';

describe('Component Flex', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('component-flex', async () => {
        await visualRegressionTester.goTo('/src/components/layout/flex/flex.test.html');
      })
    ).toBeFalsy();
  });
});
