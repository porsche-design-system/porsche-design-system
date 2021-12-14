import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
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

      await forceHoverState(page, '.hover > p-toast-item >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus > p-toast-item >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover > p-toast-item >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
