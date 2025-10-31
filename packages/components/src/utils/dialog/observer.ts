/**
 * Map of scrollArea elements which are used as root in the corresponding IntersectionObserver instance.
 * Used in order to create only one Intersection Observer instance per scrollArea element.
 */
export const scrollAreaObserverMap: Map<HTMLElement, IntersectionObserver> = new Map();

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
  let observer = scrollAreaObserverMap.get(scrollArea);

  if (!observer) {
    observer = internal.getIntersectionObserverStickyArea(scrollArea);
    scrollAreaObserverMap.set(scrollArea, observer);
  }

  if (!observedStickyNodesMap.has(stickyNode)) {
    observer.observe(stickyNode);
    observedStickyNodesMap.set(stickyNode, observer);
  }
};

export const internal = {
  getIntersectionObserverStickyArea,
};
