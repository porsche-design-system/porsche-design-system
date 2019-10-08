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
          console.log('-------------------------------------> 1');
          try {
            console.log('-------------------------------------> 2');
            await vrt.goTo('/index.html');
            console.log('-------------------------------------> 3');
          } catch (e) {
            console.log('####################### ERROR A:', e);
          }
          console.log('-------------------------------------> 4');
        })
      ).toBeFalsy();
    } catch (e) {
      console.log('####################### ERROR B:', e);
    }
  });

});
