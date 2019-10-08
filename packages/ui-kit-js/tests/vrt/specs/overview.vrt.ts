import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionOverviewTester } from '../helpers/setup';

describe('Components Overview', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionOverviewTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('overview', async () => {
        await vrt.goTo('/index.html');
      })
    ).toBeFalsy();
  });

});
