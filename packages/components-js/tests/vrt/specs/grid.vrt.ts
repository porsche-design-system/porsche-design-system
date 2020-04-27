import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionGridTester } from '../helpers/setup';

describe('Grid', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionGridTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('grid', async () => {
        await vrt.goTo('/src/components/layout/grid/grid.test.html');
      })
    ).toBeFalsy();
  });
});
