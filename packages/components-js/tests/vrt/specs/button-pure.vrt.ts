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

        const head = `<style type="text/css">p-button-pure:not(:last-child) { margin-right: 0.5rem; } .spacing-top { margin-top: 0.5rem }</style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-button-pure theme="${theme}">Label default</p-button-pure>
          <p-button-pure theme="${theme}" loading="true">Label loading</p-button-pure>
          <p-button-pure theme="${theme}">Label default <p slot="subline">Some Subline</p></p-button-pure>
          <p-button-pure theme="${theme}" loading="true">Label loading <p slot="subline">Some Subline</p></p-button-pure>
          <p-button-pure theme="${theme}" align-label="left">Label aligned left</p-button-pure>
          <p-button-pure theme="${theme}" align-label="left" icon="logoDelicious">Label aligned left</p-button-pure>
          <div class="spacing-top">
            <p-button-pure theme="${theme}" icon="none">Label without Icon</p-button-pure>
            <p-button-pure theme="${theme}" icon="none">Label without Icon <p slot="subline">Some slightly longer subline</p></p-button-pure>
          </div>
          <div class="spacing-top">
            <p-button-pure theme="${theme}" stretch="true">Label stretched</p-button-pure>
          </div>
          <div class="spacing-top">
            <p-button-pure theme="${theme}" align-label="left" stretch="true">Label aligned left stretched</p-button-pure>
          </div>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered p-button-pure >>> button');
        await forceFocusedState(page, '.focused p-button-pure >>> button');
        await forceFocusedHoveredState(page, '.focused-hovered p-button-pure >>> button');
      })
    ).toBeFalsy();
  });
});
