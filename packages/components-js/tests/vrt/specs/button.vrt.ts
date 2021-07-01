import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

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

        const head = `<style type="text/css">p-button:not(:last-child) { margin-right: 0.5rem; }</style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-button theme="${theme}" variant="primary">Primary</p-button>
          <p-button theme="${theme}" variant="secondary">Secondary</p-button>
          <p-button theme="${theme}" variant="tertiary">Tertiary</p-button>
          <p-button theme="${theme}" variant="primary" loading>Loading Primary</p-button>
          <p-button theme="${theme}" variant="secondary" loading>Loading Secondary</p-button>
          <p-button theme="${theme}" variant="tertiary" loading>Loading Tertiary</p-button>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-button >>> button');
        await forceFocusedState(page, '.focused > p-button >>> button');
        await forceFocusedHoveredState(page, '.focused-hovered > p-button >>> button');
      })
    ).toBeFalsy();
  });
});
