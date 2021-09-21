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
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('Tabs Bar', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'tabs-bar', '/#tabs-bar')).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('tabs-bar-states', async () => {
        const page = vrt.getPage();

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-tabs-bar theme="${theme}" active-tab-index="1">
            <button type="button">Button Tab One</button>
            <button type="button">Button Tab Two</button>
            <button type="button">Button Tab Three</button>
          </p-tabs-bar>
          <p-tabs-bar theme="${theme}" active-tab-index="1">
            <a href="#">Anchor Tab One</a>
            <a href="#">Anchor Tab Two</a>
            <a href="#">Anchor Tab Three</a>
          </p-tabs-bar>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

        await forceHoveredState(page, '.hovered > p-tabs-bar button');
        await forceHoveredState(page, '.hovered > p-tabs-bar a');
        await forceFocusedState(page, '.focused > p-tabs-bar button');
        await forceFocusedState(page, '.focused > p-tabs-bar a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-tabs-bar button');
        await forceFocusedHoveredState(page, '.focused-hovered > p-tabs-bar a');
      })
    ).toBeFalsy();
  });
});
