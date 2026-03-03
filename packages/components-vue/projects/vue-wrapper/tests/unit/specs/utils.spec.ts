import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { Ref } from 'vue';
import * as Vue from 'vue';
import type { ToastMessage } from '../../../src/lib/types';
import * as utils from '../../../src/utils';

describe('getPrefixedTagName()', () => {
  vi.mock('vue', async (importOriginal) =>
    Object.assign({}, await importOriginal(), {
      inject: vi.fn().mockReturnValue(''), // Mock inject properly
    })
  );

  test('should call inject() with correctParameters', () => {
    const spy = vi.spyOn(Vue, 'inject').mockReturnValue('');

    utils.usePrefix('p-text');

    expect(spy).toHaveBeenCalledWith(utils.prefixInjectionKey);
  });

  test('should throw error if inject returns undefined', () => {
    vi.mocked(Vue.inject).mockReturnValueOnce(undefined);

    expect(() => utils.usePrefix('p-text')).toThrowError();
  });

  test('should return passed parameter if inject() returns ""', () => {
    vi.spyOn(Vue, 'inject').mockReturnValue('');

    const tagName = 'p-text';
    utils.usePrefix('p-text');

    expect(utils.usePrefix(tagName)).toBe(tagName);
  });

  test('should return prefixed parameter if prefix is defined', () => {
    const prefix = 'my-prefix';
    vi.spyOn(Vue, 'inject').mockReturnValue(prefix);
    const tagName = 'p-text';

    expect(utils.usePrefix(tagName)).toBe(prefix + '-' + tagName);

    const prefix2 = 'another-prefix';
    vi.spyOn(Vue, 'inject').mockReturnValue(prefix2);

    expect(utils.usePrefix(tagName)).toBe(prefix2 + '-' + tagName);
  });
});

describe('syncProperties()', () => {
  test('should sync passed properties with passed element', () => {
    type PropsType = {
      customProp1: string;
      customProp2: boolean;
      customProp3: number;
      customProp4: object;
    };

    const element = document.createElement('custom-el') as HTMLElement & PropsType;
    const elementRef = { value: element } as unknown as Ref<HTMLElement & PropsType>;

    expect(element.customProp1).toBeUndefined();
    expect(element.customProp2).toBeUndefined();
    expect(element.customProp3).toBeUndefined();
    expect(element.customProp4).toBeUndefined();

    const props1: PropsType = {
      customProp1: 'some prop',
      customProp2: true,
      customProp3: 1,
      customProp4: {},
    };
    utils.syncProperties(elementRef, props1);

    expect(element.customProp1).toBe(props1.customProp1);
    expect(element.customProp2).toBe(props1.customProp2);
    expect(element.customProp3).toBe(props1.customProp3);
    expect(element.customProp4).toBe(props1.customProp4);

    const props2: PropsType = {
      customProp1: 'another prop',
      customProp2: false,
      customProp3: 2,
      customProp4: { key: 'value' },
    };
    utils.syncProperties(elementRef, props2);

    expect(element.customProp1).toBe(props2.customProp1);
    expect(element.customProp2).toBe(props2.customProp2);
    expect(element.customProp3).toBe(props2.customProp3);
    expect(element.customProp4).toBe(props2.customProp4);
  });
});

describe('addEventListenerToElementRef()', () => {
  test('should call addEventListener() with correct parameters on passed element', () => {
    const element = document.createElement('custom-el');
    const elementRef = { value: element } as unknown as Ref<HTMLElement>;
    const eventName = 'someEventName';
    const spy = vi.spyOn(element, 'addEventListener');

    utils.addEventListenerToElementRef(elementRef, eventName, () => {});

    expect(spy).toHaveBeenCalledWith(eventName, expect.any(Function));
  });

  test('should call passed emit() with correct parameters', () => {
    const element = document.createElement('custom-el');
    const elementRef = { value: element } as unknown as Ref<HTMLElement>;
    const emit = vi.fn();
    const eventName = 'someEventName';

    utils.addEventListenerToElementRef(elementRef, eventName, emit);

    const event = new CustomEvent(eventName, { detail: 'someDetail' });
    element.dispatchEvent(event);

    expect(emit).toHaveBeenCalledWith(eventName, event);
  });
});

describe('addMessage()', () => {
  beforeEach(() => {
    vi.spyOn(Vue, 'inject').mockReturnValue(''); // Needed so that the error is not thrown in getPrefixedTagName() without PorscheDesignSystemProvider
  });
  test('should call addMessage() on toast element', async () => {
    const toastElement = document.createElement('p-toast') as HTMLElement & {
      addMessage(message: ToastMessage): void;
    };
    const addMessageMock = vi.fn();
    toastElement.addMessage = addMessageMock;
    document.body.appendChild(toastElement);
    customElements.define('p-toast', class PToast extends HTMLElement {});

    const { addMessage } = utils.useToastManager();
    const message: ToastMessage = { text: 'Test', state: 'success' };
    addMessage(message);

    // wait for customElements.whenDefined to be resolved
    await new Promise((resolve) => setTimeout(resolve));

    expect(addMessageMock).toHaveBeenCalledWith(message);
  });
});
