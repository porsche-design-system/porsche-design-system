import { getVisualRegressionContentWrapperTester, testOptions } from '../helpers';
import { selectNode } from '../../e2e/helpers';

describe('Banner', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionContentWrapperTester();
    expect(
      await vrt.test(
        'banner',
        async () => {
          await vrt.goTo('/#banner');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression closing behaviour', async () => {
    const vrt = getVisualRegressionContentWrapperTester();
    expect(
      await vrt.test(
        'banner-behaviour',
        async () => {
          await vrt.goTo('/#banner-behaviour');
          const page = await vrt.getPage();

          const closeButton = await selectNode(page, '#banner-close >>> p-button-pure');
          await closeButton.click();
          await page.waitForTimeout(700);
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
