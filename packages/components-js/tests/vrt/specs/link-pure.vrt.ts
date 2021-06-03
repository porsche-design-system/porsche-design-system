import {
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';
import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
} from '../../e2e/helpers';

describe('Link Pure', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link-pure',
        async () => {
          await vrt.goTo('/#link-pure');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('link-pure-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">p-link-pure:not(:last-child) { margin-right: 8px; }</style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-link-pure theme="${theme}" href="#">Some label</p-link-pure>
          <p-link-pure theme="${theme}" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>
          <p-link-pure theme="${theme}"><a href="#">Some label</a></p-link-pure>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-link-pure >>> a');
        await forceHoveredState(page, '.hovered > p-link-pure >>> span');
        await forceFocusedState(page, '.focused > p-link-pure >>> a');
        await forceFocusedState(page, '.focused > p-link-pure >>> span');
        await forceFocusedHoveredState(page, '.focused-hovered > p-link-pure >>> a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-link-pure >>> span');
      })
    ).toBeFalsy();
  });
});
