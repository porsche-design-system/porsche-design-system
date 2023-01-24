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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'tag-dismissible', '/#tag-dismissible')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('tag-dismissible-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
        p-tag-dismissible:not(:last-child) { margin-right: 0.5rem; }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-tag-dismissible theme="${theme}">Some Text</p-tag-dismissible>
        <p-tag-dismissible theme="${theme}" label="Some Label" color="background-default">Some Text</p-tag-dismissible>
        <p-tag-dismissible theme="${theme}" label="Some Label" color="background-surface">Some Text</p-tag-dismissible>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-tag-dismissible >>> button');
      await forceFocusState(page, '.focus p-tag-dismissible'); // native outline should not be visible
      await forceFocusState(page, '.focus p-tag-dismissible >>> button');
      await forceFocusHoverState(page, '.focus-hover p-tag-dismissible >>> button');
    })
  ).toBeFalsy();
});
