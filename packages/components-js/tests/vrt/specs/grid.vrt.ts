import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Grid', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'grid', '/#grid')).toBeFalsy();
  });
});
