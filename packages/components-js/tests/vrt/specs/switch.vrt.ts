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

describe('Switch', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'switch',
        async () => {
          await vrt.goTo('/#switch');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('switch-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">p-switch ~ p-switch { margin-top: 0.5rem; }</style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-switch theme="${theme}">Some label</p-switch>
          <p-switch theme="${theme}" checked="true">Some label</p-switch>
          <p-switch theme="${theme}" loading="true">Loading</p-switch>
          <p-switch theme="${theme}" loading="true" checked="true">Loading</p-switch>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-switch >>> button');
        await forceFocusedState(page, '.focused > p-switch >>> button');
        await forceFocusedHoveredState(page, '.focused-hovered > p-switch >>> button');
      })
    ).toBeFalsy();
  });
});
