import {
  getByLabelTextShadowed,
  getByRoleShadowed,
  getByTextShadowed,
} from '@porsche-design-system/components-js/testing';
import '@porsche-design-system/components-js/jsdom-polyfill';
import { componentsReady } from '@porsche-design-system/components-js';
import {fireEvent, getByRole, waitFor} from '@testing-library/dom';
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

  it('should work for nested button within p-input-password', async () => {
    document.body.innerHTML = `<p-input-password label="Some label" name="some-name" toggle="true"></p-input-password>`;
    await componentsReady();

    expect(getByRoleShadowed('button')).toBeInTheDocument();

    const input = document.querySelector('p-input-password')?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('password');
    getByRoleShadowed('button').click();
    await waitFor(() => {
      expect(input?.type).toBe('text');
    });
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

  it('should work for p-input-text', async () => {
    document.body.innerHTML = `<p-input-text label="Message" name="some-name"></p-input-text>`;
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

describe('getByRoleShadowed()', () => {
  it('should be supported for form components', async () => {
    document.body.innerHTML = `
<p-checkbox label="Checkbox" name="some-name"></p-checkbox>
<p-radio-group label="Radio Button" name="some-name">
  <p-radio-group-option value="a" label="Radio Option A"></p-radio-group-option>
  <p-radio-group-option value="b" label="Radio Option B"></p-radio-group-option>
  <p-radio-group-option value="c" label="Radio Option C"></p-radio-group-option>
</p-radio-group>
<p-input-text label="Text Field" name="some-name"></p-input-text>
<p-textarea label="Textarea" name="some-name"></p-textarea>`;
    await componentsReady();

    expect(getByRoleShadowed('checkbox', { name: 'Checkbox' })).toBeInTheDocument();
    expect(getByRoleShadowed('radio', { name: 'Radio Option A' })).toBeInTheDocument();
    expect(getByRoleShadowed('textbox', { name: 'Text Field' })).toBeInTheDocument();
    expect(getByRoleShadowed('textbox', { name: 'Textarea' })).toBeInTheDocument();
  });

  it('should be supported for p-button with role button', async () => {
    document.body.innerHTML = `<p-button role="button">Button</p-button>`;
    await componentsReady();

    expect(getByRole(document.body, 'button', { name: 'Button' })).toBeInTheDocument();
  });

  it('should be supported for p-select', async () => {
    const callback = vi.fn();

    document.body.innerHTML = `<p-select name="options" label="Some Label">
  <p-select-option value="a">Option A</p-select-option>
  <p-select-option value="b">Option B</p-select-option>
  <p-select-option value="c">Option C</p-select-option>
</p-select>`;
    await componentsReady();

    const selectEl: HTMLElement | null = document.querySelector('p-select');
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
