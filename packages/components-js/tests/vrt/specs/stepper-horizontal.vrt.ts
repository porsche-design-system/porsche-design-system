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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'stepper-horizontal', '/#stepper-horizontal')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('stepper-horizontal-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme: Theme) => `
        <p-stepper-horizontal theme="${theme}">
          <p-stepper-horizontal-item theme="${theme}" state="warning">Warning</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}" state="complete">Complete</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}" state="warning" disabled>Warning Disabled</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}" state="complete" disabled>Complete Disabled</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}" state="current">Current</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}">Default</p-stepper-horizontal-item>
        </p-stepper-horizontal>

        <p-stepper-horizontal theme="${theme}" size="medium">
          <p-stepper-horizontal-item theme="${theme}" state="warning">Warning</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}" state="complete">Complete</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}" state="warning" disabled>Warning Disabled</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}" state="complete" disabled>Complete Disabled</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}" state="current">Current</p-stepper-horizontal-item>
          <p-stepper-horizontal-item theme="${theme}">Default</p-stepper-horizontal-item>
        </p-stepper-horizontal>
        `;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

      await forceHoverState(page, '.hover p-stepper-horizontal p-stepper-horizontal-item >>> button');
      await forceFocusState(page, '.focus p-stepper-horizontal p-stepper-horizontal-item >>> button');
      await forceFocusHoverState(page, '.focus-hover p-stepper-horizontal p-stepper-horizontal-item >>> button');
    })
  ).toBeFalsy();
});
