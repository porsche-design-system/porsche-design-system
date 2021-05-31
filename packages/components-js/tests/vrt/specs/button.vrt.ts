import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  setContentWithDesignSystem,
} from '../../e2e/helpers';
import { Theme } from '@porsche-design-system/utilities';

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

        const getElements = (theme: Theme = 'light') => `
          <p-button theme="${theme}" variant="primary">Some label</p-button>
          <p-button theme="${theme}" variant="secondary">Some label</p-button>
          <p-button theme="${theme}" variant="tertiary">Some label</p-button>`;

        const body = `
          <div class="playground light hovered">
            ${getElements()}
          </div>
          <div class="playground dark hovered">
            ${getElements('dark')}
          </div>
          <div class="playground light focused">
            ${getElements()}
          </div>
          <div class="playground dark focused">
            ${getElements('dark')}
          </div>
          <div class="playground light focused-hovered">
            ${getElements()}
          </div>
          <div class="playground dark focused-hovered">
            ${getElements('dark')}
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-button >>> button');
        await forceFocused(page, '.focused > p-button >>> button');
        await forceFocusedHovered(page, '.focused-hovered > p-button >>> button');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
