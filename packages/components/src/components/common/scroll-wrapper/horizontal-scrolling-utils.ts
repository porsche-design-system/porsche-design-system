import { getHTMLElements, scrollElementTo } from '../../../utils';
import { getScrollPositionAfterPrevNextClick } from '../../navigation/tabs-bar/tabs-bar-utils';

export type Direction = 'prev' | 'next';

export const initHorizontalScrollingIntersectionObserver = (
  host: HTMLElement,
  intersectionObserver: IntersectionObserver,
  setIsPrevHidden: (isIntersecting: boolean) => void,
  setIsNextHidden: (isIntersecting: boolean) => void
): void => {
  const [firstTrigger, lastTrigger] = getHTMLElements(host.shadowRoot, '.trigger');

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        if (target === firstTrigger) {
          setIsPrevHidden(isIntersecting);
        } else if (target === lastTrigger) {
          setIsNextHidden(isIntersecting);
        }
      }
    },
    {
      // TODO: shouldn't root be the the scrollable div rather than the host?
      root: host,
      // Defines the percentage of how much of the target (trigger) is visible within the element specified (this.host).
      // In his case 0.9px of the trigger have to be hidden to show the gradient
      threshold: 0.1,
    }
  );

  intersectionObserver.observe(firstTrigger);
  intersectionObserver.observe(lastTrigger);
};

export const scrollOnPrevNextClick = (
  slottedElements: HTMLElement[],
  scrollAreaElement: HTMLElement,
  direction: Direction
): void => {
  const scrollPosition = getScrollPositionAfterPrevNextClick(slottedElements, scrollAreaElement, direction);
  scrollElementTo(scrollAreaElement, scrollPosition);
};
