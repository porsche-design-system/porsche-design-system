import { CSS_TRANSITION_DURATION, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Link Pure', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTester(), 'link-pure', '/link-pure', {
        scenario: (page) => page.waitForTimeout(CSS_TRANSITION_DURATION),
      })
    ).toBeFalsy();
  });
});
