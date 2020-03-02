import { newE2EPage } from '@stencil/core/testing';

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
});
