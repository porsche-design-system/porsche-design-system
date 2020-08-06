import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Text Field Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'text-field-wrapper',
        async () => {
          await vrt.goTo('/text-field-wrapper');
          await vrt.focus('#test-focus-state');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
