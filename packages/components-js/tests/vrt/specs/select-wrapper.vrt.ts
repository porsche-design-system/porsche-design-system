import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import { CSS_ANIMATION_DURATION, forceStateOnElements, setContentWithDesignSystem } from '../../e2e/helpers';

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

        const elements = `
          <p-select-wrapper label="Some label" message="Some error validation message.">
            <select name="some-name" aria-invalid="false">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper label="Some label" state="error" message="Some error validation message.">
            <select name="some-name" aria-invalid="true">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper label="Some label" state="success" message="Some error validation message.">
            <select name="some-name" aria-invalid="false">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>`;

        const elementsDark = `
          <p-select-wrapper theme="dark" label="Some label" message="Some error validation message.">
            <select name="some-name" aria-invalid="false">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper theme="dark" label="Some label" state="error" message="Some error validation message.">
            <select name="some-name" aria-invalid="true">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper theme="dark" label="Some label" state="success" message="Some error validation message.">
            <select name="some-name" aria-invalid="false">
              <option value="a">Option A</option>
            </select>
          </p-select-wrapper>`;

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
          </div>
          `;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceStateOnElements(page, [
          '#hovered > p-select-wrapper select',
          '#dark-hovered > p-select-wrapper select',
          '#focused > p-select-wrapper select',
          '#dark-focused > p-select-wrapper select',
          '#hovered-focused > p-select-wrapper select',
          '#dark-hovered-focused > p-select-wrapper select',
        ]);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
