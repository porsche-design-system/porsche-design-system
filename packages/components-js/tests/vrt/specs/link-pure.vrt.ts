import { getVisualRegressionTester, testOptions } from '../helpers';

fdescribe('Link Pure', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link-pure',
        async () => {
          await vrt.goTo('/#link-pure');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression with breakpoint customizable', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link-pure-breakpoint-customizable',
        async () => {
          await vrt.goTo('/#link-pure-breakpoint-customizable');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
