import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import { CSS_ANIMATION_DURATION, forceStateOnElements, setContentWithDesignSystem } from '../../e2e/helpers';

describe('Switch', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'switch',
        async () => {
          await vrt.goTo('/#switch');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('switch-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-switch ~ p-switch { margin-top: 8px; }</style>`;

        const elements = `
          <p-switch>Some label</p-switch>
          <p-switch checked="true">Some label</p-switch>`;

        const elementsDark = `
          <p-switch theme="dark">Some label</p-switch>
          <p-switch theme="dark" checked="true">Some label</p-switch>
        `;

        const body = `
          <div id="hovered" class="playground light">
            ${elements}
          </div>
          <div id="dark-hovered" class="playground dark">
            ${elementsDark}
          </div>
          <div id="focused" class="playground light">
            ${elements}
          </div>
          <div id="dark-focused" class="playground dark">
            ${elementsDark}
          </div>
          <div id="hovered-focused" class="playground light">
            ${elements}
          </div>
          <div id="dark-hovered-focused" class="playground dark">
            ${elementsDark}
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceStateOnElements(page, [
          '#hovered > p-switch >>> button',
          '#dark-hovered > p-switch >>> button',
          '#focused > p-switch >>> button',
          '#dark-focused > p-switch >>> button',
          '#hovered-focused > p-switch >>> button',
          '#dark-hovered-focused > p-switch >>> button',
        ]);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
