import './match-media.mock';
import {
  addBreakpointCallback,
  breakpointChangeCallbackMap,
  mediaQueryLists,
  removeBreakpointCallback,
} from './match-media';

describe('addBreakpointCallback', () => {
  beforeEach(() => {
    breakpointChangeCallbackMap.clear();
  });

  it('should call addEventLister()', () => {
    const spies = mediaQueryLists.map((mediaQueryList) => jest.spyOn(mediaQueryList, 'addEventListener'));

    const node = document.createElement('div');
    const callback = () => {};

    addBreakpointCallback(node, callback);

    expect(spies.length).toBe(6);
    spies.forEach((spy) => expect(spy).toBeCalledWith('change', expect.any(Function)));
  });

  it('should add callback and key to breakpointChangeCallbackMap', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    const callback1 = () => {};
    const callback2 = () => {};

    addBreakpointCallback(node1, callback1);
    expect(breakpointChangeCallbackMap.size).toBe(1);

    addBreakpointCallback(node2, callback2);
    expect(breakpointChangeCallbackMap.size).toBe(2);

    expect(breakpointChangeCallbackMap.get(node1)).toEqual(callback1);
    expect(breakpointChangeCallbackMap.get(node2)).toEqual(callback2);
  });
});

describe('removeBreakpointCallback', () => {
  beforeEach(() => {
    breakpointChangeCallbackMap.clear();
  });

  it('should remove host from breakpointChangeCallbackMap', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    const callback1 = () => {};
    const callback2 = () => {};
    addBreakpointCallback(node1, callback1);
    addBreakpointCallback(node2, callback2);

    removeBreakpointCallback(node2);

    expect(breakpointChangeCallbackMap.size).toBe(1);
  });

  it('should call removeEventListener()', () => {
    const spies = mediaQueryLists.map((mediaQueryList) => jest.spyOn(mediaQueryList, 'removeEventListener'));
    const node = document.createElement('div');
    const callback = () => {};
    addBreakpointCallback(node, callback);

    removeBreakpointCallback(node);

    spies.forEach((spy) => expect(spy).toBeCalledWith('change', expect.any(Function)));
  });
});
