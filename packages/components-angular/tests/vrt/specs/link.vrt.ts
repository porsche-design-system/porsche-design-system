import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Link', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'link', '/link')).toBeFalsy();
  });
});
