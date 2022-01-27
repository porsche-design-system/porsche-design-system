import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import type { GetThemedMarkup } from '../helpers';
import { forceFocusState, getThemedBodyMarkup, setContentWithDesignSystem } from '../helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'tabs', '/#tabs')).toBeFalsy();
});

it('should have no visual regression for :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('tabs-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-tabs theme="${theme}">
          <p-tabs-item label="Tab One">
            <p-text theme="${theme}">Tab Content Two</p-text>
          </p-tabs-item>
          <p-tabs-item label="Tab Two">
            <p-text theme="${theme}">Tab Content Two</p-text>
          </p-tabs-item>
          <p-tabs-item label="Tab Three">
            <p-text theme="${theme}">Tab Content Three</p-text>
          </p-tabs-item>
        </p-tabs>
        <p-tabs active-tab-index="2" theme="${theme}">
          <p-tabs-item label="Tab One">
            <p-text theme="${theme}">Tab Content Two</p-text>
          </p-tabs-item>
          <p-tabs-item label="Tab Two">
            <p-text theme="${theme}">Tab Content Two</p-text>
          </p-tabs-item>
          <p-tabs-item label="Tab Three">
            <p-text theme="${theme}">Tab Content Three</p-text>
          </p-tabs-item>
        </p-tabs>`;

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric'], states: ['focus'] })
      );

      await forceFocusState(page, '.focus > p-tabs p-tabs-item');
    })
  ).toBeFalsy();
});
