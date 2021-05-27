import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  FOCUSED_HOVERED_STATE,
  FOCUSED_STATE,
  forceStateOnElement,
  HOVERED_STATE,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Button Pure', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'button-pure',
        async () => {
          await vrt.goTo('/#button-pure');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('button-pure-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-button-pure:not(:last-child) { margin-right: 8px; }</style>`;

        const body = `
          <div class="playground light">
            <p-button-pure id="button-pure-hovered">Some label</p-button-pure>
            <p-button-pure id="button-pure-subline-hovered">Some label <p slot="subline">Some Subline</p></p-button-pure>
          </div>
          <div class="playground dark">
            <p-button-pure id="button-pure-dark-hovered" theme="dark">Some label</p-button-pure>
            <p-button-pure id="button-pure-subline-dark-hovered" theme="dark">Some label <p slot="subline">Some Subline</p></p-button-pure>
          </div>
          <div class="playground light">
            <p-button-pure id="button-pure-focused">Some label</p-button-pure>
            <p-button-pure id="button-pure-subline-focused">Some label <p slot="subline">Some Subline</p></p-button-pure>
          </div>
          <div class="playground dark">
            <p-button-pure id="button-pure-dark-focused" theme="dark">Some label</p-button-pure>
            <p-button-pure id="button-pure-subline-dark-focused" theme="dark">Some label <p slot="subline">Some Subline</p></p-button-pure>
          </div>
          <div class="playground light">
            <p-button-pure id="button-pure-hovered-focused">Some label</p-button-pure>
            <p-button-pure id="button-pure-subline-hovered-focused">Some label <p slot="subline">Some Subline</p></p-button-pure>
          </div>
          <div class="playground dark">
            <p-button-pure id="button-pure-dark-hovered-focused" theme="dark">Some label</p-button-pure>
            <p-button-pure id="button-pure-subline-dark-hovered-focused" theme="dark">Some label <p slot="subline">Some Subline</p></p-button-pure>
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        // TODO: currently needed because VRT Tester resets the height to 1px while executing the scenario
        const height = await page.evaluate(() => document.body.clientHeight);
        await page.setViewport({ width: 1000, height: height });

        await forceStateOnElement(page, '#button-pure-hovered', HOVERED_STATE, 'button');
        await forceStateOnElement(page, '#button-pure-subline-hovered', HOVERED_STATE, 'button');

        await forceStateOnElement(page, '#button-pure-focused', FOCUSED_STATE, 'button');
        await forceStateOnElement(page, '#button-pure-subline-focused', FOCUSED_STATE, 'button');

        await forceStateOnElement(page, '#button-pure-hovered-focused', FOCUSED_HOVERED_STATE, 'button');
        await forceStateOnElement(page, '#button-pure-subline-hovered-focused', FOCUSED_HOVERED_STATE, 'button');

        await forceStateOnElement(page, '#button-pure-dark-hovered', HOVERED_STATE, 'button');
        await forceStateOnElement(page, '#button-pure-subline-dark-hovered', HOVERED_STATE, 'button');

        await forceStateOnElement(page, '#button-pure-dark-focused', FOCUSED_STATE, 'button');
        await forceStateOnElement(page, '#button-pure-subline-dark-focused', FOCUSED_STATE, 'button');

        await forceStateOnElement(page, '#button-pure-dark-hovered-focused', FOCUSED_HOVERED_STATE, 'button');
        await forceStateOnElement(page, '#button-pure-subline-dark-hovered-focused', FOCUSED_HOVERED_STATE, 'button');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
