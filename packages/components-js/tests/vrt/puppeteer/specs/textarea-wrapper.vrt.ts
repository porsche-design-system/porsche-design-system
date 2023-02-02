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

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'textarea-wrapper', '/#textarea-wrapper')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('textarea-wrapper-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          .playground div { display: flex; }
          .playground div > * { width: 40%; }
          p-textarea-wrapper:not(:last-child) {
            margin-right: 1rem;
            margin-bottom: 1rem;
          }
          textarea { min-height: initial; }
        </style>`;

      const child = '<textarea>Value</textarea>';
      const childReadonly = child.replace(/((?: \/)?>)/, ' readonly$1');
      const childDisabled = child.replace(/((?: \/)?>)/, ' disabled$1');

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <div>
          <p-textarea-wrapper label="Default" theme="${theme}">
            ${child}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Error" state="error" message="Error" theme="${theme}">
            ${child}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Success" state="success" message="Success" theme="${theme}">
            ${child}
          </p-textarea-wrapper>
        </div>
        <div>
          <p-textarea-wrapper label="Readonly" theme="${theme}">
            ${childReadonly}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Readonly Error" state="error" message="Error" theme="${theme}">
            ${childReadonly}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Readonly Success" state="success" message="Success" theme="${theme}">
            ${childReadonly}
          </p-textarea-wrapper>
        </div>
        <div>
          <p-textarea-wrapper label="Disabled" theme="${theme}">
            ${childDisabled}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Disabled Error" state="error" message="Error" theme="${theme}">
            ${childDisabled}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Disabled Success" state="success" message="Success" theme="${theme}">
            ${childDisabled}
          </p-textarea-wrapper>
        </div>
        <div>
          <p-textarea-wrapper theme="${theme}">
            <span slot="label">Slotted label with <a href="#">link</a></span>
            <span slot="description">Slotted description with <a href="#">link</a></span>
            ${child}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Error" description="Some description" state="error" theme="${theme}">
            ${child}
            <span slot="message">Slotted message with <a href="#">link</a></span>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Success" description="Some description" state="success" theme="${theme}">
            ${child}
            <span slot="message">Slotted message with <a href="#">link</a></span>
          </p-textarea-wrapper>
        </div>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-textarea-wrapper textarea');
      await forceHoverState(page, '.hover p-textarea-wrapper a');
      await forceFocusState(page, '.focus p-textarea-wrapper textarea');
      await forceFocusState(page, '.focus p-textarea-wrapper a');
      await forceFocusHoverState(page, '.focus-hover p-textarea-wrapper textarea');
      await forceFocusHoverState(page, '.focus-hover p-textarea-wrapper a');
    })
  ).toBeFalsy();
});
