import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../../tests/vrt/helpers/setup';

describe('Headline', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('headline', async () => {
        await visualRegressionTester.goTo('/src/components/basic/typography/headline/headline.test.html');
      })
    ).toBeFalsy();
  });
});
