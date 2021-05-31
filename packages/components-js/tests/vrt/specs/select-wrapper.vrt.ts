import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  setContentWithDesignSystem,
} from '../../e2e/helpers';
import { Theme } from '@porsche-design-system/utilities';

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

        const getElements = (theme: Theme = 'light') => `
          <p-select-wrapper theme="${theme}" label="Some label" message="Some error validation message.">
            <select name="some-name" aria-invalid="false">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some label" state="error" message="Some error validation message.">
            <select name="some-name" aria-invalid="true">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper theme="${theme}" label="Some label" state="success" message="Some error validation message.">
            <select name="some-name" aria-invalid="false">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>`;

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

        await forceHovered(page, '.hovered > p-select-wrapper select');
        await forceFocused(page, '.focused > p-select-wrapper select');
        await forceFocusedHovered(page, '.focused-hovered > p-select-wrapper select');

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
