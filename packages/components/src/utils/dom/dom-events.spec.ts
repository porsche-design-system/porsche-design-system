import { addEventListener, removeEventListener } from './dom-events';

const listener = () => {};

describe('addEventListener()', () => {
  it('should call addEventListener', () => {
    const element = document.createElement('div');
    const spy1 = jest.spyOn(element, 'addEventListener');

    addEventListener(element, 'change', listener, false);

    expect(spy1).toBeCalledWith('change', listener, false);
  });
});

describe('removeEventListener', () => {
  it('should call removeEventListener', () => {
    const element = document.createElement('div');
    const spy1 = jest.spyOn(element, 'removeEventListener');

    addEventListener(element, 'change', listener, false);
    removeEventListener(element, 'change', listener, false);

    expect(spy1).toBeCalledWith('change', listener, false);
  });
});
