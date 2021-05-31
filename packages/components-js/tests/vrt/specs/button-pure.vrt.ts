import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  setContentWithDesignSystem,
} from '../../e2e/helpers';
import { Theme } from '@porsche-design-system/utilities';

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

        const getElements = (theme: Theme = 'light') => `
          <p-button-pure theme="${theme}">Some label</p-button-pure>
          <p-button-pure theme="${theme}">Some label <p slot="subline">Some Subline</p></p-button-pure>`;

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

        await forceHovered(page, '.hovered > p-button-pure >>> button');
        await forceFocused(page, '.focused > p-button-pure >>> button');
        await forceFocusedHovered(page, '.focused-hovered > p-button-pure >>> button');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
