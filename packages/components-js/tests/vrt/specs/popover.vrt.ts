import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared-src/src/testing/vrt';
import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import type { GetMarkup } from '../helpers';
import { openPopoversAndHighlightSpacer } from '@porsche-design-system/shared/testing';
import { PopoverDirection } from '@porsche-design-system/components/src/components/feedback/popover/popover-utils';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'popover', '/#popover', {
      scenario: (page) => openPopoversAndHighlightSpacer(page),
    })
  ).toBeFalsy();
});

it('should have no visual regression on popover-overview for viewport 1760', async () => {
  const vrt = getVisualRegressionTester(1760);
  expect(
    await vrt.test('popover-overview', async () => {
      const page = vrt.getPage();

      const getPopover = (direction: PopoverDirection, length: number = 1): string => {
        return `<p-popover direction=${direction}>
    ${Array.from(Array(length))
      .map(() => `<div>Direction ${direction}</div>`)
      .join('\n')}
</p-popover>`;
      };

      await setContentWithDesignSystem(
        page,
        `<div style="position: relative; height: 800px; outline: 1rem solid rgba(0, 0, 255, 0.1); outline-offset: -1rem">
  <!--   Top Left to right   -->
  <span style="position: absolute; top: 1.5rem; left: 1rem">
   ${getPopover('right', 3)}
  </span>
  <span style="position: absolute; top: 2rem; left: 15rem">
   ${getPopover('right', 3)}
  </span>
  <span style="position: absolute; top: 3rem; left: 30rem">
   ${getPopover('right', 3)}
  </span>
  <!--   Bottom Left to right   -->
  <span style="position: absolute; bottom: 1.5rem; left: 1rem">
   ${getPopover('right', 3)}
  </span>
  <span style="position: absolute; bottom: 2rem; left: 15rem">
   ${getPopover('right', 3)}
  </span>
  <span style="position: absolute; bottom: 3rem; left: 30rem">
   ${getPopover('right', 3)}
  </span>
  <!--   Top  Right to left   -->
  <span style="position: absolute; top: 1.5rem; right: 1rem">
   ${getPopover('left', 3)}
  </span>
  <span style="position: absolute; top: 2rem; right: 15rem">
   ${getPopover('left', 3)}
  </span>
  <span style="position: absolute; top: 3rem; right: 30rem">
   ${getPopover('left', 3)}
  </span>
  <!--   Bottom  Right to left   -->
  <span style="position: absolute; bottom: 1.5rem; right: 1rem">
   ${getPopover('left', 3)}
  </span>
  <span style="position: absolute; bottom: 2rem; right: 15rem">
   ${getPopover('left', 3)}
  </span>
  <span style="position: absolute; bottom: 3rem; right: 30rem">
   ${getPopover('left', 3)}
  </span>
  <!--    Top Center-->
  <span style="position: absolute; top: 4.5rem; right: 50rem">
   ${getPopover('top')}
  </span>
  <span style="position: absolute; top: 4rem; right: 65rem">
   ${getPopover('top')}
  </span>
  <!--    Bottom Center-->
  <span style="position: absolute; bottom: 4.5rem; right: 50rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; bottom: 4rem; right: 65rem">
   ${getPopover('bottom')}
  </span>
  <!--    Left Center-->
  <span style="position: absolute; top: 10rem; left: 10rem">
   ${getPopover('left')}
  </span>
  <span style="position: absolute; top: 15rem; left: 9rem">
   ${getPopover('left')}
  </span>
  <!--    Right Center-->
  <span style="position: absolute; top: 10rem; right: 10.5rem">
   ${getPopover('right')}
  </span>
  <span style="position: absolute; top: 15rem; right: 9rem">
   ${getPopover('right')}
  </span>

  <!--    x-axis left -->
  <span style="position: absolute; top: 20rem; left: 1.5rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; top: 25rem; left: 2rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; top: 35rem; left: 4rem">
   ${getPopover('bottom')}
  </span>
  <!--    x-axis right -->
  <span style="position: absolute; top: 20rem; right: 1.5rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; top: 25rem; right: 2rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; top: 35rem; right: 4rem">
   ${getPopover('bottom')}
  </span>

  <!--   Center  -->
  <span style="position: absolute; top: 40vh; right: 50vw">
    <p-popover>
      <div>Direction bottom</div>
      <div>to overlap</div>
      <div>next popover</div>
    </p-popover>
  </span>
  <span style="position: absolute; top: 50vh; right: 50vw">
   ${getPopover('bottom')}
  </span>
</div>
      `
      );
      await openPopoversAndHighlightSpacer(page, { withBackground: true });
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('popover-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetMarkup = () => `
        <p-popover>Some content with a <a>link</a></p-popover>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup));
      await openPopoversAndHighlightSpacer(page);

      await forceHoveredState(page, '.hovered > p-popover >>> p-button-pure >>> button');
      await forceHoveredState(page, '.hovered > p-popover > a');
      await forceFocusedState(page, '.focused > p-popover >>> p-button-pure >>> button');
      await forceFocusedState(page, '.focused > p-popover > a');
      await forceFocusedHoveredState(page, '.focused-hovered > p-popover >>> p-button-pure >>> button');
      await forceFocusedHoveredState(page, '.focused-hovered > p-popover > a');
    })
  ).toBeFalsy();
});
