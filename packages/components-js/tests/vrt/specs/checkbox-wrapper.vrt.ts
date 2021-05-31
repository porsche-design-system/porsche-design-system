import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getBody,
  GetElements,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

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

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-checkbox-wrapper:not(:last-child) { margin-bottom: 16px; }</style>`;

        const getElements: GetElements = () => `
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

        await setContentWithDesignSystem(page, getBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-checkbox-wrapper input[type="checkbox"]');
        await forceHovered(page, '.hovered > p-checkbox-wrapper span a');
        await forceFocused(page, '.focused > p-checkbox-wrapper input[type="checkbox"]');
        await forceFocused(page, '.focused > p-checkbox-wrapper span a');
        await forceFocusedHovered(page, '.focused-hovered > p-checkbox-wrapper input[type="checkbox"]');
        await forceFocusedHovered(page, '.focused-hovered > p-checkbox-wrapper span a');
      })
    ).toBeFalsy();
  });
});
