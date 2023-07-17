import {
  furtherExtendedViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';

it.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'modal', '/#modal', {
      scenario: async (page) => {
        await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal
      },
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('modal-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          .playground {
            height: 300px;
            transform: translate3d(0, 0, 0);
          }
        </style>`;

      const getElementsMarkup: GetMarkup = () => `
        <p-modal open="true">
          <div slot="heading">
            Some slotted heading
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </div>
          Some content
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-modal>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-modal a');
      // due to custom hover state we need to set hover also on component itself
      await forceHoverState(page, '.hover p-modal >>> p-button-pure');
      await forceHoverState(page, '.hover p-modal >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-modal a');
      await forceFocusState(page, '.focus p-modal >>> div');
      await forceFocusState(page, '.focus p-modal >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-modal a');
      await forceFocusHoverState(page, '.focus-hover p-modal >>> div');
      // due to custom hover state we need to set hover also on component itself
      await forceFocusHoverState(page, '.focus-hover p-modal >>> p-button-pure');
      await forceFocusHoverState(page, '.focus-hover p-modal >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
