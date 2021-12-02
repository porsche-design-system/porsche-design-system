import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'link', '/#link')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('link-states', async () => {
      const page = vrt.getPage();

      const head = `<style type="text/css">p-link:not(:last-child) { margin-right: 0.5rem; margin-bottom: 0.5rem; }</style>`;

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
        getThemedBodyMarkup(getElementsMarkup, { theme: ['light', 'dark', 'light-electric'] }),
        {
          injectIntoHead: head,
        }
      );

      await forceHoveredState(page, '.hovered > p-link >>> a');
      await forceHoveredState(page, '.hovered > p-link >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceFocusedState(page, '.focused > p-link >>> a');
      await forceFocusedState(page, '.focused > p-link a');
      await forceFocusedHoveredState(page, '.focused-hovered > p-link >>> a');
      await forceHoveredState(page, '.focused-hovered > p-link >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceFocusedHoveredState(page, '.focused-hovered > p-link a');
    })
  ).toBeFalsy();
});
