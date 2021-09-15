import { CSS_TRANSITION_DURATION, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Select Wrapper', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTester(), 'select-wrapper', '/select-wrapper', {
        scenario: async (page) => {
          await page.click('#open-options');
          await page.evaluate(() => (window as any).componentsReady());
          await page.waitForTimeout(CSS_TRANSITION_DURATION);
        },
      })
    ).toBeFalsy();
  });
});
