import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { getVisualRegressionStatesTester } from 'shared/src/testing/vrt';
import type { GetMarkup } from '../helpers';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
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

      const getElementsMarkup: GetMarkup = () => `
      <p-tag-dismissible>Some Text</p-tag-dismissible>
      <p-tag-dismissible label="Some Label" color="default">Some Text</p-tag-dismissible>
      <p-tag-dismissible label="Some Label" color="background-surface">Some Text</p-tag-dismissible>
      <p-tag-dismissible label="Some Label" color="neutral-contrast-high">Some Text</p-tag-dismissible>
      `;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-tag-dismissible >>> button');
      await forceFocusState(page, '.focus p-tag-dismissible >>> button');
      await forceFocusHoverState(page, '.focus-hover p-tag-dismissible >>> button');
    })
  ).toBeFalsy();
});
