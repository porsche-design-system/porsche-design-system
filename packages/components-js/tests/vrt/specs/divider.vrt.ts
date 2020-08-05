import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Divider', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'divider',
        async () => {
          await vrt.goTo('/#divider');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
