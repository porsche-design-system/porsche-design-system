import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Switch', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionOverviewTester(), 'switch', '/switch')).toBeFalsy();
  });
});
