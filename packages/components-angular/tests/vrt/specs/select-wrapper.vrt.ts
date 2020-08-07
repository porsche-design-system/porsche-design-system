import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Select Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'select-wrapper',
        async () => {
          await vrt.goTo('/select-wrapper');
          await vrt.focus('#test-focus-state');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
