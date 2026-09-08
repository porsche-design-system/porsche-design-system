import {
  type InputNumberInputEventDetail,
  PButton,
  type PCheckboxProps,
  PInputNumber,
  type PInputNumberBlurEvent,
  type PInputNumberChangeEvent,
  type PInputNumberElement,
  type PInputNumberInputEvent,
  type PInputNumberProps,
  type PInputTextProps,
  type PModalElement,
  type PModalMotionHiddenEndEvent,
  type PMultiSelectProps,
  type PSelectProps,
  type PTextareaProps,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react';
import { type ComponentRef, createRef, useRef } from 'react';

type Equal<T, U> = (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2 ? true : false;
const expectType = <T extends true>(_equal: T): void => {};
expectType<Equal<ComponentRef<typeof PInputNumber>, PInputNumberElement>>(true);

<PInputNumber
  name="quantity"
  ref={(element) => {
    expectType<Equal<typeof element, PInputNumberElement | null>>(true);
    if (element) {
      expectType<Equal<typeof element.value, string | number | null | undefined>>(true);
      element.addEventListener('input', (event) => {
        expectType<Equal<typeof event, PInputNumberInputEvent>>(true);
      });
    }
  }}
/>;
const objectRef = createRef<PInputNumberElement>();
<PInputNumber name="quantity" ref={objectRef} />;
const broadCallback = (_element: HTMLElement | null): void => {};
<PInputNumber name="quantity" ref={broadCallback} />;
<PInputNumber name="quantity" ref={null} />;
const nativeInputRef = createRef<HTMLInputElement>();
// @ts-expect-error The host is not a native input element.
<PInputNumber name="quantity" ref={nativeInputRef} />;
const broadObjectRef = createRef<HTMLElement>();
// @ts-expect-error Object refs must describe the component host, including its required properties.
<PInputNumber name="quantity" ref={broadObjectRef} />;

export const RefExample = () => {
  const ref = useRef<PInputNumberElement>(null);
  expectType<Equal<typeof ref.current, PInputNumberElement | null>>(true);
  return <PInputNumber name="quantity" ref={ref} />;
};

const onInput: NonNullable<PInputNumberProps['onInput']> = (event) => {
  expectType<Equal<typeof event.target.value, string | number | null | undefined>>(true);
  expectType<Equal<typeof event.target.name, string>>(true);
  expectType<Equal<typeof event.target.translate, boolean>>(true);
  expectType<Equal<typeof event.target.style, CSSStyleDeclaration>>(true);
  expectType<Equal<typeof event.target.disabled, boolean | undefined>>(true);
  expectType<Equal<typeof event.detail, InputEvent>>(true);
  expectType<Equal<typeof event.detail.target, EventTarget | null>>(true);
  expectType<Equal<typeof event.currentTarget, EventTarget | null>>(true);
  expectType<Equal<typeof event, PInputNumberInputEvent>>(true);
  expectType<Equal<typeof event.target, PInputNumberElement>>(true);
  const nativeHost: HTMLElement = event.target;
  void nativeHost;

  // @ts-expect-error A numeric input's public value is not a boolean, any, or never.
  const invalid: boolean = event.target.value;
  void invalid;
  // @ts-expect-error Native number-input APIs do not exist on the custom-element host.
  event.target.valueAsNumber;
  // @ts-expect-error A React callback is not a DOM property.
  event.target.onInput;
};

<PInputNumber
  name="quantity"
  translate="yes"
  style={{ color: 'red' }}
  value={42}
  onInput={(event) => {
    expectType<Equal<typeof event.target.value, string | number | null | undefined>>(true);
    onInput(event);
  }}
  onChange={(event) => {
    expectType<Equal<typeof event, PInputNumberChangeEvent>>(true);
    expectType<Equal<typeof event.detail, Event>>(true);
    expectType<Equal<typeof event.target, PInputNumberElement>>(true);
  }}
  onBlur={(event) => {
    expectType<Equal<typeof event, PInputNumberBlurEvent>>(true);
    expectType<Equal<typeof event.target.value, string | number | null | undefined>>(true);
  }}
  onClick={(event) => {
    event.nativeEvent;
    // @ts-expect-error Ordinary React click events must not become custom events.
    event.target.value;
  }}
/>;

const existingHandler = (_event: CustomEvent<InputNumberInputEventDetail>): void => {};
<PInputNumber name="quantity" onInput={existingHandler} value={null} />;
const namedHandler = (event: PInputNumberInputEvent): void => {
  expectType<Equal<typeof event.target.value, string | number | null | undefined>>(true);
  expectType<Equal<typeof event.detail, InputNumberInputEventDetail>>(true);
};
<PInputNumber name="quantity" onInput={namedHandler} />;
<PInputNumber name="quantity" value={undefined} />;
<PInputNumber name="quantity" value="42" />;
// @ts-expect-error Boolean values remain invalid.
<PInputNumber name="quantity" value={true} />;
// @ts-expect-error React translate remains an attribute value, not a DOM boolean property.
<PInputNumber name="quantity" translate={true} />;

export const onTextInput: NonNullable<PInputTextProps['onInput']> = (event) => {
  expectType<Equal<typeof event.target.value, string | number | null | undefined>>(true);
};
export const onTextareaInput: NonNullable<PTextareaProps['onInput']> = (event) => {
  expectType<Equal<typeof event.target.value, string | null | undefined>>(true);
};
export const onSelectChange: NonNullable<PSelectProps['onChange']> = (event) => {
  expectType<Equal<typeof event.target.value, string | number | null | undefined>>(true);
  expectType<Equal<typeof event.detail, SelectChangeEventDetail>>(true);
};
export const onMultiSelectChange: NonNullable<PMultiSelectProps['onChange']> = (event) => {
  expectType<Equal<typeof event.target.value, string[] | number[] | null | undefined>>(true);
};
export const onCheckboxChange: NonNullable<PCheckboxProps['onChange']> = (event) => {
  expectType<Equal<typeof event.target.checked, boolean | undefined>>(true);
};

<PButton onBlur={(event) => event.nativeEvent} onClick={(event) => event.nativeEvent} />;

declare const element: PInputNumberElement;

element.addEventListener('input', function (event) {
  expectType<Equal<typeof event, PInputNumberInputEvent>>(true);
  expectType<Equal<typeof event.target, PInputNumberElement>>(true);
  expectType<Equal<typeof event.target.value, string | number | null | undefined>>(true);
  expectType<Equal<typeof this, PInputNumberElement>>(true);
});
element.removeEventListener('input', function (event) {
  expectType<Equal<typeof event, PInputNumberInputEvent>>(true);
  expectType<Equal<typeof this, PInputNumberElement>>(true);
});
element.addEventListener('change', (event) => {
  expectType<Equal<typeof event, PInputNumberChangeEvent>>(true);
});
element.addEventListener('blur', (event) => {
  expectType<Equal<typeof event, PInputNumberBlurEvent>>(true);
});
element.addEventListener('input', namedHandler, {
  capture: false,
  once: true,
  passive: true,
  signal: new AbortController().signal,
});
element.removeEventListener('input', namedHandler, { capture: false });
element.addEventListener('input', existingHandler, false);
element.removeEventListener('input', existingHandler, false);

for (const options of [undefined, false, {}, { capture: false }, { passive: true, once: true }] as const) {
  element.addEventListener(
    'input',
    function (event) {
      expectType<Equal<typeof event, PInputNumberInputEvent>>(true);
      expectType<Equal<typeof this, PInputNumberElement>>(true);
    },
    options
  );
}
for (const options of [undefined, false, {}, { capture: false }] as const) {
  element.removeEventListener(
    'input',
    (event) => {
      expectType<Equal<typeof event, PInputNumberInputEvent>>(true);
    },
    options
  );
}

declare const capture: boolean;
declare const addOptions: AddEventListenerOptions;
declare const removeOptions: EventListenerOptions;
type CapturedInputEvent = PInputNumberInputEvent | HTMLElementEventMap['input'];

for (const options of [true, { capture: true }, capture, addOptions] as const) {
  element.addEventListener(
    'input',
    function (event) {
      expectType<Equal<typeof event, CapturedInputEvent>>(true);
      expectType<Equal<typeof this, PInputNumberElement>>(true);
      // @ts-expect-error The native event does not contain the PDS custom-event payload.
      event.detail.preventDefault();
      // @ts-expect-error Capture listeners cannot assume the custom event's host target contract.
      event.target.value;
    },
    options
  );
}
for (const options of [true, { capture: true }, capture, removeOptions] as const) {
  element.removeEventListener(
    'input',
    function (event) {
      expectType<Equal<typeof event, CapturedInputEvent>>(true);
      expectType<Equal<typeof this, PInputNumberElement>>(true);
    },
    options
  );
}

const captureHandler = (_event: CapturedInputEvent): void => {};
element.addEventListener('input', captureHandler, {
  capture: true,
  once: true,
  passive: true,
  signal: new AbortController().signal,
});
element.removeEventListener('input', captureHandler, { capture: true });
element.addEventListener(
  'blur',
  (event) => {
    expectType<Equal<typeof event, PInputNumberBlurEvent | FocusEvent>>(true);
  },
  true
);
element.addEventListener(
  'change',
  (event) => {
    expectType<Equal<typeof event, PInputNumberChangeEvent | Event>>(true);
  },
  { capture: true }
);
declare const inputOrBlur: 'input' | 'blur';
element.addEventListener(
  inputOrBlur,
  (event) => {
    expectType<Equal<typeof event, CapturedInputEvent | PInputNumberBlurEvent | FocusEvent>>(true);
  },
  capture
);

// @ts-expect-error A custom-only handler cannot handle captured native events.
element.addEventListener('input', namedHandler, true);
// @ts-expect-error Capture-enabled options must not select the custom-only overload.
element.addEventListener('input', existingHandler, { capture: true });
// @ts-expect-error Unknown capture options also require a native-compatible handler.
element.addEventListener('input', namedHandler, capture);
// @ts-expect-error Broad options may enable capture.
element.addEventListener('input', namedHandler, addOptions);
// @ts-expect-error Removal uses the same capture-aware listener contract.
element.removeEventListener('input', namedHandler, true);
// @ts-expect-error Capture-enabled removal cannot promise custom-only events.
element.removeEventListener('input', existingHandler, { capture: true });

declare const modal: PModalElement;
modal.addEventListener(
  'motionHiddenEnd',
  function (event) {
    expectType<Equal<typeof event, PModalMotionHiddenEndEvent>>(true);
    expectType<Equal<typeof this, PModalElement>>(true);
  },
  true
);
modal.removeEventListener(
  'motionHiddenEnd',
  (event) => {
    expectType<Equal<typeof event, PModalMotionHiddenEndEvent>>(true);
  },
  removeOptions
);

element.addEventListener('keydown', function (event) {
  expectType<Equal<typeof event, KeyboardEvent>>(true);
  expectType<Equal<typeof this, HTMLElement>>(true);
});
element.removeEventListener('keydown', (event) => {
  expectType<Equal<typeof event, KeyboardEvent>>(true);
});
element.addEventListener(
  'keydown',
  (event) => {
    expectType<Equal<typeof event, KeyboardEvent>>(true);
  },
  true
);
element.addEventListener('third-party-event', (event) => {
  expectType<Equal<typeof event, Event>>(true);
});
element.removeEventListener('third-party-event', (event) => {
  expectType<Equal<typeof event, Event>>(true);
});

const listenerObject: EventListenerObject = { handleEvent: (_event: Event) => {} };
element.addEventListener('input', listenerObject);
element.removeEventListener('input', listenerObject);
element.addEventListener('input', listenerObject, true);
element.removeEventListener('input', listenerObject, true);
const nativeListener: EventListener = (_event) => {};
element.addEventListener('third-party-event', nativeListener);
element.removeEventListener('third-party-event', nativeListener);

// @ts-expect-error Keyboard-specific handlers cannot handle an input event.
element.addEventListener('input', (_event: KeyboardEvent) => {});
// @ts-expect-error Removing a listener preserves the event's type contract.
element.removeEventListener('input', (_event: KeyboardEvent) => {});
