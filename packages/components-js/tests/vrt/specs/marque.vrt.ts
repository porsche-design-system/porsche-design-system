import {
  forceFocusedHoveredState,
  forceFocusedState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  getVisualRegressionMarque2xTester,
  getVisualRegressionMarque3xTester,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('Marque', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'marque', '/#marque')).toBeFalsy();
  });

  it('should have no visual regression on retina 2x display', async () => {
    expect(await vrtTest(getVisualRegressionMarque2xTester(), 'marque-2x', '/#marque')).toBeFalsy();
  });

  it('should have no visual regression on retina 3x display', async () => {
    expect(await vrtTest(getVisualRegressionMarque3xTester(), 'marque-3x', '/#marque')).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('marque-states', async () => {
        const page = vrt.getPage();
        const getElementsMarkup: GetMarkup = () => `<p-marque href="https://www.porsche.com"></p-marque>`;
        await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup));

        await forceFocusedState(page, '.focused > p-marque >>> a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-marque >>> a');
      })
    ).toBeFalsy();
  });
});
