import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Text', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'text',
        async () => {
          await vrt.goTo('#text');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
