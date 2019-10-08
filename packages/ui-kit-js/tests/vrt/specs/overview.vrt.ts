import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionOverviewTester} from '../helpers/setup';

describe('Components Overview', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionOverviewTester();
  });

  it('should have no visual regression', async () => {
    try {
      expect(
        await vrt.test('overview', async () => {
          try {
            await vrt.goTo('/index.html');
          } catch (e) {
            console.log('####################### ERROR A:', e);
          }
        })
      ).toBeFalsy();
    } catch (e) {
      console.log('####################### ERROR B:', e);
    }
  });

});
