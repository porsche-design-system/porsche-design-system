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

// TODO: (link states test is flaky) we shouldn't rely on retries since computed result has to be deterministic
jest.retryTimes(3);

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'link', '/#link')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('link-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
          p-link:not(:last-child) { margin-right: 1rem; margin-bottom: 1rem; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-link theme="${theme}" variant="primary" href="#">Primary</p-link>
        <p-link theme="${theme}" variant="primary">
          <a href="#">Slotted Primary</a>
        </p-link>
        <p-link theme="${theme}" variant="primary" href="#" icon="arrow-right">Primary with icon</p-link>
        <p-link theme="${theme}" variant="primary" icon="arrow-right">
          <a href="#">Slotted Primary with icon</a>
        </p-link>
        <p-link theme="${theme}" variant="primary" hide-label="true" icon="arrow-right" href="#">Primary</p-link>
        <p-link theme="${theme}" variant="primary" hide-label="true" icon="arrow-right">
          <a href="#">Slotted Primary</a>
        </p-link>
        <p-link theme="${theme}" variant="secondary" href="#">Secondary</p-link>
        <p-link theme="${theme}" variant="secondary">
          <a href="#">Slotted Secondary</a>
        </p-link>
        <p-link theme="${theme}" variant="secondary" href="#" icon="arrow-right">Secondary with icon</p-link>
        <p-link theme="${theme}" variant="secondary" icon="arrow-right">
          <a href="#">Slotted Secondary with icon</a>
        </p-link>
        <p-link theme="${theme}" variant="secondary" hide-label="true" icon="arrow-right" href="#">Secondary</p-link>
        <p-link theme="${theme}" variant="secondary" hide-label="true" icon="arrow-right">
          <a href="#">Slotted Secondary</a>
        </p-link>
        <p-link theme="${theme}" variant="tertiary" href="#">Tertiary</p-link>
        <p-link theme="${theme}" variant="tertiary">
          <a href="#">Slotted Tertiary</a>
        </p-link>
        <p-link theme="${theme}" variant="tertiary" href="#" icon="arrow-right">Tertiary with icon</p-link>
        <p-link theme="${theme}" variant="tertiary" icon="arrow-right">
          <a href="#">Slotted Tertiary with icon</a>
        </p-link>
        <p-link theme="${theme}" variant="tertiary" hide-label="true" icon="arrow-right" href="#">Tertiary</p-link>
        <p-link theme="${theme}" variant="tertiary" hide-label="true" icon="arrow-right">
          <a href="#">Slotted Tertiary</a>
        </p-link>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-link >>> a');
      await forceHoverState(page, '.hover p-link >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceFocusState(page, '.focus p-link'); // native outline should not be visible
      await forceFocusState(page, '.focus p-link >>> a');
      await forceFocusState(page, '.focus p-link a');
      await forceFocusHoverState(page, '.focus-hover p-link >>> a');
      await forceHoverState(page, '.focus-hover p-link >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceFocusHoverState(page, '.focus-hover p-link a');

      // TODO: scenario like style="width: 200px" on parent missing?
    })
  ).toBeFalsy();
});
