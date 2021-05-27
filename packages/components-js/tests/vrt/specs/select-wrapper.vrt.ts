import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  FOCUSED_HOVERED_STATE,
  FOCUSED_STATE,
  forceStateOnElement,
  HOVERED_STATE,
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

        const body = `
           <div class="playground light">
                <p-select-wrapper id="select-wrapper-hovered" label="Some label" message="Some error validation message.">
                    <select name="some-name" aria-invalid="false">
                        <option value="a">Option A</option>
                    </select>
                </p-select-wrapper>
                <p-select-wrapper id="select-wrapper-error-hovered" label="Some label" state="error"
                                  message="Some error validation message.">
                    <select name="some-name" aria-invalid="true">
                        <option value="a">Option A</option>
                    </select>
                </p-select-wrapper>
                <p-select-wrapper id="select-wrapper-success-hovered" label="Some label" state="success"
                                  message="Some error validation message.">
                    <select name="some-name" aria-invalid="false">
                        <option value="a">Option A</option>
                    </select>
                </p-select-wrapper>
            </div>
           <div class="playground dark">
               <p-select-wrapper id="select-wrapper-dark-hovered" theme="dark" label="Some label"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-dark-error-hovered" theme="dark" label="Some label" state="error"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="true">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-dark-success-hovered" theme="dark" label="Some label" state="success"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
           </div>
           <div class="playground light">
               <p-select-wrapper id="select-wrapper-focused" label="Some label" message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-error-focused" label="Some label" state="error"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="true">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-success-focused" label="Some label" state="success"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
           </div>
           <div class="playground dark">
               <p-select-wrapper id="select-wrapper-dark-focused" theme="dark" label="Some label"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-dark-error-focused" theme="dark" label="Some label" state="error"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="true">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-dark-success-focused" theme="dark" label="Some label" state="success"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
           </div>
           <div class="playground light">
               <p-select-wrapper id="select-wrapper-hovered-focused" label="Some label" message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-error-hovered-focused" label="Some label" state="error"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="true">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-success-hovered-focused" label="Some label" state="success"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
           </div>
           <div class="playground dark">
               <p-select-wrapper id="select-wrapper-dark-hovered-focused" theme="dark" label="Some label"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-dark-error-hovered-focused" theme="dark" label="Some label" state="error"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="true">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
               <p-select-wrapper id="select-wrapper-dark-success-hovered-focused" theme="dark" label="Some label" state="success"
                                 message="Some error validation message.">
                   <select name="some-name" aria-invalid="false">
                       <option value="a">Option A</option>
                   </select>
               </p-select-wrapper>
           </div>
          `;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        // TODO: currently needed because VRT Tester resets the height to 1px while executing the scenario
        const height = await page.evaluate(() => document.body.clientHeight);
        await page.setViewport({ width: 1000, height: height });

        await forceStateOnElement(page, '#select-wrapper-hovered select', HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-error-hovered select', HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-success-hovered select', HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-hovered select', HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-error-hovered select', HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-success-hovered select', HOVERED_STATE);

        await forceStateOnElement(page, '#select-wrapper-focused select', FOCUSED_STATE);
        await forceStateOnElement(page, '#select-wrapper-error-focused select', FOCUSED_STATE);
        await forceStateOnElement(page, '#select-wrapper-success-focused select', FOCUSED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-focused select', FOCUSED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-error-focused select', FOCUSED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-success-focused select', FOCUSED_STATE);

        await forceStateOnElement(page, '#select-wrapper-hovered-focused select', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-error-hovered-focused select', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-success-hovered-focused select', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-hovered-focused select', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-error-hovered-focused select', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#select-wrapper-dark-success-hovered-focused select', FOCUSED_HOVERED_STATE);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
