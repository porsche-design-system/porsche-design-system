import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getBodyMarkup,
  GetMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

describe('Text Field Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'text-field-wrapper',
        async () => {
          await vrt.goTo('/#text-field-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('text-field-wrapper-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">p-text-field-wrapper:not(:last-child) { margin-bottom: 16px; }</style>`;

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

        await forceHoveredState(page, '.hovered > p-text-field-wrapper input[type="text"]');
        await forceHoveredState(page, '.hovered > p-text-field-wrapper span a');
        await forceHoveredState(page, '.hovered > p-text-field-wrapper >>> button');
        await forceFocusedState(page, '.focused > p-text-field-wrapper input[type="text"]');
        await forceFocusedState(page, '.focused > p-text-field-wrapper span a');
        await forceFocusedState(page, '.focused > p-text-field-wrapper >>> button');
        await forceFocusedHoveredState(page, '.focused-hovered > p-text-field-wrapper input[type="text"]');
        await forceFocusedHoveredState(page, '.focused-hovered > p-text-field-wrapper span a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-text-field-wrapper >>> button');
      })
    ).toBeFalsy();
  });
});
