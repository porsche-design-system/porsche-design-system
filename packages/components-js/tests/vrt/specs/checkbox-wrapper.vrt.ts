import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  FOCUSED_HOVERED_STATE,
  FOCUSED_STATE,
  forceStateOnElement,
  HOVERED_STATE,
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

        const body = `
            <div class="playground light">
                <p-checkbox-wrapper id="checkbox-wrapper-hovered" label="Some label">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-error-hovered" label="Some label" state="error" message="Some error validation message.">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-success-hovered" label="Some label" state="success" message="Some success validation message.">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-checked-hovered" label="Some label">
                    <input type="checkbox" name="some-name" checked/>
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-error-checked-hovered" label="Some label" state="error" message="Some error validation message.">
                    <input type="checkbox" name="some-name" checked/>
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-success-checked-hovered" label="Some label" state="success" message="Some success validation message.">
                    <input type="checkbox" name="some-name" checked />
                </p-checkbox-wrapper>
            </div>
            <div class="playground light">
                <p-checkbox-wrapper id="checkbox-wrapper-focused" label="Some label">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-error-focused" label="Some label" state="error" message="Some error validation message.">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-success-focused" label="Some label" state="success" message="Some success validation message.">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-checked-focused" label="Some label">
                    <input type="checkbox" name="some-name" checked/>
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-error-checked-focused" label="Some label" state="error" message="Some error validation message.">
                    <input type="checkbox" name="some-name" checked/>
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-success-checked-focused" label="Some label" state="success" message="Some success validation message.">
                    <input type="checkbox" name="some-name" checked />
                </p-checkbox-wrapper>
            </div>
            <div class="playground light">
                 <p-checkbox-wrapper id="checkbox-wrapper-hovered-focused" label="Some label">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-error-hovered-focused" label="Some label" state="error" message="Some error validation message.">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-success-hovered-focused" label="Some label" state="success" message="Some success validation message.">
                    <input type="checkbox" name="some-name" />
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-checked-hovered-focused" label="Some label">
                    <input type="checkbox" name="some-name" checked/>
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-error-checked-hovered-focused" label="Some label" state="error" message="Some error validation message.">
                    <input type="checkbox" name="some-name" checked/>
                </p-checkbox-wrapper>
                <p-checkbox-wrapper id="checkbox-wrapper-success-checked-hovered-focused" label="Some label" state="success" message="Some success validation message.">
                    <input type="checkbox" name="some-name" checked />
                </p-checkbox-wrapper>
            </div>
          `;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceStateOnElement(page, '#checkbox-wrapper-hovered input[type="checkbox"]', HOVERED_STATE);
        await forceStateOnElement(page, '#checkbox-wrapper-error-hovered input[type="checkbox"]', HOVERED_STATE);
        await forceStateOnElement(page, '#checkbox-wrapper-success-hovered input[type="checkbox"]', HOVERED_STATE);
        await forceStateOnElement(page, '#checkbox-wrapper-checked-hovered input[type="checkbox"]', HOVERED_STATE);
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-error-checked-hovered input[type="checkbox"]',
          HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-success-checked-hovered input[type="checkbox"]',
          HOVERED_STATE
        );

        await forceStateOnElement(page, '#checkbox-wrapper-focused input[type="checkbox"]', FOCUSED_STATE);
        await forceStateOnElement(page, '#checkbox-wrapper-error-focused input[type="checkbox"]', FOCUSED_STATE);
        await forceStateOnElement(page, '#checkbox-wrapper-success-focused input[type="checkbox"]', FOCUSED_STATE);
        await forceStateOnElement(page, '#checkbox-wrapper-checked-focused input[type="checkbox"]', FOCUSED_STATE);
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-error-checked-focused input[type="checkbox"]',
          FOCUSED_STATE
        );
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-success-checked-focused input[type="checkbox"]',
          FOCUSED_STATE
        );

        await forceStateOnElement(
          page,
          '#checkbox-wrapper-hovered-focused input[type="checkbox"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-error-hovered-focused input[type="checkbox"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-success-hovered-focused input[type="checkbox"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-checked-hovered-focused input[type="checkbox"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-error-checked-hovered-focused input[type="checkbox"]',
          FOCUSED_HOVERED_STATE
        );
        await forceStateOnElement(
          page,
          '#checkbox-wrapper-success-checked-hovered-focused input[type="checkbox"]',
          FOCUSED_HOVERED_STATE
        );

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
