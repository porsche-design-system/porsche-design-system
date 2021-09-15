import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Select Wrapper', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTester(), 'select-wrapper', '/select-wrapper', (page) =>
        page.click('#open-options')
      )
    ).toBeFalsy();
  });
});
