import {
  addEventListener,
  getAttributeFromHandle, getElementStyle,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem, waitForEventCallbacks, waitForInnerHTMLChange
} from '../helpers';
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';

describe('Textarea Wrapper', () => {

  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getTextareaHost = () => selectNode(page, 'p-textarea-wrapper');
  const getTextareaFakeInput = () => selectNode(page, 'p-textarea-wrapper >>> .p-textarea-wrapper__fake-textarea');
  const getTextareaRealInput = () => selectNode(page, 'p-textarea-wrapper textarea');
  const getTextareaMessage = () => selectNode(page, 'p-textarea-wrapper >>> .p-textarea-wrapper__message');
  const getTextareaLabel = () => selectNode(page, 'p-textarea-wrapper >>> .p-textarea-wrapper__label-text');

  it('should render', async () => {
    await setContentWithDesignSystem(page, `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const el = await getTextareaLabel();
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(page, `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await getTextareaRealInput();
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(page, `
      <p-textarea-wrapper label="Some label" description="Some description">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await getTextareaRealInput();
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(page, `
      <p-textarea-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await getTextareaRealInput();
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(page, `
      <p-textarea-wrapper>
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`);

    const textareaComponent = await getTextareaHost();

    expect(await getTextareaLabel()).toBeNull();

    await textareaComponent.evaluate(el => el.setAttribute('label', 'Some label'));
    await waitForInnerHTMLChange(page, textareaComponent);

    expect(await getTextareaLabel()).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(page, `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`);

    const textareaComponent = await getTextareaHost();
    const textarea = await getTextareaRealInput();

    expect(await getTextareaMessage()).toBeNull();

    await textareaComponent.evaluate(el => el.setAttribute('state', 'error'));
    await textareaComponent.evaluate(el => el.setAttribute('message', 'Some error message'));
    await waitForInnerHTMLChange(page, textareaComponent);

    expect(await getTextareaMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getTextareaMessage(), 'role')).toBe('alert');
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label. Some error message');

    await textareaComponent.evaluate(el => el.setAttribute('state', 'success'));
    await textareaComponent.evaluate(el => el.setAttribute('message', 'Some success message'));
    await waitForInnerHTMLChange(page, textareaComponent);

    expect(await getTextareaMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getTextareaMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label. Some success message');

    await textareaComponent.evaluate(el => el.setAttribute('state', ''));
    await textareaComponent.evaluate(el => el.setAttribute('message', ''));
    await waitForInnerHTMLChange(page, textareaComponent);

    expect(await getTextareaMessage()).toBeNull();
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label');
  });

  it(`should focus textarea when label text is clicked`, async () => {
    await setContentWithDesignSystem(page, `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);

    const labelText = await getTextareaLabel();
    const textarea = await getTextareaRealInput();

    let textareaFocusSpyCalls = 0;
    await addEventListener(textarea, 'focus', () => textareaFocusSpyCalls++);

    expect(textareaFocusSpyCalls).toBe(0);

    await labelText.click();
    await waitForEventCallbacks(page);

    expect(textareaFocusSpyCalls).toBe(1);
  });

  describe('hover state', () => {

    it('should change box-shadow color when fake textarea is hovered', async () => {
      await setContentWithDesignSystem(page, `
        <p-textarea-wrapper label="Some label">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
      `);

      const fakeTextarea = await getTextareaFakeInput();
      const initialBoxShadow = await getElementStyle(fakeTextarea, 'boxShadow');

      await fakeTextarea.hover();

      expect(await getElementStyle(fakeTextarea, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake textarea when label text is hovered', async () => {
      await setContentWithDesignSystem(page, `
        <p-textarea-wrapper label="Some label">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
      `);

      const fakeTextarea = await getTextareaFakeInput();
      const labelText = await getTextareaLabel();
      const initialBoxShadow = await getElementStyle(fakeTextarea, 'boxShadow');

      await labelText.hover();

      expect(await getElementStyle(fakeTextarea, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });
  });
});
