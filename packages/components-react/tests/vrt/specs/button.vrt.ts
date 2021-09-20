import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Button', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'button', '/button')).toBeFalsy();
  });
});
