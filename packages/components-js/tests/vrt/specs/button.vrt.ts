import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  itSkipSkeletons,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'button', '/#button')).toBeFalsy();
});

itSkipSkeletons('should have no visual regression for skeleton', async () => {
  expect(await vrtTest(getVisualRegressionSkeletonTester(), 'button-skeleton', '/#button-skeleton')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('button-states', async () => {
      const page = vrt.getPage();

      const head = `<style>p-button:not(:last-child) { margin-right: 0.5rem; }</style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-button theme="${theme}" variant="primary">Primary</p-button>
        <p-button theme="${theme}" variant="secondary">Secondary</p-button>
        <p-button theme="${theme}" variant="tertiary">Tertiary</p-button>
        <p-button theme="${theme}" variant="primary" loading>Loading Primary</p-button>
        <p-button theme="${theme}" variant="secondary" loading>Loading Secondary</p-button>
        <p-button theme="${theme}" variant="tertiary" loading>Loading Tertiary</p-button>`;

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric'] }),
        { injectIntoHead: head }
      );

      await forceHoverState(page, '.hover > p-button >>> button');
      await forceFocusState(page, '.focus > p-button'); // native outline should not be visible
      await forceFocusState(page, '.focus > p-button >>> button');
      await forceFocusHoverState(page, '.focus-hover > p-button >>> button');
    })
  ).toBeFalsy();
});
