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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'checkbox-wrapper', '/#checkbox-wrapper')).toBeFalsy();
});

it.each(defaultViewports)('should have no skeleton visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'checkbox-wrapper-skeleton', '/#checkbox-wrapper-skeleton')
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('checkbox-wrapper-states', async () => {
      const page = vrt.getPage();

      const head = `<style>p-checkbox-wrapper:not(:last-child), .force-label { margin-bottom: 1rem; }</style>`;

      const getElementsMarkup: GetMarkup = () => `
        <p-checkbox-wrapper label="When input gets hovered or focused">
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
        <div class="force-label">
          <p-checkbox-wrapper label="When label gets hovered or focused">
            <input type="checkbox" name="some-name" />
          </p-checkbox-wrapper>
        </div>
        <p-checkbox-wrapper label="Some label" state="error" message="Some error validation message.">
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
        <p-checkbox-wrapper label="Some label" state="success" message="Some success validation message.">
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
        <p-checkbox-wrapper label="Some label">
          <input type="checkbox" name="some-name" checked/>
        </p-checkbox-wrapper>
        <p-checkbox-wrapper label="Some label" state="error" message="Some error validation message.">
          <input type="checkbox" name="some-name" checked/>
        </p-checkbox-wrapper>
        <p-checkbox-wrapper label="Some label" state="success" message="Some success validation message.">
          <input type="checkbox" name="some-name" checked />
        </p-checkbox-wrapper>
        <p-checkbox-wrapper>
          <span slot="label">Some label with a <a href="#">link</a>.</span>
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
        <p-checkbox-wrapper label="Some label" state="error">
          <input type="checkbox" name="some-name" />
          <span slot="message">Some error message with a <a href="#">link</a>.</span>
        </p-checkbox-wrapper>
        <p-checkbox-wrapper label="Some label" state="success">
          <input type="checkbox" name="some-name" />
          <span slot="message">Some success message with a <a href="#">link</a>.</span>
        </p-checkbox-wrapper>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover > p-checkbox-wrapper input[type="checkbox"]');
      await forceHoverState(page, '.hover > .force-label > p-checkbox-wrapper >>> p-text');
      await forceHoverState(page, '.hover > p-checkbox-wrapper span a');
      await forceFocusState(page, '.focus p-checkbox-wrapper input[type="checkbox"]');
      await forceFocusState(page, '.focus > p-checkbox-wrapper span a');
      await forceFocusHoverState(page, '.focus-hover > p-checkbox-wrapper input[type="checkbox"]');
      await forceFocusState(page, '.focus-hover > .force-label > p-checkbox-wrapper input[type="checkbox"]');
      await forceHoverState(page, '.focus-hover > .force-label > p-checkbox-wrapper >>> p-text');
      await forceFocusHoverState(page, '.focus-hover > p-checkbox-wrapper span a');
    })
  ).toBeFalsy();
});
