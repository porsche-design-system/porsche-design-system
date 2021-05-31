import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  forceFocused,
  forceFocusedHovered,
  forceHovered,
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

        const elements = `
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
          </p-checkbox-wrapper>`;

        const body = `
            <div class="playground light hovered">
              ${elements}
            </div>
            <div class="playground light focused">
              ${elements}
            </div>
            <div class="playground focused-hovered">
              ${elements}
            </div>
          `;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-checkbox-wrapper input[type="checkbox"]');
        await forceFocused(page, '.focused > p-checkbox-wrapper input[type="checkbox"]');
        await forceFocusedHovered(page, '.focused-hovered > p-checkbox-wrapper input[type="checkbox"]');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
