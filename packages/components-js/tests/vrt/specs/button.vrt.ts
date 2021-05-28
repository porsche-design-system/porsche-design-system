import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import { CSS_ANIMATION_DURATION, forceStateOnElements, setContentWithDesignSystem } from '../../e2e/helpers';

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

        const elements = `
          <p-button variant="primary">Some label</p-button>
          <p-button variant="secondary">Some label</p-button>
          <p-button variant="tertiary">Some label</p-button>`;

        const elementsDark = `
          <p-button theme="dark" variant="primary">Some label</p-button>
          <p-button theme="dark" variant="secondary">Some label</p-button>
          <p-button theme="dark" variant="tertiary">Some label</p-button>`;

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
          '#hovered > p-button >>> button',
          '#dark-hovered > p-button >>> button',
          '#focused > p-button >>> button',
          '#dark-focused > p-button >>> button',
          '#hovered-focused > p-button >>> button',
          '#dark-hovered-focused > p-button >>> button',
        ]);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
