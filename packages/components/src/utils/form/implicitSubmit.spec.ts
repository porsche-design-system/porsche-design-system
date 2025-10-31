import { vi } from 'vitest';
import { implicitSubmit } from './implicitSubmit';

describe('implicitSubmit', () => {
  let mockClick: ReturnType<typeof vi.fn>;
  let mockRequestSubmit: ReturnType<typeof vi.fn>;
  let form: HTMLFormElement;
  let internals: { form: HTMLFormElement };
  let host: HTMLElement;

  beforeEach(() => {
    mockClick = vi.fn();
    mockRequestSubmit = vi.fn();

    form = document.createElement('form');
    (form as any).requestSubmit = mockRequestSubmit;

    internals = { form } as any;

    host = document.createElement('p-input-text');
  });

  it('does nothing if key is not Enter', () => {
    const event = new KeyboardEvent('keydown', { key: 'a' });
    implicitSubmit(event, internals as any, host);
    expect(mockClick).not.toHaveBeenCalled();
    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing if form is not present', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    implicitSubmit(event, { form: null } as any, host);
    expect(mockClick).not.toHaveBeenCalled();
    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('clicks a native submit button', () => {
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.matches = vi.fn().mockReturnValue(true);
    submitButton.click = mockClick;

    form.appendChild(submitButton);

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    implicitSubmit(event, internals as any, host);

    expect(mockClick).toHaveBeenCalled();
    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('clicks a PDS submit button', () => {
    const submitButton = document.createElement('p-button');
    submitButton.type = 'submit';
    submitButton.matches = vi.fn().mockReturnValue(true);
    submitButton.click = mockClick;
    // Manually include in form.elements
    Object.defineProperty(form, 'elements', {
      value: [submitButton],
      writable: false,
    });

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    implicitSubmit(event, internals as any, host);

    expect(mockClick).toHaveBeenCalled();
    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('calls requestSubmit if no blocking fields and no submit button', () => {
    const input = document.createElement('input');
    input.type = 'checkbox'; // non-blocking type

    const checkbox = document.createElement('p-checkbox'); // non-blocking type
    // Manually include in form.elements
    Object.defineProperty(form, 'elements', {
      value: [input, checkbox],
      writable: false,
    });

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    implicitSubmit(event, internals as any, host);

    expect(mockRequestSubmit).toHaveBeenCalled();
  });

  it('does not call requestSubmit if a blocking native input is present', () => {
    const input = document.createElement('input');
    input.type = 'text'; // blocking type
    form.appendChild(input);

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    implicitSubmit(event, internals as any, host);

    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit if a blocking custom PDS input is present', () => {
    const pdsInput = document.createElement('p-input-text'); // blocking type

    Object.defineProperty(form, 'elements', {
      value: [pdsInput],
      writable: false,
    });

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    implicitSubmit(event, internals as any, host);

    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('ignores the host element when checking form elements', () => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    Object.defineProperty(form, 'elements', {
      value: [input, host],
      writable: false,
    });

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    implicitSubmit(event, internals as any, host);

    expect(mockRequestSubmit).toHaveBeenCalled();
  });
});
