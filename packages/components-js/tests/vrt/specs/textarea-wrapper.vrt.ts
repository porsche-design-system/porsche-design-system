import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Textarea Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'textarea-wrapper',
        async () => {
          await vrt.goTo('/#textarea-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
