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
