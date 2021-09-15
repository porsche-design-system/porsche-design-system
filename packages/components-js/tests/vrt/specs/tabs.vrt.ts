import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Tabs', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'tabs', '/#tabs')).toBeFalsy();
  });
});
