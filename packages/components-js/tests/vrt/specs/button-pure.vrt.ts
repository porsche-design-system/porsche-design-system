import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import { CSS_ANIMATION_DURATION, forceStateOnElements, setContentWithDesignSystem } from '../../e2e/helpers';

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

        const elements = `
          <p-button-pure>Some label</p-button-pure>
          <p-button-pure>Some label <p slot="subline">Some Subline</p></p-button-pure>`;
        const elementsDark = `
          <p-button-pure theme="dark">Some label</p-button-pure>
          <p-button-pure theme="dark">Some label <p slot="subline">Some Subline</p></p-button-pure>`;

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
          <div id="hovered-focused"  class="playground light">
            ${elements}
          </div>
          <div id="dark-hovered-focused" class="playground dark">
            ${elementsDark}
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceStateOnElements(page, [
          '#hovered > p-button-pure >>> button',
          '#dark-hovered > p-button-pure >>> button',
          '#focused > p-button-pure >>> button',
          '#dark-focused > p-button-pure >>> button',
          '#hovered-focused > p-button-pure >>> button',
          '#dark-hovered-focused > p-button-pure >>> button',
        ]);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
