import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getThemedBody,
  GetThemedElements,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Select Wrapper', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'select-wrapper',
        async () => {
          await vrt.goTo('/#select-wrapper');
          await vrt.click('#open-options');
        },
        testOptions
      )
    ).toBeFalsy();
  });
  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('select-wrapper-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-select-wrapper { margin-top: 16px; }</style>`;

        const getElements: GetThemedElements = (theme = 'light') => `
          <p-select-wrapper theme="${theme}" label="Some label" message="Some error validation message.">
            <select name="some-name" aria-invalid="false">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some label" state="error" message="Some error validation message.">
            <select name="some-name" aria-invalid="true">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some label" state="success" message="Some error validation message.">
            <select name="some-name" aria-invalid="false">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}">
            <span slot="label">Some label with a <a href="#">link</a>.</span>
            <span slot="description">Some description with a <a href="#">link</a>.</span>
            <select name="some-name">
              <option value="a">Option A</option>
            </select>
            <span slot="message">Some error message with a <a href="#">link</a>.</span>
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some label" description="Some description" state="error">
            <select name="some-name">
              <option value="a">Option A</option>
            </select>
            <span slot="message">Some error message with a <a href="#">link</a>.</span>
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some label" description="Some description" state="success">
            <select name="some-name">
              <option value="a">Option A</option>
            </select>
            <span slot="message">Some error message with a <a href="#">link</a>.</span>
          </p-select-wrapper>`;
        // TODO add hover test on fake option after select refactoring

        await setContentWithDesignSystem(page, getThemedBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-select-wrapper select');
        await forceHovered(page, '.hovered > p-select-wrapper span a');
        await forceFocused(page, '.focused > p-select-wrapper select');
        await forceFocused(page, '.focused > p-select-wrapper span a');
        await forceFocusedHovered(page, '.focused-hovered > p-select-wrapper select');
        await forceFocusedHovered(page, '.focused-hovered > p-select-wrapper span a');
      })
    ).toBeFalsy();
  });
});
