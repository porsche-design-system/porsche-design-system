import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'textarea-wrapper', '/#textarea-wrapper')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('textarea-wrapper-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style type="text/css">
          p-textarea-wrapper:not(:last-child) { margin-bottom: 1rem; }
          textarea { min-height: initial; }
        </style>`;

      const getElementsMarkup: GetMarkup = () => `
        <p-textarea-wrapper label="Some label" message="Some error validation message.">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
        <p-textarea-wrapper label="Readonly">
          <textarea name="some-name" readonly>Readonly</textarea>
        </p-textarea-wrapper>
        <p-textarea-wrapper label="Some label" state="error" message="Some error validation message.">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
        <p-textarea-wrapper label="Some label" state="success" message="Some success validation message.">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
        <p-textarea-wrapper>
          <span slot="label">Some label with a <a href="#">link</a>.</span>
          <span slot="description">Some description with a <a href="#">link</a>.</span>
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
        <p-textarea-wrapper label="Some label" description="Some description" state="error">
          <textarea name="some-name"></textarea>
          <span slot="message">Some error message with a <a href="#">link</a>.</span>
        </p-textarea-wrapper>
        <p-textarea-wrapper label="Some label" description="Some description" state="success">
          <textarea name="some-name"></textarea>
          <span slot="message">Some success message with a <a href="#">link</a>.</span>
        </p-textarea-wrapper>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover > p-textarea-wrapper textarea');
      await forceHoverState(page, '.hover > p-textarea-wrapper span a');
      await forceFocusState(page, '.focus > p-textarea-wrapper textarea');
      await forceFocusState(page, '.focus > p-textarea-wrapper span a');
      await forceFocusHoverState(page, '.focus-hover > p-textarea-wrapper textarea');
      await forceFocusHoverState(page, '.focus-hover > p-textarea-wrapper span a');
    })
  ).toBeFalsy();
});
