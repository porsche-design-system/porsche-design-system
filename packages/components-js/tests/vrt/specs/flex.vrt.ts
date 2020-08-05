import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Flex', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'flex',
        async () => {
          await vrt.goTo('#flex');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
