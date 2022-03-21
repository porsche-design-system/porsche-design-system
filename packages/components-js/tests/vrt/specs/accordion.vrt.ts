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
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import type { Theme } from '@porsche-design-system/utilities-v2';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'accordion', '/#accordion')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('accordion-states', async () => {
      const page = vrt.getPage();

      const content = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.`;

      const getElementsMarkup: GetThemedMarkup = (theme: Theme) => `
        <p-accordion theme="${theme}" heading="Some heading">
          ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Some heading" open="true">
          ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Some compact accordion" open="true" compact="true">
           ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Some navigation like accordion" open="true" compact="true">
          <p-link-pure href="https://www.porsche.com" theme="${theme}">Some link</p-link-pure>
          <br />
          <p-link-pure href="https://www.porsche.com" theme="${theme}">Some link</p-link-pure>
        </p-accordion>`;

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric'] })
      );

      await forceHoverState(page, '.hover > p-accordion >>> button');
      await forceHoverState(page, '.hover > p-accordion > p-link-pure >>> a');

      await forceFocusState(page, '.focus > p-accordion >>> button');
      await forceFocusState(page, '.focus > p-accordion > p-link-pure >>> a');

      await forceFocusHoverState(page, '.focus-hover > p-accordion >>> button');
      await forceFocusHoverState(page, '.focus-hover > p-accordion > p-link-pure >>> a');
    })
  ).toBeFalsy();
});
