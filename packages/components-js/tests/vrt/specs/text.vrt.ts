import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('Text', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'text', '/#text')).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('text-states', async () => {
        const page = vrt.getPage();

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-text theme="${theme}">Lorem ipsum dolor sit amet <a href="#">linked text</a></p-text>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

        await forceHoveredState(page, '.hovered > p-text a');
        await forceFocusedState(page, '.focused > p-text a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-text a');
      })
    ).toBeFalsy();
  });
});
