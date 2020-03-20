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

  it('should add/remove message text and add/remove aria attributes to message if state changes programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`);

    const textareaComponent = await page.find('p-textarea-wrapper');
    const getMessage = async () => {
      return textareaComponent.shadowRoot.querySelector('.p-textarea-wrapper__message');
    };

    expect(await getMessage()).toBeNull();

    textareaComponent.setProperty('state', 'error');
    textareaComponent.setProperty('message', 'some message');

    await page.waitForChanges();

    const label = await page.find('p-textarea-wrapper >>> .p-textarea-wrapper__label');
    const labelId = label.getAttribute('id');

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).toEqualAttributes({ 'role': 'alert', 'aria-describedby': labelId });

    textareaComponent.setProperty('state', 'success');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).not.toHaveAttribute('role');
    expect(await getMessage()).not.toHaveAttribute('aria-describedby');

    textareaComponent.setProperty('state', 'none');

    await page.waitForChanges();

    expect(await getMessage()).toBeNull();

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

      const fakeTextarea = await page.find('p-textarea-wrapper >>> .p-textarea-wrapper__label-text');

      const initialBoxShadow = await getBoxShadow(page);

      await fakeTextarea.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);

    });

  });
});
