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
import { selectNode } from '../../../e2e/puppeteer/helpers';

export const multiSelectScenario = async (page): Promise<void> => {
  await page.evaluate(() => (window as any).componentsReady());
  // Call click on the shadow root input so isOutsideClick won't close the dropdowns
  await page.$$eval('p-multi-select.open', async (selects) =>
    selects.forEach((el: HTMLElement) => (el.shadowRoot.querySelector('INPUT') as HTMLElement).click())
  );
  // Highlight second option
  await page.$$eval('p-multi-select.highlight', async (selects) =>
    selects.forEach((select) => select.children[1].shadowRoot.firstElementChild.classList.add('option--highlighted'))
  );
  // Select options with value "c"
  await page.$$eval('p-multi-select.selected', async (selects) =>
    selects.forEach((select: any) => (select.value = ['c']))
  );
  // Select multiple options
  await page.$$eval('p-multi-select.selected-multiple', async (selects) =>
    selects.forEach((select: any) => (select.value = ['a', 'b', 'c', 'd', 'e', 'f']))
  );

  // Type into inputs
  await (await selectNode(page, 'p-multi-select.no-results-1 >>> input')).type('No matching option');
  await (await selectNode(page, 'p-multi-select.no-results-2 >>> input')).type('No matching option');
};

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'multi-select', '/#multi-select', {
      scenario: async (page) => {
        await multiSelectScenario(page);
      },
    })
  ).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('multi-select-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
        body { display: grid; grid-template-columns: repeat(2, 50%); }
        .playground div {
          display: flex;
        }
        p-multi-select:not(:last-child) {
          margin-right: 1rem;
          margin-bottom: 1rem;
        }
      </style>`;
      const getSelectMarkup = (): string => `
            <p-multi-select-option value="a">Option A</p-multi-select-option>`;

      const getSlottedMarkup = (opts?: { disabled?: boolean }): string => `
<span slot="label">${
        opts?.disabled ? 'Disabled slotted' : 'Slotted'
      } label <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>
<span slot="description">Slotted description <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>
<span slot="message">Slotted message <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <div>
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label">
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label" state="error" message="Some error message.">
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label" state="success" message="Some success message.">
            ${getSelectMarkup()}
          </p-multi-select>
        </div>
        <div>
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" disabled>
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" state="error" message="Some error message." disabled>
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" state="success" message="Some success message." disabled>
            ${getSelectMarkup()}
          </p-multi-select>
        </div>
        <div>
          <p-multi-select name="options" theme="${theme}">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" state="error">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" state="success">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
        </div>
        <div>
          <p-multi-select name="options" theme="${theme}" disabled>
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" state="error" disabled>
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" state="success" disabled>
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
        </div>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-multi-select');
      await forceHoverState(page, '.hover p-multi-select span a');
      await forceHoverState(page, '.hover p-multi-select-option');
      await forceFocusState(page, '.focus p-multi-select select');
      await forceFocusState(page, '.focus p-multi-select span a');
      await forceFocusState(page, '.focus p-multi-select >>> input');
      await forceFocusHoverState(page, '.focus-hover p-multi-select select');
      await forceFocusHoverState(page, '.focus-hover p-multi-select span a');
      // actual user interaction happens on multiple nodes that's why forceFocusedHoveredState is wrong
      await forceHoverState(page, '.focus-hover p-multi-select >>> input');
    })
  ).toBeFalsy();
});
