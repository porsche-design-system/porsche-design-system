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

describe('Link', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link',
        async () => {
          await vrt.goTo('/#link');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('link-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">p-link:not(:last-child) { margin-right: 0.5rem; }</style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-link theme="${theme}" variant="primary" href="#">Primary</p-link>
          <p-link theme="${theme}" variant="secondary" href="#">Secondary</p-link>
          <p-link theme="${theme}">
            <a href="#">Slotted</a>
          </p-link>
          <p-link theme="${theme}" variant="tertiary" href="#">Tertiary</p-link>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-link >>> a');
        await forceHoveredState(page, '.hovered > p-link >>> span');
        await forceFocusedState(page, '.focused > p-link >>> a');
        await forceFocusedState(page, '.focused > p-link >>> span');
        await forceFocusedHoveredState(page, '.focused-hovered > p-link >>> a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-link >>> span');
      })
    ).toBeFalsy();
  });
});
