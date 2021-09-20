import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Textarea Wrapper', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'textarea-wrapper', '/textarea-wrapper')).toBeFalsy();
  });
});
