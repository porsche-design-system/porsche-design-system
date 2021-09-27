import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Pagination', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'pagination', '/pagination')).toBeFalsy();
  });
});
