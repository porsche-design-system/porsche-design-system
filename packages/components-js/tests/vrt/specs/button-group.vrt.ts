import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Button Group', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'button-group', '/#button-group')).toBeFalsy();
  });
});
