import {
  forceFocusedState,
  getBodyMarkup,
  GetMarkup,
  getVisualRegressionMarque2xTester,
  getVisualRegressionMarque3xTester,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

describe('Marque', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'marque',
        async () => {
          await vrt.goTo('/#marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression on retina 2x display', async () => {
    const vrt = getVisualRegressionMarque2xTester();
    expect(
      await vrt.test(
        'marque-2x',
        async () => {
          await vrt.goTo('/#marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression on retina 3x display', async () => {
    const vrt = getVisualRegressionMarque3xTester();
    expect(
      await vrt.test(
        'marque-3x',
        async () => {
          await vrt.goTo('/#marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('marque-states', async () => {
        const page = await vrt.getPage();
        const getElementsMarkup: GetMarkup = () => `<p-marque href="https://www.porsche.com"></p-marque>`;
        await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup));

        await forceFocusedState(page, '.focused > p-marque >>> a');
      })
    ).toBeFalsy();
  });
});
