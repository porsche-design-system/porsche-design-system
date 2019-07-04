import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../../../vrt/helpers/setup';

describe('Component Icon', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('component-icon', async () => {
        await visualRegressionTester.goTo('/#/vrt/icon/icon');
      })
    ).toBeFalsy();
  });
});
