import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  pinCodeScenario,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import {
  forceFocusState,
  forceFocusHoverState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'pin-code', '/#pin-code', {
      scenario: (page) => pinCodeScenario(page),
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();

  expect(
    await vrt.test('pin-code-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
          p-pin-code:not(:last-child), .force-label { margin-bottom: 1rem; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-pin-code theme="${theme}" label="input gets hovered or focused"></p-pin-code>
        <div class="force-label">
          <p-pin-code theme="${theme}" label="label gets hovered or focused"></p-pin-code>
        </div>
        <p-pin-code theme="${theme}" label="Disabled" disabled="true"></p-pin-code>
        <p-pin-code theme="${theme}" label="Some label" state="error" message="Some error validation message."></p-pin-code>
        <p-pin-code theme="${theme}" label="Some label" state="success" message="Some success validation message."></p-pin-code>
        <p-pin-code theme="${theme}">
          <span slot="label">
            Slotted label
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
        </p-pin-code>
        <p-pin-code theme="${theme}" label="Some label" state="error">
          <span slot="description">
            Slotted description
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
        </p-pin-code>
        <p-pin-code theme="${theme}" label="Some label" state="error">
          <span slot="message">
            Slotted error message
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
        </p-pin-code>
        <p-pin-code theme="${theme}" label="Some label" state="success">
          <span slot="message">
            Slotted success message
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
        </p-pin-code>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-pin-code >>> input');
      await forceHoverState(page, '.hover p-pin-code span a');
      await forceHoverState(page, '.hover .force-label > p-pin-code >>> span');
      await forceFocusState(page, '.focus p-pin-code >>> input');
      await forceFocusState(page, '.focus p-pin-code span a');
      await forceFocusHoverState(page, '.focus-hover p-pin-code >>> input');
      await forceFocusHoverState(page, '.focus-hover p-pin-code span a');
    })
  ).toBeFalsy();
});
