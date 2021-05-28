import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import { CSS_ANIMATION_DURATION, forceStateOnElements, setContentWithDesignSystem } from '../../e2e/helpers';

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

        const elements = `
          <p-link-pure href="#">Some label</p-link-pure>
          <p-link-pure href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>`;

        const elementsDark = `
          <p-link-pure theme="dark" href="#">Some label</p-link-pure>
          <p-link-pure theme="dark" href="#">Some label <p slot="subline">Some Subline</p></p-link-pure>`;

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
          '#hovered > p-link-pure >>> a',
          '#dark-hovered > p-link-pure >>> a',
          '#focused > p-link-pure >>> a',
          '#dark-focused > p-link-pure >>> a',
          '#hovered-focused > p-link-pure >>> a',
          '#dark-hovered-focused > p-link-pure >>> a',
        ]);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
