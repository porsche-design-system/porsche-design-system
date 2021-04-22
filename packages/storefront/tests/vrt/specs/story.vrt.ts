import { getVisualRegressionTester } from '../helpers/setup';

describe('Story', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'story',
        async () => {
          await vrt.goTo('/components/pagination#code');
          await vrt.click('.playground:nth-of-type(1) > p-tabs-bar > button:nth-of-type(2)');
        },
        { elementSelector: '#app > .main > .router-view' }
      )
    ).toBeFalsy();
  });
});
