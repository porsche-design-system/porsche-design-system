import {
  breakpointChangeCallbackMap,
  handleBreakpointChange,
  mediaQueries,
  mediaQueryLists,
  observeBreakpointChange,
  unobserveBreakpointChange,
} from './breakpoint-observer';

it('should match mediaQueries snapshot', () => {
  expect(mediaQueries).toMatchSnapshot();
});

describe('observeBreakpointChange()', () => {
  beforeEach(() => {
    breakpointChangeCallbackMap.clear();
  });

  it('should call addEventLister() for each media query with correct parameters', () => {
    const spies = mediaQueryLists.map((mediaQueryList) => jest.spyOn(mediaQueryList, 'addEventListener'));

    const node = document.createElement('div');
    const callback = () => {};

    observeBreakpointChange(node, callback);

    expect(spies.length).toBe(6);
    spies.forEach((spy) => expect(spy).toBeCalledWith('change', handleBreakpointChange));
  });

  it('should add callback and key to breakpointChangeCallbackMap', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    const callback1 = () => {};
    const callback2 = () => {};

    observeBreakpointChange(node1, callback1);
    expect(breakpointChangeCallbackMap.size).toBe(1);

    observeBreakpointChange(node2, callback2);
    expect(breakpointChangeCallbackMap.size).toBe(2);

    expect(breakpointChangeCallbackMap.get(node1)).toEqual(callback1);
    expect(breakpointChangeCallbackMap.get(node2)).toEqual(callback2);
  });
});

describe('unobserveBreakpointChange()', () => {
  beforeEach(() => {
    breakpointChangeCallbackMap.clear();
  });

  it('should remove host from breakpointChangeCallbackMap', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    const callback1 = () => {};
    const callback2 = () => {};
    observeBreakpointChange(node1, callback1);
    observeBreakpointChange(node2, callback2);

    unobserveBreakpointChange(node2);

    expect(breakpointChangeCallbackMap.size).toBe(1);
  });

  it('should call removeEventListener() for each media query with correct parameters', () => {
    const spies = mediaQueryLists.map((mediaQueryList) => jest.spyOn(mediaQueryList, 'removeEventListener'));
    const node = document.createElement('div');
    const callback = () => {};
    observeBreakpointChange(node, callback);

    unobserveBreakpointChange(node);

    spies.forEach((spy) => expect(spy).toBeCalledWith('change', handleBreakpointChange));
  });
});
