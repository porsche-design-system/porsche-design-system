import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Story', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'story',
        async () => {
          await vrt.goTo('/#/web/components/navigation/pagination#code');
          await vrt.click('.playground:nth-of-type(1) > .tabs p-text:nth-of-type(2) button');
        },
        '#app > .content > .main > .router-view'
      )
    ).toBeFalsy();
  });
});
