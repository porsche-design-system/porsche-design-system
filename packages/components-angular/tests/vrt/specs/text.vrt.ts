import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Text', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'text', '/text')).toBeFalsy();
  });
});
