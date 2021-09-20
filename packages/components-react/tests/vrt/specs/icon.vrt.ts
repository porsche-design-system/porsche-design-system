import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Icon', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'icon', '/icon')).toBeFalsy();
  });
});
