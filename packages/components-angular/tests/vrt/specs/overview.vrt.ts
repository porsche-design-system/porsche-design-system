import { getVisualRegressionTester } from '../helpers';

describe('Overview', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'overview',
        async () => {
          await vrt.goTo('/overview');
        },
        { elementSelector: '#app' }
      )
    ).toBeFalsy();
  });
});
