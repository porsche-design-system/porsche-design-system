import { getVisualRegressionContentWrapperTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Content Wrapper', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionContentWrapperTester(), 'content-wrapper', '/content-wrapper')).toBeFalsy();
  });
});
