import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  FOCUSED_HOVERED_STATE,
  FOCUSED_STATE,
  forceStateOnElement,
  HOVERED_STATE,
  setContentWithDesignSystem,
} from '../../e2e/helpers';
import { CSS_ANIMATION_DURATION } from '../../e2e/specs/tabs-bar.e2e';

describe('Link Pure', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link-pure',
        async () => {
          await vrt.goTo('/#link-pure');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('link-pure-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-link-pure:not(:last-child) { margin-right: 8px; }</style>`;

        const body = `
          <div class="playground light">
            <p-link-pure id="link-pure-hovered" href="#">Some label</p-link-pure>
            <p-link-pure id="link-pure-subline-hovered" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>
          </div>
          <div class="playground dark">
            <p-link-pure id="link-pure-dark-hovered" theme="dark" href="#">Some label</p-link-pure>
            <p-link-pure id="link-pure-subline-dark-hovered" theme="dark" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>
          </div>
          <div class="playground light">
            <p-link-pure id="link-pure-focused" href="#">Some label</p-link-pure>
            <p-link-pure id="link-pure-subline-focused" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>
          </div>
          <div class="playground dark">
            <p-link-pure id="link-pure-dark-focused" theme="dark" href="#">Some label</p-link-pure>
            <p-link-pure id="link-pure-subline-dark-focused" theme="dark" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>
          </div>
          <div class="playground light">
            <p-link-pure id="link-pure-hovered-focused" href="#">Some label</p-link-pure>
            <p-link-pure id="link-pure-subline-hovered-focused" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>
          </div>
          <div class="playground dark">
            <p-link-pure id="link-pure-dark-hovered-focused" theme="dark" href="#">Some label</p-link-pure>
            <p-link-pure id="link-pure-subline-dark-hovered-focused" theme="dark" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        // TODO: currently needed because VRT Tester resets the height to 1px while executing the scenario
        const height = await page.evaluate(() => document.body.clientHeight);
        await page.setViewport({ width: 1000, height: height });

        await forceStateOnElement(page, '#link-pure-hovered', HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-pure-subline-hovered', HOVERED_STATE, 'a');

        await forceStateOnElement(page, '#link-pure-focused', FOCUSED_STATE, 'a');
        await forceStateOnElement(page, '#link-pure-subline-focused', FOCUSED_STATE, 'a');

        await forceStateOnElement(page, '#link-pure-hovered-focused', FOCUSED_HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-pure-subline-hovered-focused', FOCUSED_HOVERED_STATE, 'a');

        await forceStateOnElement(page, '#link-pure-dark-hovered', HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-pure-subline-dark-hovered', HOVERED_STATE, 'a');

        await forceStateOnElement(page, '#link-pure-dark-focused', FOCUSED_STATE, 'a');
        await forceStateOnElement(page, '#link-pure-subline-dark-focused', FOCUSED_STATE, 'a');

        await forceStateOnElement(page, '#link-pure-dark-hovered-focused', FOCUSED_HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-pure-subline-dark-hovered-focused', FOCUSED_HOVERED_STATE, 'a');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
