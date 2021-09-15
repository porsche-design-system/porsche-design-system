import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Button Pure', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'button-pure', '/button-pure')).toBeFalsy();
  });
});
