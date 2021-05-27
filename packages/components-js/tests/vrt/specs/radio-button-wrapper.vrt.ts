import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  FOCUSED_HOVERED_STATE,
  FOCUSED_STATE,
  forceStateOnElement,
  HOVERED_STATE,
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

        const body = `
            <div class="playground light">
                <p-radio-button-wrapper id="radio-button-wrapper-hovered" label="Some label">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-error-hovered" label="Some label" state="error" message="Some error validation message.">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-success-hovered" label="Some label" state="success" message="Some success validation message.">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-checked-hovered" label="Some label">
                    <input type="radio" name="radio-button-wrapper-checked-hovered" checked/>
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-error-checked-hovered" label="Some label" state="error" message="Some error validation message.">
                    <input type="radio" name="radio-button-wrapper-error-checked-hovered" checked/>
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-success-checked-hovered" label="Some label" state="success" message="Some success validation message.">
                    <input type="radio" name="radio-button-wrapper-success-checked-hovered" checked />
                </p-radio-button-wrapper>
            </div>
            <div class="playground light">
                <p-radio-button-wrapper id="radio-button-wrapper-focused" label="Some label">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-error-focused" label="Some label" state="error" message="Some error validation message.">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-success-focused" label="Some label" state="success" message="Some success validation message.">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-checked-focused" label="Some label">
                    <input type="radio" name="radio-button-wrapper-checked-focused" checked/>
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-error-checked-focused" label="Some label" state="error" message="Some error validation message.">
                    <input type="radio" name="radio-button-wrapper-error-checked-focused" checked/>
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-success-checked-focused" label="Some label" state="success" message="Some success validation message.">
                    <input type="radio" name="radio-button-wrapper-success-checked-focused" checked />
                </p-radio-button-wrapper>
            </div>
            <div class="playground light">
                 <p-radio-button-wrapper id="radio-button-wrapper-hovered-focused" label="Some label">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-error-hovered-focused" label="Some label" state="error" message="Some error validation message.">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-success-hovered-focused" label="Some label" state="success" message="Some success validation message.">
                    <input type="radio" name="some-name" />
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-checked-hovered-focused" label="Some label">
                    <input type="radio" name="radio-button-wrapper-checked-hovered-focused" checked/>
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-error-checked-hovered-focused" label="Some label" state="error" message="Some error validation message.">
                    <input type="radio" name="radio-button-wrapper-error-checked-hovered-focused" checked/>
                </p-radio-button-wrapper>
                <p-radio-button-wrapper id="radio-button-wrapper-success-checked-hovered-focused" label="Some label" state="success" message="Some success validation message.">
                    <input type="radio" name="radio-button-wrapper-success-checked-hovered-focused" checked />
                </p-radio-button-wrapper>
            </div>
          `;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceStateOnElement(page, '#radio-button-wrapper-hovered input[type="radio"]', HOVERED_STATE);
        await forceStateOnElement(page, '#radio-button-wrapper-error-hovered input[type="radio"]', HOVERED_STATE);
        await forceStateOnElement(page, '#radio-button-wrapper-success-hovered input[type="radio"]', HOVERED_STATE);
        await forceStateOnElement(page, '#radio-button-wrapper-checked-hovered input[type="radio"]', HOVERED_STATE);
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-error-checked-hovered input[type="radio"]',
          HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-success-checked-hovered input[type="radio"]',
          HOVERED_STATE
        );

        await forceStateOnElement(page, '#radio-button-wrapper-focused input[type="radio"]', FOCUSED_STATE);
        await forceStateOnElement(page, '#radio-button-wrapper-error-focused input[type="radio"]', FOCUSED_STATE);
        await forceStateOnElement(page, '#radio-button-wrapper-success-focused input[type="radio"]', FOCUSED_STATE);
        await forceStateOnElement(page, '#radio-button-wrapper-checked-focused input[type="radio"]', FOCUSED_STATE);
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-error-checked-focused input[type="radio"]',
          FOCUSED_STATE
        );
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-success-checked-focused input[type="radio"]',
          FOCUSED_STATE
        );

        await forceStateOnElement(
          page,
          '#radio-button-wrapper-hovered-focused input[type="radio"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-error-hovered-focused input[type="radio"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-success-hovered-focused input[type="radio"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-checked-hovered-focused input[type="radio"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-error-checked-hovered-focused input[type="radio"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#radio-button-wrapper-success-checked-hovered-focused input[type="radio"]',
          FOCUSED_HOVERED_STATE
        );

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
