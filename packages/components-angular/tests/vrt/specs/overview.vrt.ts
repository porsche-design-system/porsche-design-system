import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Overview', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/overview')).toBeFalsy();
  });
});
