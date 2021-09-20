import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Spinner', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'spinner', '/#spinner')).toBeFalsy();
  });
});
