import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared-src/src/testing/vrt';
import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import type { GetMarkup } from '../helpers';
import { openPopoversAndSetBackground } from '@porsche-design-system/shared-src/src/testing/puppeteer-vrt-helper';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'popover', '/#popover', {
      scenario: openPopoversAndSetBackground,
      initialViewportHeight: 800,
    })
  ).toBeFalsy();
});

it('should have no visual regression on popover-overview for viewport 1760', async () => {
  expect(
    await vrtTest(getVisualRegressionTester(1760), 'popover-overview', '/#popover-overview', {
      scenario: (page) => openPopoversAndSetBackground(page, true),
      initialViewportHeight: 800,
      elementSelector: '',
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('popover-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetMarkup = () => `
        <p-popover>Some Content with <a>Link</a></p-popover>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup));
      await openPopoversAndSetBackground(page);

      await forceHoveredState(page, '.hovered > p-popover >>> p-button-pure >>> button');
      await forceHoveredState(page, '.hovered > p-popover > a');
      await forceFocusedState(page, '.focused > p-popover >>> p-button-pure >>> button');
      await forceFocusedState(page, '.focused > p-popover > a');
      await forceFocusedHoveredState(page, '.focused-hovered > p-popover >>> p-button-pure >>> button');
      await forceFocusedHoveredState(page, '.focused-hovered > p-popover > a');
    })
  ).toBeFalsy();
});
