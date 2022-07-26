import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  itIfSkeletonsActive,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'text-field-wrapper', '/#text-field-wrapper')).toBeFalsy();
});

itIfSkeletonsActive('should have no visual regression for skeleton', async () => {
  expect(
    await vrtTest(getVisualRegressionSkeletonTester(), 'text-field-wrapper-skeleton', '/#text-field-wrapper-skeleton')
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('text-field-wrapper-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          .playground div, .playground form { display: flex; }
          .playground div > *, .playground form > * { width: 40%; }
          p-text-field-wrapper:not(:last-child) {
            margin-right: 1rem;
            margin-bottom: 1rem;
          }
        </style>`;

      const child = '<input type="text" value="Value" />';
      const childReadonly = child.replace(/((?: \/)?>)/, ' readonly$1');
      const childDisabled = child.replace(/((?: \/)?>)/, ' disabled$1');

      const getElementsMarkup: GetMarkup = () => `
        <div>
          <p-text-field-wrapper label="Text empty">
            <input type="text" />
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Password empty">
            <input type="password" />
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Search empty">
            <input type="search" />
          </p-text-field-wrapper>
        </div>
        <form>
          <p-text-field-wrapper label="Text in form">
            ${child}
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Password in form">
            <input type="password" value="Value" />
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Search in form">
            <input type="search" value="Value" />
          </p-text-field-wrapper>
        </form>
        <div>
          <p-text-field-wrapper label="Default">
            ${child}
          </p-text-field-wrapper>
          <p-text-field-wrapper class="toggle-password" label="Password">
            <input type="password" value="Value" />
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Search">
            <input type="search" value="Value" />
          </p-text-field-wrapper>
        </div>
        <div>
          <p-text-field-wrapper label="Default">
            ${child}
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Error" state="error" message="Error">
            ${child}
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Success" state="success" message="Success">
            ${child}
          </p-text-field-wrapper>
        </div>
        <div>
          <p-text-field-wrapper label="Readonly">
            ${childReadonly}
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Readonly Error" state="error" message="Error">
            ${childReadonly}
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Readonly Success" state="success" message="Success">
            ${childReadonly}
          </p-text-field-wrapper>
        </div>
        <div>
          <p-text-field-wrapper label="Disabled">
            ${childDisabled}
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Disabled Error" state="error" message="Error">
            ${childDisabled}
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Disabled Success" state="success" message="Success">
            ${childDisabled}
          </p-text-field-wrapper>
        </div>
        <div>
          <p-text-field-wrapper>
            <span slot="label">Slotted label with <a href="#">link</a></span>
            <span slot="description">Slotted description with <a href="#">link</a></span>
            ${child}
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Error" description="Some description" state="error">
            ${child}
            <span slot="message">Slotted message with <a href="#">link</a></span>
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Success" description="Some description" state="success">
            ${child}
            <span slot="message">Slotted message with <a href="#">link</a></span>
          </p-text-field-wrapper>
        </div>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      // let's toggle some password fields
      const textFieldWrappers = await page.$$('.toggle-password');
      await Promise.all(
        textFieldWrappers.map(
          async (item) =>
            (
              await item.evaluateHandle((el) => el.shadowRoot.querySelector('button[type=button]'))
            ).evaluate((el: HTMLElement) => el.click()) // js element.click() instead of puppeteer ElementHandle.click() to workaround element off screen issue
        )
      );

      // get rid of focus from last .toggle-password input
      await page.mouse.click(0, 0);

      await forceHoverState(page, '.hover p-text-field-wrapper input');
      await forceHoverState(page, '.hover p-text-field-wrapper a');
      await forceHoverState(page, '.hover p-text-field-wrapper >>> button');
      await forceFocusState(page, '.focus p-text-field-wrapper input');
      await forceFocusState(page, '.focus p-text-field-wrapper a');
      await forceFocusState(page, '.focus p-text-field-wrapper >>> button');
      await forceFocusHoverState(page, '.focus-hover p-text-field-wrapper input');
      await forceFocusHoverState(page, '.focus-hover p-text-field-wrapper a');
      await forceFocusHoverState(page, '.focus-hover p-text-field-wrapper >>> button');
    })
  ).toBeFalsy();
});
