import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../tests/vrt/helpers/setup';

describe('Pagination', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('pagination', async () => {
        await visualRegressionTester.goTo('/src/components/navigation/pagination/pagination.test.html');
      })
    ).toBeFalsy();
  });
});
