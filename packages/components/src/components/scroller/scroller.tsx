import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getHTMLElements,
  getPrefixedTagNames,
  parseJSONAttribute,
  scrollElementTo,
  THEMES,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './scroller-styles';
import type { PropTypes, Theme } from '../../types';
import type {
  ScrollerAlignScrollIndicator,
  ScrollerDirection,
  ScrollerGradientColor,
  ScrollerGradientColorScheme,
  ScrollerScrollIndicatorPosition,
  ScrollerScrollToPosition,
} from './scroller-utils';
import {
  getScrollPositionAfterPrevNextClick,
  GRADIENT_COLORS,
  GRADIENT_COLOR_SCHEMES,
  isScrollable,
  SCROLL_INDICATOR_POSITIONS,
} from './scroller-utils';

const propTypes: PropTypes<typeof Scroller> = {
  gradientColorScheme: AllowedTypes.oneOf<ScrollerGradientColorScheme>([undefined, ...GRADIENT_COLOR_SCHEMES]),
  gradientColor: AllowedTypes.oneOf<ScrollerGradientColor>(GRADIENT_COLORS),
  scrollToPosition: AllowedTypes.shape<ScrollerScrollToPosition>({
    scrollPosition: AllowedTypes.number,
    isSmooth: AllowedTypes.boolean,
  }),
  scrollIndicatorPosition: AllowedTypes.oneOf<ScrollerScrollIndicatorPosition>([
    undefined,
    ...SCROLL_INDICATOR_POSITIONS,
  ]),
  alignScrollIndicator: AllowedTypes.oneOf<ScrollerAlignScrollIndicator>(SCROLL_INDICATOR_POSITIONS),
  hasScrollbar: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-scroller',
  shadow: true,
})
export class Scroller {
  @Element() public host!: HTMLElement;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `gradientColor` instead.
   * Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: ScrollerGradientColorScheme;

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColor?: ScrollerGradientColor = 'background-base';

  /** Scrolls the scroll area to the left either smooth or immediately */
  @Prop({ mutable: true }) public scrollToPosition?: ScrollerScrollToPosition;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `alignScrollIndicator` instead.
   * Sets the vertical position of scroll indicator */
  @Prop() public scrollIndicatorPosition?: ScrollerScrollIndicatorPosition;

  /** Sets the vertical position of scroll indicator */
  @Prop() public alignScrollIndicator?: ScrollerAlignScrollIndicator = 'center';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Specifies if scrollbar should be shown */
  @Prop() public hasScrollbar? = false;

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
    warnIfDeprecatedPropIsUsed<typeof Scroller>(this, 'gradientColorScheme', 'Please use gradientColor prop instead.');
    warnIfDeprecatedPropIsUsed<typeof Scroller>(
      this,
      'scrollIndicatorPosition',
      'Please use alignScrollIndicator prop instead.'
    );
    const deprecationMap: Record<ScrollerGradientColorScheme, ScrollerGradientColor> = {
      default: 'background-base',
      surface: 'background-surface',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Scroller, ScrollerGradientColorScheme, ScrollerGradientColor>(
      this,
      'gradientColorScheme',
      deprecationMap
    );
    attachComponentCss(
      this.host,
      getComponentCss,
      deprecationMap[this.gradientColorScheme] || this.gradientColor,
      this.isNextHidden,
      this.isPrevHidden,
      this.scrollIndicatorPosition || this.alignScrollIndicator,
      this.hasScrollbar,
      this.theme
    );

    const renderPrevNextButton = (direction: ScrollerDirection): JSX.Element => {
      const PrefixedTagNames = getPrefixedTagNames(this.host);
      // TODO: why not use p-button?
      return (
        <div key={direction} class={direction === 'next' ? 'action-next' : 'action-prev'}>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => this.scrollOnPrevNextClick(direction)}
            aria-hidden="true"
            aria-label={direction}
          >
            <PrefixedTagNames.pIcon
              class="icon"
              name={direction === 'next' ? 'arrow-head-right' : 'arrow-head-left'}
              theme={this.theme}
            />
          </button>
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
