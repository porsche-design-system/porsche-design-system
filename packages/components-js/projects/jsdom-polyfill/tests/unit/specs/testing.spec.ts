import {
  getByLabelTextShadowed,
  getByRoleShadowed,
  getByTextShadowed,
} from '@porsche-design-system/components-js/testing';
import '@porsche-design-system/components-js/jsdom-polyfill';
import { componentsReady } from '@porsche-design-system/components-js';
import { fireEvent, getByRole } from '@testing-library/dom';
import { vi } from 'vitest';

describe('getByRoleShadowed()', () => {
  it('should work for native button', async () => {
    document.body.innerHTML = `<button>Button</button>`;

    expect(getByRoleShadowed('button')).toBeInTheDocument();
  });

  it('should work for p-button', async () => {
    document.body.innerHTML = `<p-button>Button</p-button>`;
    await componentsReady();

    expect(getByRoleShadowed('button')).toBeInTheDocument();
  });

  it('should work for nested button within p-text-field-wrapper', async () => {
    document.body.innerHTML = `<p-text-field-wrapper>
  <input type="password" />
</p-text-field-wrapper>`;
    await componentsReady();

    expect(getByRoleShadowed('button')).toBeInTheDocument();

    const input = document.querySelector('input');
    expect(input.type).toBe('password');
    await getByRoleShadowed('button').click();
    expect(input.type).toBe('text');
  });
});

describe('getByLabelTextShadowed()', () => {
  it('should work for native input', async () => {
    document.body.innerHTML = `<label>
  Message
  <input type="text" />
</label>`;

    const el = getByLabelTextShadowed<HTMLInputElement>('Message');
    expect(el).toBeInTheDocument();
    expect(el.type).toBe('text');
  });

  it('should work for p-text-field-wrapper', async () => {
    document.body.innerHTML = `<p-text-field-wrapper label="Message">
  <input type="text" />
</p-text-field-wrapper>`;
    await componentsReady();

    const el = getByLabelTextShadowed<HTMLInputElement>('Message');
    expect(el).toBeInTheDocument();
    expect(el.type).toBe('text');
  });
});

describe('getByTextShadowed()', () => {
  it('should work for native h1', async () => {
    document.body.innerHTML = `<h1>Headline</h1>`;

    const el = getByTextShadowed('Headline');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('H1');
  });

  it('should work for p-accordion', async () => {
    document.body.innerHTML = `<p-accordion heading="Headline">Content</p-accordion>`;
    await componentsReady();

    const el = getByTextShadowed('Headline');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('BUTTON');
  });
});

describe('getByRole()', () => {
  it('should be supported for most form wrappers', async () => {
    document.body.innerHTML = `
<p-checkbox-wrapper label="Checkbox">
  <input type="checkbox" />
</p-checkbox-wrapper>
<p-radio-button-wrapper label="Radio Button">
  <input type="radio" />
</p-radio-button-wrapper>
<p-text-field-wrapper label="Text Field">
  <input type="text" />
</p-text-field-wrapper>
<p-textarea-wrapper label="Textarea">
  <textarea />
</p-textarea-wrapper>`;
    await componentsReady();

    expect(getByRole(document.body, 'checkbox', { name: 'Checkbox' })).toBeInTheDocument();
    expect(getByRole(document.body, 'radio', { name: 'Radio Button' })).toBeInTheDocument();
    expect(getByRole(document.body, 'textbox', { name: 'Text Field' })).toBeInTheDocument();
    expect(getByRole(document.body, 'textbox', { name: 'Textarea' })).toBeInTheDocument();
  });

  it('should be supported for p-button with role button', async () => {
    document.body.innerHTML = `<p-button role="button">Button</p-button>`;
    await componentsReady();

    expect(getByRole(document.body, 'button', { name: 'Button' })).toBeInTheDocument();
  });

  it('should be supported for p-select-wrapper', async () => {
    const callback = vi.fn();

    document.body.innerHTML = `<p-select-wrapper>
  <select value="1">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</p-select-wrapper>`;
    await componentsReady();

    const selectEl: HTMLSelectElement | null = document.querySelector('select');
    selectEl?.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLSelectElement | null;
      callback(target?.value);
    });

    if (selectEl) {
      fireEvent.change(selectEl, { target: { value: '2' } });
    }

    expect(callback).toHaveBeenCalledWith('2');
  });
});
