import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Checkbox Wrapper', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'checkbox-wrapper', '/checkbox-wrapper')).toBeFalsy();
  });
});
