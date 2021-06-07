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

describe('Checkbox Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'checkbox-wrapper',
        async () => {
          await vrt.goTo('/#checkbox-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });
  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('checkbox-wrapper-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">p-checkbox-wrapper:not(:last-child) { margin-bottom: 16px; }</style>`;

        const getElementsMarkup: GetMarkup = () => `
          <p-checkbox-wrapper label="Some label">
            <input type="checkbox" name="some-name" />
          </p-checkbox-wrapper>
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

        await forceHoveredState(page, '.hovered > p-checkbox-wrapper input[type="checkbox"]');
        await forceHoveredState(page, '.hovered > p-checkbox-wrapper span a');
        await forceFocusedState(page, '.focused > p-checkbox-wrapper input[type="checkbox"]');
        await forceFocusedState(page, '.focused > p-checkbox-wrapper span a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-checkbox-wrapper input[type="checkbox"]');
        await forceFocusedHoveredState(page, '.focused-hovered > p-checkbox-wrapper span a');
      })
    ).toBeFalsy();
  });
});
