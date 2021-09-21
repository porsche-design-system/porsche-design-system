import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Text List', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'text-list', '/text-list')).toBeFalsy();
  });
});
