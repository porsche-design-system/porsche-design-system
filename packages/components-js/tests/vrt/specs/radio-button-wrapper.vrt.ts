import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  generateGUID,
  getBody,
  GetElements,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

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

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-radio-button-wrapper { margin-top: 16px; }</style>`;

        const getElements: GetElements = () => `
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

        await setContentWithDesignSystem(page, getBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-radio-button-wrapper input[type="radio"]');
        await forceHovered(page, '.hovered > p-radio-button-wrapper span a');
        await forceFocused(page, '.focused > p-radio-button-wrapper input[type="radio"]');
        await forceFocused(page, '.focused > p-radio-button-wrapper span a');
        await forceFocusedHovered(page, '.focused-hovered > p-radio-button-wrapper input[type="radio"]');
        await forceFocusedHovered(page, '.focused-hovered > p-radio-button-wrapper span a');
      })
    ).toBeFalsy();
  });
});
