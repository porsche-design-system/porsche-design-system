import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('js-variables', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionStatesTester(), 'variables', '/#/js-variables', { regressionSuffix: 'js' })
    ).toBeFalsy();
  });
});
