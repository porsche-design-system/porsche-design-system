import 'jasmine';
import {VisualRegressionTester} from '@porscheui/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Story', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test(
        'story',
        async () => {
          await visualRegressionTester.goTo('/#/web/components/navigation/pagination#code');
          await visualRegressionTester.click('.playground:nth-of-type(1) > .tabs p-text:nth-of-type(2) button');
        },
        '#app > .content > .main > .router-view'
      )
    ).toBeFalsy();
  });
});
