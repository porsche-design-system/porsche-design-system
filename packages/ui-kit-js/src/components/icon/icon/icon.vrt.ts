import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../tests/vrt/helpers/setup';

describe('Icon', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('icon', async () => {
        await visualRegressionTester.goTo('/src/components/icon/icon/icon.test.html');
      })
    ).toBeFalsy();
  });
});
