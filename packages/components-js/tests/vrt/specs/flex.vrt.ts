import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Flex', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'flex', '/#flex')).toBeFalsy();
  });
});
