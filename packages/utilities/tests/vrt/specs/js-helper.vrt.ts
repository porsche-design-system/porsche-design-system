import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('js-helper', () => {
  it('should have no visual regression for screen reader only styles', async () => {
    expect(
      await vrtTest(getVisualRegressionStatesTester(), 'helper', '/#/js-helper', { regressionSuffix: 'js' })
    ).toBeFalsy();
  });
});
