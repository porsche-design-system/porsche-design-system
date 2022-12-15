import {
  addEventListenerToElementRef,
  getPrefixedTagName,
  prefixInjectionKey,
  syncProperties,
  useToastManager,
} from '../../../src/utils';
import type { ToastMessage } from '../../../src/public-api';
import * as utils from '../../../src/utils';
import * as Vue from 'vue';

describe('getPrefixedTagName()', () => {
  it('should call inject() with correctParameters', () => {
    const spy = jest.spyOn(Vue, 'inject').mockReturnValue('');

    getPrefixedTagName('p-text');

    expect(spy).toBeCalledWith(prefixInjectionKey);
  });

  it('should call throw error if prefix is undefined', () => {
    jest.spyOn(Vue, 'inject').mockReturnValue(undefined);

    let error;
    try {
      getPrefixedTagName('p-text');
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });

  it('should return passed tagName if inject() returns ""', () => {
    jest.spyOn(Vue, 'inject').mockReturnValue('');
    const tagName = 'p-text';
    getPrefixedTagName('p-text');

    expect(getPrefixedTagName(tagName)).toBe(tagName);
  });

  it('should return prefixed tagName if prefix is defined', () => {
    const prefix = 'my-prefix';
    jest.spyOn(Vue, 'inject').mockReturnValue(prefix);
    const tagName = 'p-text';

    expect(getPrefixedTagName(tagName)).toBe(prefix + '-' + tagName);

    const prefix2 = 'another-prefix';
    jest.spyOn(Vue, 'inject').mockReturnValue(prefix2);

    expect(getPrefixedTagName(tagName)).toBe(prefix2 + '-' + tagName);
  });
});

describe('syncProperties()', () => {
  it('should sync passed properties with passed element', () => {
    type PropsType = {
      customProp1: string;
      customProp2: boolean;
      customProp3: number;
      customProp4: {};
    };

    const props: PropsType & Partial<HTMLElement> = {
      customProp1: 'some prop',
      customProp2: true,
      customProp3: 1,
      customProp4: {},
    };

    const element = document.createElement('custom-el') as HTMLElement & PropsType;

    expect(element.customProp1).toBeUndefined();
    expect(element.customProp2).toBeUndefined();
    expect(element.customProp3).toBeUndefined();
    expect(element.customProp4).toBeUndefined();

    syncProperties(element, props);

    expect(element.customProp1).toBe(props.customProp1);
    expect(element.customProp2).toBe(props.customProp2);
    expect(element.customProp3).toBe(props.customProp3);
    expect(element.customProp4).toBe(props.customProp4);

    const props2: PropsType & Partial<HTMLElement> = {
      customProp1: 'another prop',
      customProp2: false,
      customProp3: 2,
      customProp4: { key: 'value' },
    };

    syncProperties(element, props2);

    expect(element.customProp1).toBe(props2.customProp1);
    expect(element.customProp2).toBe(props2.customProp2);
    expect(element.customProp3).toBe(props2.customProp3);
    expect(element.customProp4).toBe(props2.customProp4);
  });
});

describe('addEventListenerToElementRef()', () => {
  it('should call addEventListener() with correct parameters on passed element', () => {
    const element = document.createElement('custom-el');
    const eventName = 'someEventName';
    const spy = jest.spyOn(element, 'addEventListener');

    addEventListenerToElementRef(element, eventName, () => {});

    expect(spy).toBeCalledWith(eventName, expect.any(Function));
  });

  it('should call passed emit() with correct parameters', () => {
    const element = document.createElement('custom-el');
    const emit = jest.fn();

    const eventName = 'someEventName';
    const event = new CustomEvent(eventName, { detail: 'someDetail' });

    addEventListenerToElementRef(element, eventName, emit);
    element.dispatchEvent(event);

    expect(emit).toBeCalledWith(eventName, event.detail);
  });
});

describe('useToastManager()', () => {
  beforeEach(() => {
    jest.spyOn(Vue, 'inject').mockReturnValue(''); // Needed so that the error is not thrown in getPrefixedTagName() without PorscheDesignSystemProvider
  });

  it('should call getPrefixedTagName() with correct parameters', () => {
    const spy = jest.spyOn(utils, 'getPrefixedTagName');

    useToastManager();

    expect(spy).toBeCalledWith('p-toast');
  });

  it('should provide addMessage()', () => {
    expect(useToastManager()).toEqual({ addMessage: expect.anything() });
  });

  describe('addMessage()', () => {
    it('should call addMessage() on toast element', async () => {
      const toastElement = document.createElement('p-toast') as HTMLElement & {
        addMessage(message: ToastMessage): void;
      };
      const addMessageMock = jest.fn();
      toastElement.addMessage = addMessageMock;
      document.body.appendChild(toastElement);
      customElements.define('p-toast', class PToast extends HTMLElement {});

      const { addMessage } = useToastManager();
      const message: ToastMessage = { text: 'Test', state: 'success' };
      addMessage(message);

      // wait for customElements.whenDefined to be resolved
      await new Promise((resolve) => setTimeout(resolve));

      expect(addMessageMock).toBeCalledWith(message);
    });
  });
});
