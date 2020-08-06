import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Button', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'button',
        async () => {
          await vrt.goTo('/button');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
