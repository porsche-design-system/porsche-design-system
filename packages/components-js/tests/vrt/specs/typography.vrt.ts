import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Typography', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionOverviewTester(), 'typography', '/#typography')).toBeFalsy();
  });
});
