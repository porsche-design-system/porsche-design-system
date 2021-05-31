import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getThemedBody,
  GetThemedElements,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Tabs Bar', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'tabs-bar',
        async () => {
          await vrt.goTo('/#text'); // so ensure fonts are already loaded before js is initialized
          await vrt.goTo('/#tabs-bar');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('tabs-bar-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />`;

        const getElements: GetThemedElements = (theme = 'light') => `
          <p-tabs-bar theme="${theme}">
            <button type="button">Tab One</button>
            <button type="button">Tab Two</button>
            <button type="button">Tab Three</button>
          </p-tabs-bar>
          <p-tabs-bar theme="${theme}">
            <a>Tab One</a>
            <a>Tab Two</a>
            <a>Tab Three</a>
          </p-tabs-bar>`;

        await setContentWithDesignSystem(page, getThemedBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-tabs-bar button');
        await forceHovered(page, '.hovered > p-tabs-bar a');
        await forceFocused(page, '.focused > p-tabs-bar button');
        await forceFocused(page, '.focused > p-tabs-bar a');
        await forceFocusedHovered(page, '.focused-hovered > p-tabs-bar button');
        await forceFocusedHovered(page, '.focused-hovered > p-tabs-bar a');
      })
    ).toBeFalsy();
  });
});
