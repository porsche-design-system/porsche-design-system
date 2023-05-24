import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import type { GetThemedMarkup } from '../helpers';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'tabs', '/#tabs')).toBeFalsy();
});

it('should have no visual regression for :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('tabs-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-tabs active-tab-index="0" theme="${theme}">
          <p-tabs-item label="Tab One">
            Slotted content
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </p-tabs-item>
          <p-tabs-item label="Tab Two"></p-tabs-item>
          <p-tabs-item label="Tab Three"></p-tabs-item>
        </p-tabs>
        <p-tabs active-tab-index="2" theme="${theme}">
          <p-tabs-item label="Tab One"></p-tabs-item>
          <p-tabs-item label="Tab Two"></p-tabs-item>
          <p-tabs-item label="Tab Three">
            Slotted content
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </p-tabs-item>
        </p-tabs>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-tabs p-tabs-item a');
      await forceFocusState(page, '.focus p-tabs p-tabs-item');
      await forceFocusState(page, '.focus p-tabs p-tabs-item a');
      await forceFocusHoverState(page, '.focus-hover p-tabs p-tabs-item a');
    })
  ).toBeFalsy();
});
