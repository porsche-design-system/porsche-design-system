import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Divider', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'divider', '/#divider')).toBeFalsy();
  });
});
