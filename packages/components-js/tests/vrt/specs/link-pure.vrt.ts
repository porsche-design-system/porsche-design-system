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
          <p-link-pure theme="${theme}" href="#">Label default</p-link-pure>
          <p-link-pure theme="${theme}" href="#">Label default <p slot="subline">Some Subline</p></p-link-pure>
          <p-link-pure theme="${theme}"><a href="#">Label slotted</a></p-link-pure>
           <p-link-pure theme="${theme}" align-label="left">Label aligned left</p-link-pure>
          <br/>
          <br/>
          <p-link-pure theme="${theme}" stretch="true">Label stretched</p-link-pure>
          <br/>
          <p-link-pure theme="${theme}" align-label="left" stretch="true">Label aligned left stretched</p-link-pure>
          <br/>
          <p-link-pure theme="${theme}" icon="none">Label without Icon</p-link-pure>
          <p-link-pure theme="${theme}" icon="none">Label without Icon <p slot="subline">Some Subline</p></p-link-pure>`;

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
