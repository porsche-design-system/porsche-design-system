import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Home', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTester(), 'home', '/', {
        maskSelectors: ['.sidebar header p-text[size="x-small"]'],
      })
    ).toBeFalsy();
  });
});
