import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  forceStateOnElements,
  generateGUID,
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

        const getElements = (): string => `
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
        `;

        const body = `
            <div id="hovered" class="playground light">
              ${getElements()}
            </div>
            <div id="focused" class="playground light">
              ${getElements()}
            </div>
            <div id="hovered-focused" class="playground light">
              ${getElements()}
            </div>
          `;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceStateOnElements(page, [
          '#hovered > p-radio-button-wrapper input[type="radio"]',
          '#focused > p-radio-button-wrapper input[type="radio"]',
          '#hovered-focused > p-radio-button-wrapper input[type="radio"]',
        ]);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
