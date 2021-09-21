import { getVisualRegressionContentWrapperTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Banner', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionContentWrapperTester(), 'banner', '/banner')).toBeFalsy();
  });
});
