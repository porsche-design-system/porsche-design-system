import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  generateGUID,
  getBodyMarkup,
  GetMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

describe('Radio Button Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'radio-button-wrapper',
        async () => {
          await vrt.goTo('/#radio-button-wrapper');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('radio-button-wrapper-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">p-radio-button-wrapper:not(:last-child) { margin-bottom: 1rem; }</style>`;

        const getElementsMarkup: GetMarkup = () => `
          <p-radio-button-wrapper label="Some label">
            <input type="radio" name="some-name" />
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some label" state="error" message="Some error validation message.">
            <input type="radio" name="some-name" />
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some label" state="success" message="Some success validation message.">
            <input type="radio" name="some-name" />
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some label">
            <input type="radio" name="${generateGUID()}" checked/>
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some label" state="error" message="Some error validation message.">
            <input type="radio" name="${generateGUID()}" checked/>
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some label" state="success" message="Some success validation message.">
            <input type="radio" name="${generateGUID()}" checked />
          </p-radio-button-wrapper>
          <p-radio-button-wrapper>
            <span slot="label">Some label with a <a href="#">link</a>.</span>
            <input type="radio" name="some-name" />
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some label" state="error">
            <input type="radio" name="some-name" />
            <span slot="message">Some error message with a <a href="#">link</a>.</span>
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some label" state="success">
            <input type="radio" name="some-name" />
            <span slot="message">Some success message with a <a href="#">link</a>.</span>
          </p-radio-button-wrapper>`;

        await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-radio-button-wrapper input[type="radio"]');
        await forceHoveredState(page, '.hovered > p-radio-button-wrapper span a');
        await forceFocusedState(page, '.focused > p-radio-button-wrapper input[type="radio"]');
        await forceFocusedState(page, '.focused > p-radio-button-wrapper span a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-radio-button-wrapper input[type="radio"]');
        await forceFocusedHoveredState(page, '.focused-hovered > p-radio-button-wrapper span a');
      })
    ).toBeFalsy();
  });
});
