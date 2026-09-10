import { componentsReady, PInputNumber, type PInputNumberElement } from '@porsche-design-system/components-react';
import '@porsche-design-system/components-react/jsdom-polyfill';
import { cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, expect, it, vi } from 'vitest';

afterEach(cleanup);

it('delivers native and custom input events to capture listeners but only the custom event to React callbacks', async () => {
  const ref = createRef<PInputNumberElement>();
  const onInput = vi.fn();
  render(<PInputNumber name="quantity" ref={ref} onInput={onInput} />);
  await componentsReady();

  const element = ref.current!;
  const input = element.shadowRoot!.querySelector('input')!;
  const captured: Event[] = [];
  const captureListener = (event: Event) => captured.push(event);
  const bubbleListener = vi.fn();
  element.addEventListener('input', captureListener, true);
  element.addEventListener('input', bubbleListener);

  input.value = '42';
  const nativeEvent = new InputEvent('input', { bubbles: true, composed: true });
  input.dispatchEvent(nativeEvent);

  expect(captured).toHaveLength(2);
  expect(captured[0]).toBe(nativeEvent);
  expect(nativeEvent.detail).toBe(0);
  expect(captured[1]).toBeInstanceOf(CustomEvent);
  expect(captured[1]).toHaveProperty('detail', nativeEvent);
  expect(bubbleListener).toHaveBeenCalledExactlyOnceWith(captured[1]);
  expect(onInput).toHaveBeenCalledExactlyOnceWith(captured[1]);
  expect(element.value).toBe('42');

  element.removeEventListener('input', captureListener, true);
  element.removeEventListener('input', bubbleListener);
  input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
  expect(captured).toHaveLength(2);
  expect(bubbleListener).toHaveBeenCalledTimes(1);
  expect(onInput).toHaveBeenCalledTimes(2);
});
