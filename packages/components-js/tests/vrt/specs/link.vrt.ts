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
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'link', '/#link')).toBeFalsy();
});

it('should have no visual regression for skeleton', async () => {
  expect(await vrtTest(getVisualRegressionSkeletonTester(), 'link-skeleton', '/#link-skeleton')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('link-states', async () => {
      const page = vrt.getPage();

      const head = `<style>p-link:not(:last-child) { margin-right: 0.5rem; margin-bottom: 0.5rem; }</style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-link theme="${theme}" variant="primary" href="#">Primary</p-link>
        <p-link theme="${theme}" variant="primary">
          <a href="#">Slotted Primary</a>
        </p-link>
        <p-link theme="${theme}" variant="primary" hide-label="true" href="#">Primary</p-link>
        <p-link theme="${theme}" variant="primary" hide-label="true">
          <a href="#">Slotted Primary</a>
        </p-link>
        <p-link theme="${theme}" variant="secondary" href="#">Secondary</p-link>
        <p-link theme="${theme}" variant="secondary">
          <a href="#">Slotted Secondary</a>
        </p-link>
        <p-link theme="${theme}" variant="secondary" hide-label="true" href="#">Secondary</p-link>
        <p-link theme="${theme}" variant="secondary" hide-label="true">
          <a href="#">Slotted Secondary</a>
        </p-link>
        <p-link theme="${theme}" variant="tertiary" href="#">Tertiary</p-link>
        <p-link theme="${theme}" variant="tertiary">
          <a href="#">Slotted Tertiary</a>
        </p-link>
        <p-link theme="${theme}" variant="tertiary" hide-label="true" href="#">Tertiary</p-link>
        <p-link theme="${theme}" variant="tertiary" hide-label="true">
          <a href="#">Slotted Tertiary</a>
        </p-link>`;

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric'] }),
        {
          injectIntoHead: head,
        }
      );

      await forceHoverState(page, '.hover > p-link >>> a');
      await forceHoverState(page, '.hover > p-link >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceFocusState(page, '.focus > p-link'); // native outline should not be visible
      await forceFocusState(page, '.focus > p-link >>> a');
      await forceFocusState(page, '.focus > p-link a');
      await forceFocusHoverState(page, '.focus-hover > p-link >>> a');
      await forceHoverState(page, '.focus-hover > p-link >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceFocusHoverState(page, '.focus-hover > p-link a');
    })
  ).toBeFalsy();
});
