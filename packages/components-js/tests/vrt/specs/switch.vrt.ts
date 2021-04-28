import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import { ForcedPseudoClasses, forceStateOnElement, setContentWithDesignSystem } from '../../e2e/helpers';

fdescribe('Switch', () => {
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

        const body = `
          <div class="playground light">
            <p-switch id="switch-hovered">Some label</p-switch>
            <p-switch id="switch-checked-hovered" checked="true">Some label</p-switch>
          </div>
          <div class="playground dark">
            <p-switch id="switch-dark-hovered" theme="dark">Some label</p-switch>
            <p-switch id="switch-dark-checked-hovered" theme="dark" checked="true">Some label</p-switch>
          </div>
          <div class="playground light">
            <p-switch id="switch-focused">Some label</p-switch>
            <p-switch id="switch-checked-focused" checked="true">Some label</p-switch>
          </div>
          <div class="playground dark">
            <p-switch id="switch-dark-focused" theme="dark">Some label</p-switch>
            <p-switch id="switch-dark-checked-focused" theme="dark" checked="true">Some label</p-switch>
          </div>
          <div class="playground light">
            <p-switch id="switch-hovered-focused">Some label</p-switch>
            <p-switch id="switch-checked-hovered-focused" checked="true">Some label</p-switch>
          </div>
          <div class="playground dark">
            <p-switch id="switch-dark-hovered-focused" theme="dark">Some label</p-switch>
            <p-switch id="switch-dark-checked-hovered-focused" theme="dark" checked="true">Some label</p-switch>
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        // TODO: currently needed because VRT Tester resets the height to 1px while executing the scenario
        const height = await page.evaluate(() => document.body.clientHeight);
        await page.setViewport({ width: 1000, height });

        const hovered: ForcedPseudoClasses[] = ['hover'];
        const focused: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
        const focusedHovered = hovered.concat(focused);

        await forceStateOnElement(page, '#switch-hovered >>> button', hovered);
        await forceStateOnElement(page, '#switch-checked-hovered >>> button', hovered);
        await forceStateOnElement(page, '#switch-focused >>> button', focused);
        await forceStateOnElement(page, '#switch-checked-focused >>> button', focused);
        await forceStateOnElement(page, '#switch-hovered-focused >>> button', focusedHovered);
        await forceStateOnElement(page, '#switch-checked-hovered-focused >>> button', focusedHovered);
        await forceStateOnElement(page, '#switch-dark-hovered >>> button', hovered);
        await forceStateOnElement(page, '#switch-dark-checked-hovered >>> button', hovered);
        await forceStateOnElement(page, '#switch-dark-focused >>> button', focused);
        await forceStateOnElement(page, '#switch-dark-checked-focused >>> button', focused);
        await forceStateOnElement(page, '#switch-dark-hovered-focused >>> button', focusedHovered);
        await forceStateOnElement(page, '#switch-dark-checked-hovered-focused >>> button', focusedHovered);

        await page.waitForTimeout(500); // TODO, remove as soon as flakiness without is understood
      })
    ).toBeFalsy();
  });
});
