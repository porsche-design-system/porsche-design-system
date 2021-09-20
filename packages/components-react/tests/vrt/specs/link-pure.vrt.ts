import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Link Pure', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'link-pure', '/link-pure')).toBeFalsy();
  });
});
