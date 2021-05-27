import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  FOCUSED_HOVERED_STATE,
  FOCUSED_STATE,
  forceStateOnElement,
  HOVERED_STATE,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Link', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link',
        async () => {
          await vrt.goTo('/#link');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('link-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-link:not(:last-child) { margin-right: 8px; }</style>`;

        const body = `
          <div class="playground light">
            <p-link id="link-primary-hovered" variant="primary" href="#">Some label</p-link>
            <p-link id="link-secondary-hovered" variant="secondary" href="#">Some label</p-link>
            <p-link id="link-tertiary-hovered" variant="tertiary" href="#">Some label</p-link>
          </div>
          <div class="playground dark">
            <p-link id="link-dark-hovered" theme="dark" variant="primary" href="#">Some label</p-link>
            <p-link id="link-dark-secondary-hovered" theme="dark" variant="secondary" href="#">Some label</p-link>
            <p-link id="link-dark-tertiary-hovered" theme="dark" variant="tertiary" href="#">Some label</p-link>
          </div>
          <div class="playground light">
            <p-link id="link-focused" variant="primary" href="#">Some label</p-link>
             <p-link id="link-secondary-focused" variant="secondary" href="#">Some label</p-link>
            <p-link id="link-tertiary-focused" variant="tertiary" href="#">Some label</p-link>
          </div>
          <div class="playground dark">
            <p-link id="link-dark-focused" theme="dark" variant="primary" href="#">Some label</p-link>
            <p-link id="link-dark-secondary-focused" theme="dark" variant="secondary" href="#">Some label</p-link>
            <p-link id="link-dark-tertiary-focused" theme="dark" variant="tertiary" href="#">Some label</p-link>
          </div>
          <div class="playground light">
            <p-link id="link-primary-hovered-focused" variant="primary" href="#">Some label</p-link>
            <p-link id="link-secondary-hovered-focused" variant="secondary"" href="#">Some label</p-link>
            <p-link id="link-tertiary-hovered-focused" variant="tertiary"" href="#">Some label</p-link>
          </div>
          <div class="playground dark">
            <p-link id="link-dark-hovered-focused" theme="dark" variant="primary" href="#">Some label</p-link>
            <p-link id="link-dark-secondary-hovered-focused" theme="dark" variant="secondary" href="#">Some label</p-link>
            <p-link id="link-dark-tertiary-hovered-focused" theme="dark" variant="tertiary" href="#">Some label</p-link>
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        // TODO: currently needed because VRT Tester resets the height to 1px while executing the scenario
        const height = await page.evaluate(() => document.body.clientHeight);
        await page.setViewport({ width: 1000, height: height });

        await forceStateOnElement(page, '#link-primary-hovered', HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-secondary-hovered', HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-tertiary-hovered', HOVERED_STATE, 'a');

        await forceStateOnElement(page, '#link-focused', FOCUSED_STATE, 'a');
        await forceStateOnElement(page, '#link-secondary-focused', FOCUSED_STATE, 'a');
        await forceStateOnElement(page, '#link-tertiary-focused', FOCUSED_STATE, 'a');

        await forceStateOnElement(page, '#link-primary-hovered-focused', FOCUSED_HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-secondary-hovered-focused', FOCUSED_HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-tertiary-hovered-focused', FOCUSED_HOVERED_STATE, 'a');

        await forceStateOnElement(page, '#link-dark-hovered', HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-dark-secondary-hovered', HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-dark-tertiary-hovered', HOVERED_STATE, 'a');

        await forceStateOnElement(page, '#link-dark-focused', FOCUSED_STATE, 'a');
        await forceStateOnElement(page, '#link-dark-secondary-focused', FOCUSED_STATE, 'a');
        await forceStateOnElement(page, '#link-dark-tertiary-focused', FOCUSED_STATE, 'a');

        await forceStateOnElement(page, '#link-dark-hovered-focused', FOCUSED_HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-dark-secondary-hovered-focused', FOCUSED_HOVERED_STATE, 'a');
        await forceStateOnElement(page, '#link-dark-tertiary-hovered-focused', FOCUSED_HOVERED_STATE, 'a');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
