import { vi } from 'vitest';
import * as observerUtils from './observer';
import {
  getIntersectionObserverStickyArea,
  observedStickyNodesMap,
  observeStickyArea,
  scrollAreaObserverMap,
} from './observer';

describe('getIntersectionObserverStickyArea()', () => {
  const mockObserverInstance = {
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  };

  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue(mockObserverInstance);
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
  const mockObserverInstance = {
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  } as unknown as IntersectionObserver;

  beforeEach(() => {
    scrollArea = document.createElement('div');
    stickyNode = document.createElement('div');
    scrollArea.appendChild(stickyNode);
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue(mockObserverInstance);
    window.IntersectionObserver = mockIntersectionObserver;
    scrollAreaObserverMap.clear();
    observedStickyNodesMap.clear();
  });

  it('should create new intersection observer instance and observe node if scroll area was not observed before', () => {
    const getIntersectionObserverStickyAreaSpy = vi.spyOn(observerUtils.internal, 'getIntersectionObserverStickyArea');
    const observeSpy = vi.spyOn(mockObserverInstance, 'observe');

    observeStickyArea(scrollArea, stickyNode);

    expect(getIntersectionObserverStickyAreaSpy).toHaveBeenCalledWith(scrollArea);
    expect(scrollAreaObserverMap.has(scrollArea)).toBe(true);
    expect(observeSpy).toHaveBeenCalledWith(stickyNode);
    expect(observedStickyNodesMap.has(stickyNode)).toBe(true);
  });

  it('should not create new intersection observer instance if scrollArea was observed before and observe node', () => {
    const getIntersectionObserverStickyAreaSpy = vi.spyOn(observerUtils, 'getIntersectionObserverStickyArea');
    const observeSpy = vi.spyOn(mockObserverInstance, 'observe');
    scrollAreaObserverMap.set(scrollArea, mockObserverInstance);

    observeStickyArea(scrollArea, stickyNode);

    expect(getIntersectionObserverStickyAreaSpy).not.toHaveBeenCalled();
    expect(observeSpy).toHaveBeenCalledWith(stickyNode);
    expect(observedStickyNodesMap.has(stickyNode)).toBe(true);
  });

  it('should not create new intersection observer instance if scrollArea was observed before and not call observe node again if it already is observed', () => {
    const getIntersectionObserverStickyAreaSpy = vi.spyOn(observerUtils, 'getIntersectionObserverStickyArea');
    const observeSpy = vi.spyOn(mockObserverInstance, 'observe');
    scrollAreaObserverMap.set(scrollArea, mockObserverInstance);
    observedStickyNodesMap.set(stickyNode, mockObserverInstance);

    observeStickyArea(scrollArea, stickyNode);

    expect(getIntersectionObserverStickyAreaSpy).not.toHaveBeenCalled();
    expect(observeSpy).not.toHaveBeenCalled();
  });
});
