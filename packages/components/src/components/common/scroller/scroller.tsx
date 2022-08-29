import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import {
  attachComponentCss,
  getHTMLElements,
  getPrefixedTagNames,
  scrollElementTo,
  validateProps,
  AllowedTypes,
  THEMES_EXTENDED_ELECTRIC,
} from '../../../utils';
import { getComponentCss } from './scroller-styles';
import {
  getScrollPositionAfterPrevNextClick,
  GRADIENT_COLOR_THEMES,
  isScrollable,
  SCROLL_INDICATOR_POSITIONS,
} from './scroller-utils';
import type { Direction, GradientColorTheme, ScrollToPosition, ScrollIndicatorPosition } from './scroller-utils';
import type { PropTypes, ThemeExtendedElectric } from '../../../types';
import { parseJSONAttribute } from '../../../utils/json';

const propTypes: PropTypes<typeof Scroller> = {
  theme: AllowedTypes.oneOf<ThemeExtendedElectric>(THEMES_EXTENDED_ELECTRIC),
  gradientColorScheme: AllowedTypes.oneOf<GradientColorTheme>(GRADIENT_COLOR_THEMES),
  scrollToPosition: AllowedTypes.shape<ScrollToPosition>({
    scrollPosition: AllowedTypes.number,
    isSmooth: AllowedTypes.boolean,
  }),
  scrollIndicatorPosition: AllowedTypes.oneOf<ScrollIndicatorPosition>(SCROLL_INDICATOR_POSITIONS),
};

@Component({
  tag: 'p-scroller',
  shadow: true,
})
export class Scroller {
  @Element() public host!: HTMLElement;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: GradientColorTheme = 'default';

  /** Scrolls the scroll area to the left either smooth or immediately */
  @Prop() public scrollToPosition?: ScrollToPosition;

  /** Sets the vertical position of scroll indicator icon */
  @Prop() public scrollIndicatorPosition?: ScrollIndicatorPosition = 'center';

  @State() private isPrevHidden = true;
  @State() private isNextHidden = true;

  private intersectionObserver: IntersectionObserver;
  private scrollAreaElement: HTMLElement;

  @Watch('scrollToPosition')
  public scrollToPositionHandler(): void {
    this.scrollHandler();
  }

  public componentDidLoad(): void {
    this.initIntersectionObserver();
    if (this.scrollToPosition) {
      this.scrollHandler();
    }
  }

  // should only update if scrollable
  public componentShouldUpdate(_newVal, _oldVal, propName): boolean {
    return !(propName === 'scrollToPosition' && !isScrollable(this.isNextHidden, this.isPrevHidden));
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.gradientColorScheme,
      this.theme,
      this.isNextHidden,
      this.isPrevHidden,
      this.scrollIndicatorPosition
    );
  }

  public render(): JSX.Element {
    const renderPrevNextButton = (direction: Direction): JSX.Element => {
      const PrefixedTagNames = getPrefixedTagNames(this.host);
      return (
        <div class={direction === 'next' ? 'action-next' : 'action-prev'}>
          <PrefixedTagNames.pButtonPure
            class="button"
            type="button"
            tabindex="-1"
            hide-label="true"
            size="inherit"
            icon={direction === 'next' ? 'arrow-head-right' : 'arrow-head-left'}
            onClick={() => this.scrollOnPrevNextClick(direction)}
            theme={this.theme}
            aria-hidden="true"
          >
            {direction}
          </PrefixedTagNames.pButtonPure>
        </div>
      );
    };

    return (
      <div class="root">
        <div class="scroll-area" ref={(el) => (this.scrollAreaElement = el)}>
          <div class="scroll-wrapper" tabIndex={isScrollable(this.isPrevHidden, this.isNextHidden) ? 1 : null}>
            <slot />
            <div class="trigger" />
            <div class="trigger" />
          </div>
        </div>
        {['prev', 'next'].map((direction: Direction) => renderPrevNextButton(direction))}
      </div>
    );
  }

  private initIntersectionObserver = (): void => {
    const [firstTrigger, lastTrigger] = getHTMLElements(this.host.shadowRoot, '.trigger');

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (target === firstTrigger) {
            this.isPrevHidden = isIntersecting;
          } else if (target === lastTrigger) {
            this.isNextHidden = isIntersecting;
          }
        }
      },
      {
        root: this.scrollAreaElement,
        // Defines the percentage of how much of the target (trigger) is visible within the element specified (this.host).
        // In this case 0.9px of the trigger have to be hidden to show the gradient
        threshold: 0.1,
      }
    );

    this.intersectionObserver.observe(firstTrigger);
    this.intersectionObserver.observe(lastTrigger);
  };

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.scrollAreaElement, direction);
    scrollElementTo(this.scrollAreaElement, scrollPosition);
  };

  private scrollHandler = (): void => {
    const { scrollPosition, isSmooth } = parseJSONAttribute(this.scrollToPosition);

    if (isSmooth) {
      scrollElementTo(this.scrollAreaElement, scrollPosition);
    } else {
      this.scrollAreaElement.scrollLeft = scrollPosition;
    }
  };
}
