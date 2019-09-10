import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { VisualRegressionTesterBs } from '@porsche-ui/visual-regression-tester-bs';
import { getVisualRegressionOverviewTester, getVisualRegressionTesterBs } from '../helpers/setup';

describe('Components Overview', () => {
  let vrt: VisualRegressionTester;
  let vrtBs: VisualRegressionTesterBs;

  beforeAll(async () => {
    vrt = await getVisualRegressionOverviewTester();
    vrtBs = await getVisualRegressionTesterBs();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('overview', async () => {
        await vrt.goTo('/index.html');
        await vrt.getPage().addStyleTag({content: ':root { --p-animation-duration__spinner: 0s; }'});
      })
    ).toBeFalsy();
  });

  it('should have no visual regression in IE11', async () => {
    expect(await vrtBs.test('/index.html', 'overview')).toBeFalsy();
  });
});
