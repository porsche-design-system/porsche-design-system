import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Link Social', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'link-social', '/link-social')).toBeFalsy();
  });
});
