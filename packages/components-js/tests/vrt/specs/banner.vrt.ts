import { getVisualRegressionContentWrapperTester, getVisualRegressionStatesTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getBody,
  GetElements,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

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

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('banner-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">
            .playground { padding: 100px 0; }
            .playground p-banner {  --p-banner-position-type: static;}
          </style>`;

        const getElements: GetElements = () => `
          <p-banner state="neutral">
            <span slot="title">Some banner title</span>
            <span slot="description">Some banner description. You can also add inline <a>links</a> to route to another page.</span>
          </p-banner>`;

        await setContentWithDesignSystem(page, getBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-banner span a');
        await forceFocused(page, '.focused > p-banner span a');
        await forceFocusedHovered(page, '.focused-hovered > p-banner span a');
      })
    ).toBeFalsy();
  });
});
