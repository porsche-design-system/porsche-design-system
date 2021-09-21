import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  getVisualRegressionStatesTester,
  getVisualRegressionContentWrapperTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('Banner', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionContentWrapperTester(), 'banner', '/#banner')).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('banner-states', async () => {
        const page = vrt.getPage();

        const head = `
          <style type="text/css">
            .playground { padding: 50px 0; }
            .playground p-banner { --p-banner-position-type: static; }
          </style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-banner state="neutral" theme="${theme}">
            <span slot="title">Some banner title</span>
            <span slot="description">Some banner description. You can also add inline <a href="#">links</a> to route to another page.</span>
          </p-banner>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-banner span a');
        await forceFocusedState(page, '.focused > p-banner span a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-banner span a');
      })
    ).toBeFalsy();
  });
});
