import { vi } from 'vitest';
import {
  getIntersectionObserverStickyArea,
  observedStickyNodesMap,
  observeStickyArea,
  scrollAreaObserverMap,
} from './observer';

describe('getIntersectionObserverStickyArea()', () => {
  const mockObserverInstance = {
    observe: (): null => null,
    unobserve: (): null => null,
    disconnect: (): null => null,
  };

  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    // biome-ignore lint/complexity/useArrowFunction: vitest requires normal function
    mockIntersectionObserver.mockImplementation(function () {
      return mockObserverInstance;
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should return new intersection observer instance', () => {
    const scrollArea = document.createElement('div');
    const observer = getIntersectionObserverStickyArea(scrollArea);

    expect(observer).toBe(mockObserverInstance);
  });
});

describe('observeStickyArea()', () => {
  let scrollArea: HTMLElement;
  let stickyNode: HTMLElement;
  let mockIntersectionObserver: ReturnType<typeof vi.fn>;
  const mockObserverInstance = {
    observe: (): null => null,
    unobserve: (): null => null,
    disconnect: (): null => null,
  } as unknown as IntersectionObserver;

  beforeEach(() => {
    scrollArea = document.createElement('div');
    stickyNode = document.createElement('div');
    scrollArea.appendChild(stickyNode);
    // IntersectionObserver isn't available in test environment
    mockIntersectionObserver = vi.fn();
    // biome-ignore lint/complexity/useArrowFunction: vitest requires normal function
    mockIntersectionObserver.mockImplementation(function () {
      return mockObserverInstance;
    });
    window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
    scrollAreaObserverMap.clear();
    observedStickyNodesMap.clear();
  });

  it('should create new intersection observer instance and observe node if scroll area was not observed before', () => {
    const observeSpy = vi.spyOn(mockObserverInstance, 'observe');

    observeStickyArea(scrollArea, stickyNode);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), { root: scrollArea, threshold: 1 });
    expect(scrollAreaObserverMap.get(scrollArea)).toBe(mockObserverInstance);
    expect(observeSpy).toHaveBeenCalledWith(stickyNode);
    expect(observedStickyNodesMap.has(stickyNode)).toBe(true);
  });

  it('should not create new intersection observer instance if scrollArea was observed before and observe node', () => {
    const observeSpy = vi.spyOn(mockObserverInstance, 'observe');
    scrollAreaObserverMap.set(scrollArea, mockObserverInstance);

    observeStickyArea(scrollArea, stickyNode);

    expect(mockIntersectionObserver).not.toHaveBeenCalled();
    expect(observeSpy).toHaveBeenCalledWith(stickyNode);
    expect(observedStickyNodesMap.has(stickyNode)).toBe(true);
  });

  it('should not create new intersection observer instance if scrollArea was observed before and not call observe node again if it already is observed', () => {
    const observeSpy = vi.spyOn(mockObserverInstance, 'observe');
    scrollAreaObserverMap.set(scrollArea, mockObserverInstance);
    observedStickyNodesMap.set(stickyNode, mockObserverInstance);

    observeStickyArea(scrollArea, stickyNode);

    expect(mockIntersectionObserver).not.toHaveBeenCalled();
    expect(observeSpy).not.toHaveBeenCalled();
  });
});
