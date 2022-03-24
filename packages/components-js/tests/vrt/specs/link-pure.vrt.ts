import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  itSkipSkeletons,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'link-pure', '/#link-pure')).toBeFalsy();
});

itSkipSkeletons('should have no visual regression for skeleton', async () => {
  expect(await vrtTest(getVisualRegressionSkeletonTester(), 'link-pure-skeleton', '/#link-pure-skeleton')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('link-pure-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
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

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric', 'dark-electric'] }),
        { injectIntoHead: head }
      );

      await forceHoverState(page, '.hover p-link-pure[href] >>> a');
      await forceHoverState(page, '.hover p-link-pure:not([href]) >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceHoverState(page, '.hover p-link-pure:not([href]) a'); // TODO: chrome hover bug. Remove when fixed.
      await forceFocusState(page, '.focus p-link-pure'); // native outline should not be visible
      await forceFocusState(page, '.focus p-link-pure[href] >>> a');
      await forceFocusState(page, '.focus:not([href]) p-link-pure a');
      await forceFocusHoverState(page, '.focus-hover p-link-pure[href] >>> a');
      await forceFocusState(page, '.focus-hover p-link-pure:not([href]) a');
      await forceHoverState(page, '.focus-hover p-link-pure:not([href]) a'); // TODO: chrome hover bug. Remove when fixed.
      await forceHoverState(page, '.focus-hover p-link-pure:not([href]) >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
    })
  ).toBeFalsy();
});
