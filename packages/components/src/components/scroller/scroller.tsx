import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import {
  attachComponentCss,
  getHTMLElements,
  getPrefixedTagNames,
  scrollElementTo,
  validateProps,
  AllowedTypes,
  THEMES_EXTENDED_ELECTRIC,
} from '../../utils';
import { getComponentCss } from './scroller-styles';
import {
  getScrollPositionAfterPrevNextClick,
  GRADIENT_COLOR_THEMES,
  isScrollable,
  SCROLL_INDICATOR_POSITIONS,
} from './scroller-utils';
import type {
  ScrollerDirection,
  GradientColorTheme,
  ScrollToPosition,
  ScrollIndicatorPosition,
} from './scroller-utils';
import type { PropTypes, ThemeExtendedElectric } from '../../types';
import { parseJSONAttribute } from '../../utils/json';

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
    this.scrollToPosition = parseJSONAttribute(this.scrollToPosition);

    // watcher might trigger before ref is defined with ssr
    if (this.scrollAreaElement) {
      const { scrollPosition, isSmooth } = this.scrollToPosition;
      if (isSmooth) {
        scrollElementTo(this.scrollAreaElement, scrollPosition);
      } else {
        this.scrollAreaElement.scrollLeft = scrollPosition;
      }
    }
  }

  public connectedCallback(): void {
    if (this.scrollAreaElement) {
      this.scrollToPosition = parseJSONAttribute(this.scrollToPosition);
    }
  }

  public componentDidLoad(): void {
    this.initIntersectionObserver();
    if (this.scrollToPosition) {
      this.scrollToPositionHandler();
    }
  }

  // should only update if scrollable
  public componentShouldUpdate(_newVal, _oldVal, propName): boolean {
    return !(propName === 'scrollToPosition' && !isScrollable(this.isNextHidden, this.isPrevHidden));
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.gradientColorScheme,
      this.isNextHidden,
      this.isPrevHidden,
      this.scrollIndicatorPosition,
      this.theme
    );

    const renderPrevNextButton = (direction: ScrollerDirection): JSX.Element => {
      const PrefixedTagNames = getPrefixedTagNames(this.host);
      return (
        <div class={direction === 'next' ? 'action-next' : 'action-prev'}>
          <PrefixedTagNames.pButtonPure
            class="button"
            type="button"
            tabIndex={-1}
            hideLabel={true}
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
          <div class="scroll-wrapper" tabIndex={isScrollable(this.isPrevHidden, this.isNextHidden) ? 0 : null}>
            <slot />
            <div class="trigger" />
            <div class="trigger" />
          </div>
        </div>
        {(['prev', 'next'] as ScrollerDirection[]).map(renderPrevNextButton)}
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

  private scrollOnPrevNextClick = (direction: ScrollerDirection): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.scrollAreaElement, direction);
    scrollElementTo(this.scrollAreaElement, scrollPosition);
  };
}
