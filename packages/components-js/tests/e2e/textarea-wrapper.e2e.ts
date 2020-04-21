import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('Textarea Wrapper', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const el = await page.find('p-textarea-wrapper >>> label');
    expect(el).not.toBeNull();
  });

  it('should add aria-label to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await page.find('p-textarea-wrapper textarea');
    expect(textarea.getAttribute('aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-textarea-wrapper label="Some label" description="Some description">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await page.find('p-textarea-wrapper textarea');
    expect(textarea.getAttribute('aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-textarea-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const textarea = await page.find('p-textarea-wrapper textarea');
    expect(textarea.getAttribute('aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-textarea-wrapper>
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`);

    const textareaComponent = await page.find('p-textarea-wrapper');
    const getLabelText = async () => {
      return textareaComponent.shadowRoot.querySelector('.p-textarea-wrapper__label-text');
    };

    expect(await getLabelText()).toBeNull();

    textareaComponent.setProperty('label', 'Some label');

    await page.waitForChanges();

    expect(await getLabelText()).not.toBeNull();

  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`);

    const textareaComponent = await page.find('p-textarea-wrapper');
    const getMessage = async () => {
      return textareaComponent.shadowRoot.querySelector('.p-textarea-wrapper__message');
    };

    const getTextarea = async () => {
      return textareaComponent.find('textarea');
    };

    expect(await getMessage()).toBeNull();

    textareaComponent.setProperty('state', 'error');
    textareaComponent.setProperty('message', 'Some error message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).toEqualAttribute('role', 'alert');
    expect(await getTextarea()).toEqualAttribute('aria-label','Some label. Some error message');

    textareaComponent.setProperty('state', 'success');
    textareaComponent.setProperty('message', 'Some success message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).not.toHaveAttribute('role');
    expect(await getTextarea()).toEqualAttribute('aria-label','Some label. Some success message');

    textareaComponent.setProperty('state', 'none');
    textareaComponent.setProperty('message', '');

    await page.waitForChanges();

    expect(await getMessage()).toBeNull();
    expect(await getTextarea()).toEqualAttribute('aria-label','Some label');

  });

  it(`should focus textarea when label text is clicked`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `);
    const labelText = await page.find('p-textarea-wrapper >>> label > p-text');
    const textarea = await page.find('textarea');
    const textareaFocusSpy = await textarea.spyOnEvent('focus');

    expect(textareaFocusSpy.length).toBe(0);

    await labelText.click();

    expect(textareaFocusSpy.length).toBe(1);
  });

  describe('hover state', () => {
    const getBoxShadow = async (page: E2EPage) => {
      const fakeTextarea = await page.find('p-textarea-wrapper >>> .p-textarea-wrapper__fake-textarea');
      const styles = await fakeTextarea.getComputedStyle();
      return styles.boxShadow;
    };

    it('should change box-shadow color when fake textarea is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <p-textarea-wrapper label="Some label">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
      `);

      const fakeTextarea = await page.find('p-textarea-wrapper >>> .p-textarea-wrapper__fake-textarea');

      const initialBoxShadow = await getBoxShadow(page);

      await fakeTextarea.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake textarea when label text is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <p-textarea-wrapper label="Some label">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>
      `);

      const labelText = await page.find('p-textarea-wrapper >>> .p-textarea-wrapper__label-text');

      const initialBoxShadow = await getBoxShadow(page);

      await labelText.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });
  });
});
