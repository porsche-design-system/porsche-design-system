import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Flex', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('flex', async () => {
        await visualRegressionTester.goTo('/src/components/layout/flex/flex.test.html');
      })
    ).toBeFalsy();
  });
});
