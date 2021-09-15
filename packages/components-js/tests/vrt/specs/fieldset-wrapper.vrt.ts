import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Fieldset Wrapper', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'fieldset-wrapper', '/#fieldset-wrapper')).toBeFalsy();
  });
});
