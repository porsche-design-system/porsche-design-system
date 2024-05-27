/**
 * Map of observed nodes and their corresponding IntersectionObserver instances.
 */
export const observedStickyNodesMap: Map<HTMLElement, IntersectionObserver> = new Map();

/**
 * Creates an IntersectionObserver for observing sticky elements within a scroll area.
 * @param {HTMLElement} scrollArea - The scroll area containing the sticky elements.
 * @returns {IntersectionObserver} - The created IntersectionObserver instance.
 */
export const getIntersectionObserverStickyArea = (scrollArea: HTMLElement): IntersectionObserver => {
  return new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        target.toggleAttribute('data-stuck', !isIntersecting);
      }
    },
    {
      root: scrollArea,
      threshold: 1,
    }
  );
};

/**
 * Observes a sticky area with IntersectionObserver and ensures it's only added once.
 * @param {HTMLElement} scrollArea - The scroll area containing the sticky element.
 * @param {HTMLElement} stickyNode - The sticky element to observe.
 */
export const observeStickyArea = (scrollArea: HTMLElement, stickyNode: HTMLElement): void => {
  if (!observedStickyNodesMap.has(stickyNode)) {
    const observer = getIntersectionObserverStickyArea(scrollArea);
    observer.observe(stickyNode);
    observedStickyNodesMap.set(stickyNode, observer);
  }
};

/**
 * Stops observing a sticky area.
 * @param {HTMLElement} stickyNode - The sticky element to unobserve.
 */
export const unobserveStickyArea = (stickyNode: HTMLElement): void => {
  const observer = observedStickyNodesMap.get(stickyNode);
  if (observer) {
    observer.unobserve(stickyNode);
    observedStickyNodesMap.delete(stickyNode);
  }
};
