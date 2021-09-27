import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

describe('Accordion', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'accordion', '/accordion')).toBeFalsy();
  });
});
