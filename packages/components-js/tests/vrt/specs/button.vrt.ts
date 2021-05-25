import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import { ForcedPseudoClasses, forceStateOnElement, setContentWithDesignSystem } from '../../e2e/helpers';
import { CSS_ANIMATION_DURATION } from '../../e2e/specs/tabs-bar.e2e';

describe('Button', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'button',
        async () => {
          await vrt.goTo('/#button');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('button-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-button:not(:last-child) { margin-right: 8px; }</style>`;

        const body = `
          <div class="playground light">
            <p-button id="button-primary-hovered" variant="primary">Some label</p-button>
            <p-button id="button-secondary-hovered" variant="secondary">Some label</p-button>
            <p-button id="button-tertiary-hovered" variant="tertiary">Some label</p-button>
          </div>
          <div class="playground dark">
            <p-button id="button-dark-hovered" theme="dark" variant="primary">Some label</p-button>
            <p-button id="button-dark-secondary-hovered" theme="dark" variant="secondary">Some label</p-button>
            <p-button id="button-dark-tertiary-hovered" theme="dark" variant="tertiary">Some label</p-button>
          </div>
          <div class="playground light">
            <p-button id="button-focused" variant="primary">Some label</p-button>
             <p-button id="button-secondary-focused" variant="secondary">Some label</p-button>
            <p-button id="button-tertiary-focused" variant="tertiary">Some label</p-button>
          </div>
          <div class="playground dark">
            <p-button id="button-dark-focused" theme="dark" variant="primary">Some label</p-button>
            <p-button id="button-dark-secondary-focused" theme="dark" variant="secondary">Some label</p-button>
            <p-button id="button-dark-tertiary-focused" theme="dark" variant="tertiary">Some label</p-button>
          </div>
          <div class="playground light">
            <p-button id="button-primary-hovered-focused" variant="primary">Some label</p-button>
            <p-button id="button-secondary-hovered-focused" variant="secondary"">Some label</p-button>
            <p-button id="button-tertiary-hovered-focused" variant="tertiary"">Some label</p-button>
          </div>
          <div class="playground dark">
            <p-button id="button-dark-hovered-focused" theme="dark" variant="primary">Some label</p-button>
            <p-button id="button-dark-secondary-hovered-focused" theme="dark" variant="secondary">Some label</p-button>
            <p-button id="button-dark-tertiary-hovered-focused" theme="dark" variant="tertiary">Some label</p-button>
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        // TODO: currently needed because VRT Tester resets the height to 1px while executing the scenario
        const height = await page.evaluate(() => document.body.clientHeight);
        await page.setViewport({ width: 1000, height: height });

        const hovered: ForcedPseudoClasses[] = ['hover'];
        const focused: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
        const focusedHovered = hovered.concat(focused);

        await forceStateOnElement(page, '#button-primary-hovered', 'button', hovered);
        await forceStateOnElement(page, '#button-secondary-hovered', 'button', hovered);
        await forceStateOnElement(page, '#button-tertiary-hovered', 'button', hovered);
        await forceStateOnElement(page, '#button-focused', 'button', focused);
        await forceStateOnElement(page, '#button-secondary-focused', 'button', focused);
        await forceStateOnElement(page, '#button-tertiary-focused', 'button', focused);
        await forceStateOnElement(page, '#button-primary-hovered-focused', 'button', focusedHovered);
        await forceStateOnElement(page, '#button-secondary-hovered-focused', 'button', focusedHovered);
        await forceStateOnElement(page, '#button-tertiary-hovered-focused', 'button', focusedHovered);
        await forceStateOnElement(page, '#button-dark-hovered', 'button', hovered);
        await forceStateOnElement(page, '#button-dark-secondary-hovered', 'button', hovered);
        await forceStateOnElement(page, '#button-dark-tertiary-hovered', 'button', hovered);
        await forceStateOnElement(page, '#button-dark-focused', 'button', focused);
        await forceStateOnElement(page, '#button-dark-secondary-focused', 'button', focused);
        await forceStateOnElement(page, '#button-dark-tertiary-focused', 'button', focused);
        await forceStateOnElement(page, '#button-dark-hovered-focused', 'button', focusedHovered);
        await forceStateOnElement(page, '#button-dark-secondary-hovered-focused', 'button', focusedHovered);
        await forceStateOnElement(page, '#button-dark-tertiary-hovered-focused', 'button', focusedHovered);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
