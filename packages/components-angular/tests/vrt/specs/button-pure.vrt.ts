import { CSS_TRANSITION_DURATION, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Button Pure', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTester(), 'button-pure', '/button-pure', {
        scenario: (page) => page.waitForTimeout(CSS_TRANSITION_DURATION),
      })
    ).toBeFalsy();
  });
});
