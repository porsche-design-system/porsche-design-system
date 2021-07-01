import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Table', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'table',
        async () => {
          await vrt.goTo('/table');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
