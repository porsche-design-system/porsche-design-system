import type { GetThemedMarkup } from '../helpers';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'tabs-bar', '/#tabs-bar')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('tabs-bar-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
        body { display: grid; grid-template-columns: repeat(2, 50%); }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-tabs-bar theme="${theme}" active-tab-index="1">
          <button type="button" id="tab-item-0" aria-controls="tab-panel-0">Button Tab One</button>
          <button type="button" id="tab-item-1" aria-controls="tab-panel-1">Button Tab Two</button>
          <button type="button" id="tab-item-2" aria-controls="tab-panel-2">Button Tab Three</button>
        </p-tabs-bar>
        <div id="tab-panel-0" role="tabpanel" hidden tabindex="-1" aria-labelledby="tab-item-0">
          <p-text>Your content of Tab 1</p-text>
        </div>
        <div id="tab-panel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-item-1">
          <p-text>Your content of Tab 2</p-text>
        </div>
        <div id="tab-panel-2" role="tabpanel" hidden tabindex="-1" aria-labelledby="tab-item-2">
          <p-text>Your content of Tab 3</p-text>
        </div>
        <p-tabs-bar theme="${theme}" active-tab-index="1">
          <a href="#">Anchor Tab One</a>
          <a href="#">Anchor Tab Two</a>
          <a href="#">Anchor Tab Three</a>
        </p-tabs-bar>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-tabs-bar button');
      await forceHoverState(page, '.hover p-tabs-bar a');
      await forceFocusState(page, '.focus p-tabs-bar button');
      await forceFocusState(page, '.focus p-tabs-bar ~ [tabindex="0"][role="tabpanel"]');
      await forceFocusState(page, '.focus p-tabs-bar a');
      await forceFocusHoverState(page, '.focus-hover p-tabs-bar button');
      await forceFocusHoverState(page, '.focus-hover p-tabs-bar a');
    })
  ).toBeFalsy();
});
