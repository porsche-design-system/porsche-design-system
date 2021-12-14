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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'text-field-wrapper', '/#text-field-wrapper')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('text-field-wrapper-states', async () => {
      const page = vrt.getPage();

      const head = `<style>p-text-field-wrapper:not(:last-child) { margin-bottom: 1rem; }</style>`;

      const getElementsMarkup: GetMarkup = () => `
        <p-text-field-wrapper label="Some label">
          <input type="password" name="some-name" />
        </p-text-field-wrapper>
        <p-text-field-wrapper label="Some label">
          <input type="search" name="some-name" />
        </p-text-field-wrapper>
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name" />
        </p-text-field-wrapper>
        <p-text-field-wrapper label="Some label" state="error" message="Some error validation message.">
          <input type="text" name="some-name" />
        </p-text-field-wrapper>
        <p-text-field-wrapper label="Some label" state="success" message="Some success validation message.">
          <input type="text" name="some-name" />
        </p-text-field-wrapper>
        <p-text-field-wrapper>
          <span slot="label">Some label with a <a href="#">link</a>.</span>
          <span slot="description">Some description with a <a href="#">link</a>.</span>
          <input type="text" name="some-name" />
        </p-text-field-wrapper>
        <p-text-field-wrapper label="Some label" description="Some description" state="error">
          <input type="text" name="some-name" />
          <span slot="message">Some error message with a <a href="#">link</a>.</span>
        </p-text-field-wrapper>
        <p-text-field-wrapper label="Some label" description="Some description" state="success">
          <input type="text" name="some-name" />
          <span slot="message">Some success message with a <a href="#">link</a>.</span>
        </p-text-field-wrapper>
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name" value="Readonly" readonly/>
        </p-text-field-wrapper>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover > p-text-field-wrapper input[type="text"]');
      await forceHoverState(page, '.hover > p-text-field-wrapper span a');
      await forceHoverState(page, '.hover > p-text-field-wrapper >>> button');
      await forceFocusState(page, '.focus > p-text-field-wrapper input[type="text"]');
      await forceFocusState(page, '.focus > p-text-field-wrapper span a');
      await forceFocusState(page, '.focus > p-text-field-wrapper >>> button');
      await forceFocusHoverState(page, '.focus-hover > p-text-field-wrapper input[type="text"]');
      await forceFocusHoverState(page, '.focus-hover > p-text-field-wrapper span a');
      await forceFocusHoverState(page, '.focus-hover > p-text-field-wrapper >>> button');
    })
  ).toBeFalsy();
});
