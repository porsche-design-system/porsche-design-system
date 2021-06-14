export const supportsScrollBehavior = (): boolean => 'scrollBehavior' in document?.documentElement?.style;

const steps = 20;

let scrollInterval: NodeJS.Timeout;
const intervalScroll = (el: HTMLElement, scrollStep: number, initialScrollLeft: number, endAmount: number): void => {
  let i = 0;
  clearInterval(scrollInterval);
  scrollInterval = setInterval(() => {
    el.scrollLeft = Math.round(initialScrollLeft + i * scrollStep);
    if (++i >= steps) {
      el.scrollLeft = endAmount;
      clearInterval(scrollInterval);
    }
  }, 10);
};

export const scrollElementTo = (el: HTMLElement, amount: number): void => {
  if (supportsScrollBehavior()) {
    el.scrollTo({
      left: amount,
      behavior: 'smooth',
    });
  } else {
    // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
    const initialScrollLeft = el.scrollLeft;
    const scrollDistance = amount - initialScrollLeft;
    const scrollStep = scrollDistance / steps;

    intervalScroll(el, scrollStep, initialScrollLeft, amount);
  }
};

export const scrollElementBy = (el: HTMLElement, amount: number): void => {
  if (supportsScrollBehavior()) {
    el.scrollBy({ left: amount, top: 0, behavior: 'smooth' });
  } else {
    // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
    const initialScrollLeft = el.scrollLeft;
    const endScrollLeft = initialScrollLeft + amount;
    const scrollStep = amount / steps;

    intervalScroll(el, scrollStep, initialScrollLeft, endScrollLeft);
  }
};
