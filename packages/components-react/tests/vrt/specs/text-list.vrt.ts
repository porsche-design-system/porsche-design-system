import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Text List', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'text-list',
        async () => {
          await vrt.goTo('/text-list');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
