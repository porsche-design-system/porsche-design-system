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

  it('submits on an Enter keypress during IME composition, because browsers only dispatch it where native inputs submit', () => {
    pressEnter({ isComposing: true });
    expect(mockRequestSubmit).toHaveBeenCalledTimes(1);
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

  it.each<TagName>(['p-input-password', 'p-input-number', 'p-input-search'])(
    'does not call requestSubmit if a %s is present',
    (tagName) => {
      Object.defineProperty(form, 'elements', {
        value: [document.createElement(tagName)],
        writable: false,
      });

      pressEnter();

      expect(mockRequestSubmit).not.toHaveBeenCalled();
    }
  );

  it.each<TagName>(['p-input-date', 'p-input-month', 'p-input-week', 'p-input-time'])(
    'calls requestSubmit if a %s is present, because it is no text field',
    (tagName) => {
      Object.defineProperty(form, 'elements', {
        value: [document.createElement(tagName)],
        writable: false,
      });

      pressEnter();

      expect(mockRequestSubmit).toHaveBeenCalledTimes(1);
    }
  );

  it.each(['date', 'month', 'week', 'time', 'datetime-local'])(
    'calls requestSubmit if a native input of type %s is present, because it is no text field',
    (type) => {
      const input = document.createElement('input');
      input.type = type;
      form.appendChild(input);

      pressEnter();

      expect(mockRequestSubmit).toHaveBeenCalledTimes(1);
    }
  );

  it('does not call requestSubmit if a native input of an unsupported type is present, because it is rendered as a text field', () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'unsupported');
    form.appendChild(input);

    pressEnter();

    expect(mockRequestSubmit).not.toHaveBeenCalled();
  });

  it.each<TagName>(['p-input-date', 'p-input-month', 'p-input-week', 'p-input-time'])(
    'does not call requestSubmit if Enter is pressed in a %s without a submit button',
    (tagName) => {
      host = document.createElement(tagName);

      pressEnter();

      expect(mockRequestSubmit).not.toHaveBeenCalled();
    }
  );

  it('clicks the submit button if Enter is pressed in a p-input-date', () => {
    host = document.createElement('p-input-date');
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    vi.spyOn(submitButton, 'matches').mockReturnValue(true);
    submitButton.click = mockClick;
    form.appendChild(submitButton);

    pressEnter();

    expect(mockClick).toHaveBeenCalled();
  });

  it('treats a p-input-month as a text field if the browser renders type month as text', async () => {
    vi.resetModules();
    const { implicitSubmit: implicitSubmitWithoutMonthSupport } = await import('./implicitSubmit');
    const createElement = document.createElement.bind(document);
    const month = createElement('p-input-month');
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const element = createElement(tagName);
      if (tagName === 'input') {
        Object.defineProperty(element, 'type', { get: () => 'text', set: () => {} });
      }
      return element;
    });
    Object.defineProperty(form, 'elements', { value: [month], writable: false });

    implicitSubmitWithoutMonthSupport(new KeyboardEvent('keypress', { key: 'Enter' }), internals as any, host);
    vi.runAllTimers();
    expect(mockRequestSubmit).not.toHaveBeenCalled();

    implicitSubmitWithoutMonthSupport(new KeyboardEvent('keypress', { key: 'Enter' }), internals as any, month);
    vi.runAllTimers();
    expect(mockRequestSubmit).toHaveBeenCalledTimes(1);

    vi.restoreAllMocks();
  });
});
