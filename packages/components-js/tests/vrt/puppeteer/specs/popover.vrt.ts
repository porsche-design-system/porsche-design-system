import { getVisualRegressionStatesTester, openPopoversAndHighlightSpacer } from '@porsche-design-system/shared/testing';
import type { GetThemedMarkup } from '../helpers';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('popover-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
          .playground { height: 100px; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-popover theme="${theme}" direction="right">
          Slotted Content
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-popover>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });
      await openPopoversAndHighlightSpacer(page);

      await forceHoverState(page, '.hover p-popover >>> button');
      await forceHoverState(page, '.hover p-popover > a');
      await forceHoverState(page, '.hover p-popover a');
      await forceFocusState(page, '.focus p-popover >>> button');
      await forceFocusState(page, '.focus p-popover > a');
      await forceFocusState(page, '.focus p-popover a');
      await forceFocusHoverState(page, '.focus-hover p-popover >>> button');
      await forceFocusHoverState(page, '.focus-hover p-popover > a');
      await forceFocusHoverState(page, '.focus-hover p-popover a');
    })
  ).toBeFalsy();
});
