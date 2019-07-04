import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../../../vrt/helpers/setup';

describe('Component Typography', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('component-typography', async () => {
        await visualRegressionTester.goTo('/#/vrt/basic/typography');
      })
    ).toBeFalsy();
  });
});
