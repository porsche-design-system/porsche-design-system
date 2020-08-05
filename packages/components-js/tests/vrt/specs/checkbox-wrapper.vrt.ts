import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Checkbox Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'checkbox-wrapper',
        async () => {
          await vrt.goTo('/#checkbox-wrapper');
          await vrt.focus('#test-focus-state');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
