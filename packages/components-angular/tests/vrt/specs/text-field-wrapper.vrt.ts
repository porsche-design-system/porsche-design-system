import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Text Field Wrapper', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'text-field-wrapper', '/text-field-wrapper')).toBeFalsy();
  });
});
