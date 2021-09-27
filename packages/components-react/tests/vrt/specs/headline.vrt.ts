import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Headline', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'headline', '/headline')).toBeFalsy();
  });
});
