import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Table', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'table', '/table')).toBeFalsy();
  });
});
