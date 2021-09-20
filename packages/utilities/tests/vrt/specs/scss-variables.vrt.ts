import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('scss-variables', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionStatesTester(), 'variables', '/#/scss-variables', { regressionSuffix: 'scss' })
    ).toBeFalsy();
  });
});
