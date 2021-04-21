import { getVisualRegressionTester, testOptions } from '../helpers';

fdescribe('Switch', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'switch',
        async () => {
          await vrt.goTo('/#switch');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
