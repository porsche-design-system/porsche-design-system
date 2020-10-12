import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Modal', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'modal-basic',
        async () => {
          await vrt.goTo('/#modal-basic');
        },
        testOptions
      )
    ).toBeFalsy();

    expect(
      await vrt.test(
        'modal-footer',
        async () => {
          await vrt.goTo('/#modal-footer');
        },
        testOptions
      )
    ).toBeFalsy();

    expect(
      await vrt.test(
        'modal-scrollable',
        async () => {
          await vrt.goTo('/#modal-scrollable');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
