import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocused,
  forceFocusedHovered,
  forceHovered,
  getThemedBody,
  GetThemedElements,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

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

        const getElements: GetThemedElements = (theme = 'light') => `
          <p-button-pure theme="${theme}">Some label</p-button-pure>
          <p-button-pure theme="${theme}">Some label <p slot="subline">Some Subline</p></p-button-pure>`;

        await setContentWithDesignSystem(page, getThemedBody(getElements), { injectIntoHead: head });

        await forceHovered(page, '.hovered > p-button-pure >>> button');
        await forceFocused(page, '.focused > p-button-pure >>> button');
        await forceFocusedHovered(page, '.focused-hovered > p-button-pure >>> button');
      })
    ).toBeFalsy();
  });
});
