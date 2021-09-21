import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Radio Button Wrapper', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'radio-button-wrapper', '/radio-button-wrapper')).toBeFalsy();
  });
});
