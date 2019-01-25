import 'jasmine';
import { VisualRegressionTester } from '@porsche/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../../vrt/helpers/setup';

describe('Flex', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('flex~complete', async () => {
      await visualRegressionTester.goTo('/04-layout-flex-flex/04-layout-flex-flex.rendered.html');
    })).toBeFalsy();
  });
});
