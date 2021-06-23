import { getVisualRegressionTester, testOptions } from '../helpers';

describe('Accordion', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'accordion',
        async () => {
          await vrt.goTo('/accordion');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
