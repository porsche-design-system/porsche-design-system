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

        const head = `<style type="text/css">
          p-link-pure:not(:last-child) { margin-right: 0.5rem; }
          div div:not(:first-of-type) { margin-top: 0.5rem; }
        </style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <div>
            <p-link-pure theme="${theme}" href="#">Label default</p-link-pure>
            <p-link-pure theme="${theme}"><a href="#">Label slotted</a></p-link-pure>
            <p-link-pure theme="${theme}" href="#">Label default <p slot="subline">Some Subline</p></p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" align-label="left" href="#">Label align left</p-link-pure>
            <p-link-pure theme="${theme}" align-label="left"><a href="#">Label slotted align left</a></p-link-pure>
            <p-link-pure theme="${theme}" align-label="left" icon="logoDelicious" href="#">Label align left</p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" hide-label="true" href="#">Without label</p-link-pure>
            <p-link-pure theme="${theme}" hide-label="true"><a href="#">Without label slotted</a></p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" active="true" href="#">Label active</p-link-pure>
            <p-link-pure theme="${theme}" active="true"><a href="#">Label slotted active</a></p-link-pure>
            <p-link-pure theme="${theme}" active="true" href="#">Label active <p slot="subline">Some subline</p></p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" icon="none" href="#">Label icon none</p-link-pure>
            <p-link-pure theme="${theme}" icon="none"><a href="#">Label slotted icon none</a></p-link-pure>
            <p-link-pure theme="${theme}" icon="none" href="#">Label icon none<p slot="subline">Some slightly longer subline</p></p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" style="padding: 1rem" href="#">Label custom click-area</p-link-pure>
            <p-link-pure theme="${theme}" style="padding: 1rem" hide-label="true" href="#">Label custom click-area</p-link-pure>
            <p-link-pure theme="${theme}" style="padding: 1rem"><a href="#">Label slotted custom click-area</a></p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" theme="${theme}" stretch="true" href="#">Label stretch</p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" theme="${theme}" stretch="true"><a href="#">Label slotted stretch</a></p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" align-label="left" stretch="true" href="#">Label stretch align left</p-link-pure>
          </div>
          <div>
            <p-link-pure theme="${theme}" align-label="left" stretch="true"><a href="#">Label slotted stretch align left</a></p-link-pure>
          </div>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered p-link-pure >>> a');
        await forceHoveredState(page, '.hovered p-link-pure >>> span');
        await forceFocusedState(page, '.focused p-link-pure >>> a');
        await forceFocusedState(page, '.focused p-link-pure >>> span');
        await forceFocusedHoveredState(page, '.focused-hovered p-link-pure >>> a');
        await forceFocusedHoveredState(page, '.focused-hovered p-link-pure >>> span');
      })
    ).toBeFalsy();
  });
});
