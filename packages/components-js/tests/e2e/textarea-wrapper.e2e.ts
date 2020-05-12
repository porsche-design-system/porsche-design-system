import {
  addEventListener,
  getAttributeFromHandle, getBoxShadow,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem, waitForEventCallbacks, waitForInnerHTMLChange
} from './helpers';

describe('Textarea Wrapper', () => {
  beforeAll(async () => {
    await initAddEventListener(); // needed for setup
  });

  it('should render', async () => {
    await setContentWithDesignSystem(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const el = await selectNode('p-textarea-wrapper >>> label');
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await selectNode('p-textarea-wrapper textarea');
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-textarea-wrapper label="Some label" description="Some description">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await selectNode('p-textarea-wrapper textarea');
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-textarea-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await selectNode('p-textarea-wrapper textarea');
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-textarea-wrapper>
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`);

    const textareaComponent = await selectNode('p-textarea-wrapper');
    const getLabelText = () => selectNode('p-textarea-wrapper >>> .p-textarea-wrapper__label-text');

    expect(await getLabelText()).toBeNull();

    await textareaComponent.evaluate(el => el.setAttribute('label', 'Some label'));
    await waitForInnerHTMLChange(textareaComponent);

    expect(await getLabelText()).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`);

    const textareaComponent = await selectNode('p-textarea-wrapper');
    const getMessage = () => selectNode('p-textarea-wrapper >>> .p-textarea-wrapper__message');
    const textarea = await selectNode('textarea');

    expect(await getMessage()).toBeNull();

    await textareaComponent.evaluate(el => el.setAttribute('state', 'error'));
    await textareaComponent.evaluate(el => el.setAttribute('message', 'Some error message'));
    await waitForInnerHTMLChange(textareaComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBe('alert');
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label. Some error message');

    await textareaComponent.evaluate(el => el.setAttribute('state', 'success'));
    await textareaComponent.evaluate(el => el.setAttribute('message', 'Some success message'));
    await waitForInnerHTMLChange(textareaComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label. Some success message');

    await textareaComponent.evaluate(el => el.setAttribute('state', ''));
    await textareaComponent.evaluate(el => el.setAttribute('message', ''));
    await waitForInnerHTMLChange(textareaComponent);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(textarea, 'aria-label')).toBe('Some label');
  });

  it(`should focus textarea when label text is clicked`, async () => {
    await setContentWithDesignSystem(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);

    const labelText = await selectNode('p-textarea-wrapper >>> p-text');
    const textarea = await selectNode('textarea');

    let textareaFocusSpyCalls = 0;
    await addEventListener(textarea, 'focus', () => textareaFocusSpyCalls++);

    expect(textareaFocusSpyCalls).toBe(0);

    await labelText.click();
    await waitForEventCallbacks();

    expect(textareaFocusSpyCalls).toBe(1);
  });

  describe('hover state', () => {

    const getFakeTextarea = () => selectNode('p-textarea-wrapper >>> .p-textarea-wrapper__fake-textarea');

    it('should change box-shadow color when fake textarea is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`
        <p-textarea-wrapper label="Some label">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
      `);

      const fakeTextarea = await getFakeTextarea();
      const initialBoxShadow = await getBoxShadow(fakeTextarea);

      await fakeTextarea.hover();

      expect(await getBoxShadow(fakeTextarea, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake textarea when label text is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`
        <p-textarea-wrapper label="Some label">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
      `);

      const fakeTextarea = await getFakeTextarea();
      const labelText = await selectNode('p-textarea-wrapper >>> .p-textarea-wrapper__label-text');
      const initialBoxShadow = await getBoxShadow(fakeTextarea);

      await labelText.hover();

      expect(await getBoxShadow(fakeTextarea, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });
});
