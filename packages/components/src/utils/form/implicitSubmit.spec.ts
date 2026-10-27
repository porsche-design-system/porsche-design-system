import type { TagName } from '@porsche-design-system/shared';
import { type Mock, vi } from 'vitest';
import { implicitSubmit } from './implicitSubmit';

describe('implicitSubmit', () => {
  let mockClick: Mock<() => void>;
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

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const pressEnter = (init: KeyboardEventInit = {}): KeyboardEvent => {
    const event = new KeyboardEvent('keypress', { key: 'Enter', cancelable: true, ...init });
    implicitSubmit(event, internals as any, host);
    vi.runAllTimers();
    return event;
  };

  it('does nothing if key is not Enter', () => {
    pressEnter({ key: 'a' });
    expect(mockClick).not.toHaveBeenCalled();
    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing if form is not present', () => {
    implicitSubmit(new KeyboardEvent('keypress', { key: 'Enter' }), { form: null } as any, host);
    vi.runAllTimers();
    expect(mockClick).not.toHaveBeenCalled();
    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('clicks a native submit button', () => {
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    vi.spyOn(submitButton, 'matches').mockReturnValue(true);
    submitButton.click = mockClick;

    form.appendChild(submitButton);

    pressEnter();

    expect(mockClick).toHaveBeenCalled();
    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('clicks a PDS submit button', () => {
    const submitButton = document.createElement('p-button');
    submitButton.type = 'submit';
    vi.spyOn(submitButton, 'matches').mockReturnValue(true);
    submitButton.click = mockClick;
    // Manually include in form.elements
    Object.defineProperty(form, 'elements', {
      value: [submitButton],
      writable: false,
    });

    pressEnter();

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

    pressEnter();

    expect(mockRequestSubmit).toHaveBeenCalled();
  });

  it('does not call requestSubmit if a blocking native input is present', () => {
    const input = document.createElement('input');
    input.type = 'text'; // blocking type
    form.appendChild(input);

    pressEnter();

    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit if a blocking custom PDS input is present', () => {
    const pdsInput = document.createElement('p-input-text'); // blocking type

    Object.defineProperty(form, 'elements', {
      value: [pdsInput],
      writable: false,
    });

    pressEnter();

    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('ignores the host element when checking form elements', () => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    Object.defineProperty(form, 'elements', {
      value: [input, host],
      writable: false,
    });

    pressEnter();

    expect(mockRequestSubmit).toHaveBeenCalled();
  });

  it('does not submit before the event has been dispatched to all listeners', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter', cancelable: true });
    implicitSubmit(event, internals as any, host);

    expect(mockRequestSubmit).not.toHaveBeenCalled();
    vi.runAllTimers();
    expect(mockRequestSubmit).toHaveBeenCalled();
  });

  it('does not call requestSubmit if the event was cancelled before', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter', cancelable: true });
    event.preventDefault();
    implicitSubmit(event, internals as any, host);
    vi.runAllTimers();

    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit if the event is cancelled by a later listener', () => {
    const event = new KeyboardEvent('keypress', { key: 'Enter', cancelable: true });
    implicitSubmit(event, internals as any, host);
    event.preventDefault();
    vi.runAllTimers();

    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it('does not click the submit button if the event is cancelled by a later listener', () => {
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    vi.spyOn(submitButton, 'matches').mockReturnValue(true);
    submitButton.click = mockClick;
    form.appendChild(submitButton);

    const event = new KeyboardEvent('keypress', { key: 'Enter', cancelable: true });
    implicitSubmit(event, internals as any, host);
    event.preventDefault();
    vi.runAllTimers();

    expect(mockClick).not.toHaveBeenCalled();
  });

  it.each<TagName>(['p-input-password', 'p-input-month', 'p-input-week'])(
    'does not call requestSubmit if a blocking %s is present',
    (tagName) => {
      Object.defineProperty(form, 'elements', {
        value: [document.createElement(tagName)],
        writable: false,
      });

      pressEnter();

      expect(mockRequestSubmit).not.toHaveBeenCalled();
    }
  );
});
