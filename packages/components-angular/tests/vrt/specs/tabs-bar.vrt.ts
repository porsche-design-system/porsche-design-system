import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Tabs Bar', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'tabs-bar', '/tabs-bar')).toBeFalsy();
  });
});
