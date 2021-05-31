import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  setContentWithDesignSystem,
} from '../../e2e/helpers';
import { Theme } from '@porsche-design-system/utilities';

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

        const getElements = (theme: Theme = 'light') => `
          <p-link theme="${theme}" variant="primary" href="#">Some label</p-link>
          <p-link theme="${theme}" variant="secondary" href="#">Some label</p-link>
          <p-link theme="${theme}" variant="tertiary" href="#">Some label</p-link>`;

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

        await forceHovered(page, '.hovered > p-link >>> a');
        await forceFocused(page, '.focused > p-link >>> a');
        await forceFocusedHovered(page, '.focused-hovered > p-link >>> a');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
