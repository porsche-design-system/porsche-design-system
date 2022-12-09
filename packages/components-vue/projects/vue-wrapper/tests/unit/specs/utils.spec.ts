import { addEventListenerToElementRef, syncProperties } from '../../../src/utils';

describe('getPrefixedTagName', () => {
  it('should', () => {
    expect(true).toBe(true);
  });
});

describe('syncProperties', () => {
  it('should sync passed properties with passed element', () => {
    const props: {
      customProp1: string;
      customProp2: boolean;
      customProp3: number;
      customProp4: {};
    } & Partial<HTMLElement> = { customProp1: 'some prop', customProp2: true, customProp3: 1, customProp4: {} };

    const element = document.createElement('custom-el');
    syncProperties(element, props);

    expect((element as any).customProp1).toBe(props.customProp1);
    expect((element as any).customProp2).toBe(props.customProp2);
    expect((element as any).customProp3).toBe(props.customProp3);
    expect((element as any).customProp4).toBe(props.customProp4);
  });
});

describe('addEventListenerToElementRef', () => {
  it('should add event listener with correct callback to passed element', () => {
    const element = document.createElement('custom-el');
    const eventName = 'someEventName';
    const spy = jest.spyOn(element, 'addEventListener');

    addEventListenerToElementRef(element, eventName, () => {});

    expect(spy).toBeCalledWith(eventName, expect.any(Function));
  });

  xit('should add event listener with correct callback to passed element', () => {
    const element = document.createElement('custom-el');
    const eventName = 'someEventName';
    const emit = (eventName, detail) => {};

    // const spy = jest.spyOn(this, 'emit');

    addEventListenerToElementRef(element, eventName, emit);

    element.dispatchEvent(eventName as unknown as Event);

  //  expect(spy).toBeCalledWith(eventName);
  });
});
