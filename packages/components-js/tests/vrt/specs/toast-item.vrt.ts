import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import { getVisualRegressionStatesTester } from '@porsche-design-system/shared/testing';

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('toast-item-states', async () => {
      const page = vrt.getPage();

      const head = `<style>p-toast-item ~ p-toast-item { margin-top: 0.5rem; }</style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-toast-item theme="${theme}" text="Some message"></p-toast-item>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoveredState(page, '.hovered > p-toast-item >>> p-button-pure >>> button');
      await forceFocusedState(page, '.focused > p-toast-item >>> p-button-pure >>> button');
      await forceFocusedHoveredState(page, '.focused-hovered > p-toast-item >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
