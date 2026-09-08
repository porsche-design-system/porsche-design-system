import {
  getByLabelTextShadowed,
  getByRoleShadowed,
  getByTextShadowed,
  screen,
} from '@porsche-design-system/components-js/testing';
import '@porsche-design-system/components-js/jsdom-polyfill';
import { componentsReady } from '@porsche-design-system/components-js';
import * as pdsTesting from '@porsche-design-system/components-js/testing';
import { fireEvent, getByRole, waitFor } from '@testing-library/dom';
import { describe, expect, it, vi } from 'vitest';

const describeExports = (module: object): string[] =>
  Object.entries(module)
    .map(([name, value]) => `${name}: ${typeof value}`)
    .sort();

describe('export surface', () => {
  // Everything re-exported from shadow-dom-testing-library, so a dependency update shows up as a reviewable diff
  // instead of a silent change. `screen` is expanded too because it carries its own document-bound queries.
  it('should match snapshot', () => {
    expect({ exports: describeExports(pdsTesting), screen: describeExports(screen) }).toMatchSnapshot();
  });

  it('should keep the three deprecated aliases', () => {
    expect(typeof pdsTesting.getByRoleShadowed).toBe('function');
    expect(typeof pdsTesting.getByLabelTextShadowed).toBe('function');
    expect(typeof pdsTesting.getByTextShadowed).toBe('function');
  });
});

describe('optional container as first argument', () => {
  it('should scope getByRoleShadowed to the given container', async () => {
    document.body.innerHTML = `<div id="a"><p-button>A</p-button></div><div id="b"><p-button>B</p-button></div>`;
    await componentsReady();

    const containerB = document.getElementById('b') as HTMLElement;
    expect(getByRoleShadowed(containerB, 'button')).toBeInTheDocument();
    expect(() => getByRoleShadowed('button')).toThrow(/multiple/i);
  });

  it('should scope getByTextShadowed to the given container', async () => {
    document.body.innerHTML = `<div id="a"><p-accordion><h3 slot="summary">Only here</h3><p>x</p></p-accordion></div><div id="b"></div>`;
    await componentsReady();

    const containerA = document.getElementById('a') as HTMLElement;
    const containerB = document.getElementById('b') as HTMLElement;
    expect(getByTextShadowed(containerA, 'Only here')).toBeInTheDocument();
    expect(() => getByTextShadowed(containerB, 'Only here')).toThrow(/Unable to find/i);
  });

  it('should scope getByLabelTextShadowed to the given container and keep the element type generic', async () => {
    document.body.innerHTML = `<div id="a"><p-input-text label="Message" name="n"></p-input-text></div>`;
    await componentsReady();

    const containerA = document.getElementById('a') as HTMLElement;
    const el = getByLabelTextShadowed<HTMLInputElement>(containerA, 'Message');
    expect(el).toBeInTheDocument();
    expect(el.type).toBe('text');
  });

  it('should still default to the whole document when no container is passed', async () => {
    document.body.innerHTML = `<p-button>Button</p-button>`;
    await componentsReady();

    expect(getByRoleShadowed('button')).toBeInTheDocument();
  });
});

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
    document.body.innerHTML = `<p-accordion><h3 slot="summary">Some summary</h3><p>Some details</p></p-accordion>`;
    await componentsReady();

    const el = getByTextShadowed('Some summary');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('H3');
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
