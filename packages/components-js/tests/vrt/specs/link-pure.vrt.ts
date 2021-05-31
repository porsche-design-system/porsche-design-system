import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  setContentWithDesignSystem,
} from '../../e2e/helpers';
import { Theme } from '@porsche-design-system/utilities';

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

        const getElements = (theme: Theme = 'light') => `
          <p-link-pure theme="${theme}" href="#">Some label</p-link-pure>
          <p-link-pure theme="${theme}" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>`;

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

        await forceHovered(page, '.hovered > p-link-pure >>> a');
        await forceFocused(page, '.focused > p-link-pure >>> a');
        await forceFocusedHovered(page, '.focused-hovered > p-link-pure >>> a');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
