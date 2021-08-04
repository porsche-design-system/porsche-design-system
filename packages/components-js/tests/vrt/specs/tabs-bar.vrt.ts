import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

describe('Tabs Bar', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'tabs-bar',
        async () => {
          await vrt.goTo('/#text'); // to ensure fonts are already loaded before js is initialized
          await vrt.goTo('/#tabs-bar');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('tabs-bar-states', async () => {
        const page = await vrt.getPage();

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
