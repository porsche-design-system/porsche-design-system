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

describe('Button Pure', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'button-pure',
        async () => {
          await vrt.goTo('/#button-pure');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('button-pure-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">p-button-pure:not(:last-child) { margin-right: 8px; }</style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-button-pure theme="${theme}">Some label</p-button-pure>
          <p-button-pure theme="${theme}" disabled="true">Disabled</p-button-pure>
          <p-button-pure theme="${theme}" loading="true">Loading</p-button-pure>
          <p-button-pure theme="${theme}">Some label <p slot="subline">Some Subline</p></p-button-pure>
          <p-button-pure theme="${theme}" disabled="true">Disabled <p slot="subline">Some Subline</p></p-button-pure>
          <p-button-pure theme="${theme}" loading="true">Loading <p slot="subline">Some Subline</p></p-button-pure>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-button-pure >>> button');
        await forceFocusedState(page, '.focused > p-button-pure >>> button');
        await forceFocusedHoveredState(page, '.focused-hovered > p-button-pure >>> button');
      })
    ).toBeFalsy();
  });
});
