import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  forceFocusedState,
  forceFocusedHoveredState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Text', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'text',
        async () => {
          await vrt.goTo('/#text');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('text-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-text theme="${theme}">Lorem ipsum dolor sit amet <a>linked text</a></p-text>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-text a');
        await forceFocusedState(page, '.focused > p-text a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-text a');
      })
    ).toBeFalsy();
  });
});
