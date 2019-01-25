import 'jasmine';
import { VisualRegressionTester } from '@porsche/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../../vrt/helpers/setup';

describe('Grid', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('grid~complete', async () => {
      await visualRegressionTester.goTo('/04-layout-grid-grid/04-layout-grid-grid.rendered.html');
    })).toBeFalsy();
  });
});
