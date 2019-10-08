import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Button Icon', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    try {
      expect(
        await vrt.test('button-icon', async () => {
          console.log('-------------------------------------> 1');
          try {
            console.log('-------------------------------------> 2');
            await vrt.goTo('/src/components/action/button-icon/button-icon.test.html');
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
